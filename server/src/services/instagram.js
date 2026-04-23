/**
 * Instagram Publisher Service
 * Handles OAuth, carousel upload, and publishing via Meta Graph API
 */
const axios = require('axios');
const { query } = require('../config/database');

const META_GRAPH_URL = 'https://graph.facebook.com/v19.0';

class InstagramService {
  /**
   * Generate OAuth URL for Meta Login
   */
  getAuthUrl(projectId) {
    const params = new URLSearchParams({
      client_id: process.env.META_APP_ID,
      redirect_uri: process.env.META_REDIRECT_URI,
      scope: 'instagram_basic,instagram_content_publish,pages_show_list,pages_read_engagement',
      response_type: 'code',
      state: projectId, // Pass project ID through OAuth flow
    });
    return `https://www.facebook.com/v19.0/dialog/oauth?${params}`;
  }

  /**
   * Exchange OAuth code for access token
   */
  async exchangeCode(code) {
    const response = await axios.get(`${META_GRAPH_URL}/oauth/access_token`, {
      params: {
        client_id: process.env.META_APP_ID,
        client_secret: process.env.META_APP_SECRET,
        redirect_uri: process.env.META_REDIRECT_URI,
        code,
      },
    });
    return response.data; // { access_token, token_type }
  }

  /**
   * Get long-lived access token (60 days)
   */
  async getLongLivedToken(shortToken) {
    const response = await axios.get(`${META_GRAPH_URL}/oauth/access_token`, {
      params: {
        grant_type: 'fb_exchange_token',
        client_id: process.env.META_APP_ID,
        client_secret: process.env.META_APP_SECRET,
        fb_exchange_token: shortToken,
      },
    });
    return response.data; // { access_token, token_type, expires_in }
  }

  /**
   * Get Instagram Business Account connected to the Facebook Page
   */
  async getInstagramAccount(accessToken) {
    // Get user's pages
    const pagesRes = await axios.get(`${META_GRAPH_URL}/me/accounts`, {
      params: { access_token: accessToken, fields: 'id,name,instagram_business_account' },
    });

    const page = pagesRes.data.data.find(p => p.instagram_business_account);
    if (!page) {
      throw new Error('Nenhuma conta comercial do Instagram encontrada vinculada às suas páginas do Facebook');
    }

    // Get IG details
    const igRes = await axios.get(`${META_GRAPH_URL}/${page.instagram_business_account.id}`, {
      params: { access_token: accessToken, fields: 'id,username,profile_picture_url,followers_count' },
    });

    return {
      pageId: page.id,
      igUserId: igRes.data.id,
      igUsername: igRes.data.username,
      profilePicture: igRes.data.profile_picture_url,
      followers: igRes.data.followers_count,
    };
  }

  /**
   * Publish a carousel post to Instagram
   * Flow: upload items → create container → publish
   */
  async publishCarousel(igUserId, accessToken, imageUrls, caption) {
    // Step 1: Create item containers for each image
    const itemIds = [];
    for (const url of imageUrls) {
      const res = await axios.post(`${META_GRAPH_URL}/${igUserId}/media`, {
        image_url: url,
        is_carousel_item: true,
        access_token: accessToken,
      });
      itemIds.push(res.data.id);
    }

    // Step 2: Create carousel container
    const containerRes = await axios.post(`${META_GRAPH_URL}/${igUserId}/media`, {
      media_type: 'CAROUSEL',
      children: itemIds.join(','),
      caption,
      access_token: accessToken,
    });
    const containerId = containerRes.data.id;

    // Step 3: Wait for processing and publish
    await this._waitForProcessing(containerId, accessToken);

    const publishRes = await axios.post(`${META_GRAPH_URL}/${igUserId}/media_publish`, {
      creation_id: containerId,
      access_token: accessToken,
    });

    // Get permalink
    const mediaRes = await axios.get(`${META_GRAPH_URL}/${publishRes.data.id}`, {
      params: { access_token: accessToken, fields: 'id,permalink' },
    });

    return {
      igPostId: publishRes.data.id,
      permalink: mediaRes.data.permalink,
    };
  }

  /**
   * Get post insights
   */
  async getPostInsights(igPostId, accessToken) {
    try {
      const res = await axios.get(`${META_GRAPH_URL}/${igPostId}/insights`, {
        params: {
          access_token: accessToken,
          metric: 'impressions,reach,likes,comments,saves,shares',
        },
      });

      const metrics = {};
      for (const item of res.data.data) {
        metrics[item.name] = item.values[0].value;
      }
      return metrics;
    } catch (err) {
      console.error('❌ Erro ao buscar insights:', err.response?.data || err.message);
      return null;
    }
  }

  /**
   * Wait for Instagram to finish processing the media container
   */
  async _waitForProcessing(containerId, accessToken, maxAttempts = 30) {
    for (let i = 0; i < maxAttempts; i++) {
      const res = await axios.get(`${META_GRAPH_URL}/${containerId}`, {
        params: { access_token: accessToken, fields: 'status_code' },
      });

      if (res.data.status_code === 'FINISHED') return;
      if (res.data.status_code === 'ERROR') {
        throw new Error('Instagram rejeitou a mídia. Verifique as imagens.');
      }

      await new Promise(r => setTimeout(r, 2000)); // Wait 2s
    }
    throw new Error('Timeout: Instagram demorou demais para processar');
  }
}

module.exports = new InstagramService();
