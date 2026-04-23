/**
 * AI Service — Camada de abstração para providers de IA
 * 
 * Suporta: openai, gemini, anthropic, mock
 * Configure AI_PROVIDER e AI_API_KEY no .env
 */
const axios = require('axios');

class AIService {
  constructor() {
    this.provider = process.env.AI_PROVIDER || 'mock';
    this.apiKey = process.env.AI_API_KEY;
    this.model = process.env.AI_MODEL || 'gpt-4o';
  }

  /**
   * Gera a estrutura completa de um carrossel
   */
  async generateCarousel({ topic, niche, toneOfVoice, brandName, numSlides = 7 }) {
    const systemPrompt = `Você é um estrategista de conteúdo para Instagram especializado em criar carrosséis virais.
Marca: ${brandName || 'marca genérica'}
Nicho: ${niche || 'negócios'}
Tom de voz: ${toneOfVoice || 'profissional'}

REGRAS:
- Slide 1 é sempre um gancho forte (hook) que faz o usuário parar de scrollar
- Slides intermediários entregam valor real, com dados ou dicas práticas
- Último slide é sempre um CTA claro
- Use linguagem direta e com autoridade
- Evite jargões genéricos como "transforme sua vida"`;

    const userPrompt = `Crie um carrossel de ${numSlides} slides sobre: "${topic}"

Responda SOMENTE em JSON válido, sem markdown:
{
  "title": "Título geral do carrossel",
  "slides": [
    { "headline": "Texto principal do slide (máx 8 palavras)", "body": "Texto de apoio (máx 30 palavras)", "cta": "Chamada para ação se houver" }
  ],
  "caption": "Legenda completa para o post (inclua emojis e quebras de linha)",
  "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3"]
}`;

    const response = await this._chat(systemPrompt, userPrompt);

    try {
      // Tenta parsear o JSON da resposta
      const cleaned = response.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    } catch (err) {
      console.error('❌ Erro ao parsear resposta da IA:', err.message);
      console.error('Resposta bruta:', response.substring(0, 500));
      throw new Error('A IA retornou uma resposta inválida. Tente novamente.');
    }
  }

  /**
   * Gera carrossel a partir de uma URL de notícia
   */
  async generateFromNews({ url, niche, toneOfVoice, brandName }) {
    const systemPrompt = `Você é um especialista em transformar notícias em conteúdo educativo para Instagram.
Marca: ${brandName || 'marca'}
Nicho: ${niche || 'negócios'}
Tom: ${toneOfVoice || 'profissional'}`;

    const userPrompt = `Transforme esta notícia em um carrossel de 7 slides para Instagram:
URL: ${url}

Extraia os pontos principais da notícia e crie um carrossel educativo que:
1. Gere curiosidade no slide 1
2. Explique o que aconteceu nos slides centrais
3. Dê a opinião/insight da marca no final
4. Termine com CTA

Responda SOMENTE em JSON válido:
{
  "title": "...",
  "slides": [{ "headline": "...", "body": "...", "cta": "" }],
  "caption": "...",
  "hashtags": ["..."]
}`;

    const response = await this._chat(systemPrompt, userPrompt);

    try {
      const cleaned = response.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    } catch (err) {
      throw new Error('Erro ao processar notícia com IA');
    }
  }

  /**
   * Regenera um slide específico
   */
  async regenerateSlide({ currentHeadline, currentBody, context, toneOfVoice }) {
    const prompt = `Reescreva este slide de carrossel do Instagram com um ângulo diferente:
Headline atual: "${currentHeadline}"
Body atual: "${currentBody}"
Contexto do carrossel: "${context}"
Tom: ${toneOfVoice}

Responda em JSON: { "headline": "...", "body": "...", "cta": "" }`;

    const response = await this._chat('Você é um copywriter de Instagram.', prompt);
    const cleaned = response.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  }

  /**
   * Gera legenda alternativa
   */
  async generateCaption({ topic, toneOfVoice, platform = 'instagram' }) {
    const prompt = `Gere uma legenda profissional para um post de ${platform} sobre: "${topic}"
Tom: ${toneOfVoice}
Inclua emojis relevantes e 5 hashtags.
Responda apenas com o texto da legenda.`;

    return this._chat('Você é um social media manager.', prompt);
  }

  // ── Provider Abstraction ─────────────────────────────
  async _chat(systemPrompt, userPrompt) {
    switch (this.provider) {
      case 'openai':
        return this._openai(systemPrompt, userPrompt);
      case 'gemini':
        return this._gemini(systemPrompt, userPrompt);
      case 'anthropic':
        return this._anthropic(systemPrompt, userPrompt);
      default:
        return this._mock(systemPrompt, userPrompt);
    }
  }

  // ── OpenAI ───────────────────────────────────────────
  async _openai(systemPrompt, userPrompt) {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      },
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].message.content;
  }

  // ── Google Gemini ────────────────────────────────────
  async _gemini(systemPrompt, userPrompt) {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`,
      {
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ parts: [{ text: userPrompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 2000 },
      }
    );
    return response.data.candidates[0].content.parts[0].text;
  }

  // ── Anthropic Claude ─────────────────────────────────
  async _anthropic(systemPrompt, userPrompt) {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: this.model || 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      },
      {
        headers: {
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.content[0].text;
  }

  // ── Mock (para desenvolvimento sem API) ──────────────
  async _mock(systemPrompt, userPrompt) {
    console.log('🤖 [MOCK AI] Gerando conteúdo simulado...');
    await new Promise(r => setTimeout(r, 500)); // Simula latência

    return JSON.stringify({
      title: 'Carrossel gerado por IA (mock)',
      slides: [
        { headline: '5 Erros que Destroem seu Alcance', body: 'A maioria dos perfis comerciais comete esses erros sem perceber.', cta: '' },
        { headline: 'Erro #1: Postar sem Estratégia', body: 'Publicar conteúdo aleatório confunde o algoritmo e reduz sua entrega.', cta: '' },
        { headline: 'Erro #2: Ignorar os Horários', body: 'Cada nicho tem seu horário de pico. Postar fora dele é jogar alcance fora.', cta: '' },
        { headline: 'Erro #3: Visuais Inconsistentes', body: 'Feeds sem identidade visual passam amadorismo e perdem seguidores.', cta: '' },
        { headline: 'Erro #4: Legendas Genéricas', body: 'Legendas sem gancho não geram salvamentos, e salvamentos dominam o algoritmo.', cta: '' },
        { headline: 'Erro #5: Não usar Carrosséis', body: 'Carrosséis têm 3x mais alcance que posts estáticos.', cta: '' },
        { headline: 'Quer resolver tudo isso?', body: 'O Postlee automatiza seu conteúdo com IA + seu branding.', cta: 'Link na bio → Teste grátis' },
      ],
      caption: '🚨 Você está cometendo esses erros no seu Instagram?\n\nA maioria dos perfis perde alcance por causa de erros simples que podem ser corrigidos hoje.\n\nSalve este post e compartilhe com alguém que precisa ver! 💡\n\n#marketingdigital #instagram #socialmedia #empreendedorismo #postlee',
      hashtags: ['#marketingdigital', '#instagram', '#socialmedia', '#empreendedorismo', '#postlee'],
    });
  }
}

module.exports = new AIService();
