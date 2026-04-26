const axios = require('axios');

/**
 * AI Service - Handles content generation via Groq/OpenAI
 */
class AIService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
    this.provider = process.env.AI_PROVIDER || 'gemini';
    this.model = process.env.AI_MODEL || 'gemini-1.5-flash';
  }

  /**
   * Gera um carrossel completo de alta performance
   */
  async generateCarousel({ topic, niche, audience, toneOfVoice, brandName, brandDescription, numSlides, brandConfig }) {
    const brandContext = brandConfig ? `
PERFIL DA MARCA:
- Nicho: ${brandConfig.nicho || niche}
- O que vende: ${brandConfig.o_que_vende}
- Cliente ideal: ${brandConfig.cliente_ideal}
- Maior dor: ${brandConfig.dor_do_cliente}
- Tom de voz: ${brandConfig.tom_de_voz}
- Palavras Proibidas: ${brandConfig.palavras_proibidas?.join(', ')}
- Objetivo: ${brandConfig.objetivo_principal}
- Cor da marca: ${brandConfig.cor_da_marca}
` : `Nicho: ${niche}, Tom: ${toneOfVoice}, Público: ${audience}`;

    const systemPrompt = `Você é um estrategista de conteúdo sênior especializado em carrosséis de alto engajamento para Instagram e LinkedIn.
Você trabalhou com os maiores criadores de conteúdo do Brasil e sabe exatamente o que faz um carrossel ser salvo, compartilhado e gerar comentários.

### SEU PADRÃO DE QUALIDADE OBRIGATÓRIO (NUNCA SEJA GENÉRICO)
- RUIM (Óbvio): "Não pesquisar o mercado pode levar a preços altos"
- BOM (Específico): "No nicho ${niche || 'selecionado'}, 9 em cada 10 pessoas perdem 40% de lucro por causa de X — e elas nem sabem disso."

REGRA DE DESIGN POR NICHO:
- IMOBILIÁRIO/FINANÇAS/JURÍDICO: fundo #0d1117, texto #e6edf3, acento ${brandConfig?.cor_da_marca || '#c9a96e'}
- SAÚDE/FITNESS: fundo #f0faf5, texto #1a3c2e, acento ${brandConfig?.cor_da_marca || '#2d8a5e'}
- MARKETING/VENDAS: fundo #0a0a0a, texto #ffffff, acento ${brandConfig?.cor_da_marca || '#f5c842'}
- EDUCAÇÃO: fundo #fffbeb, texto #451a03, acento ${brandConfig?.cor_da_marca || '#d97706'}
- TECH/SAAS: fundo #0f0f23, texto #e2e8f0, acento ${brandConfig?.cor_da_marca || '#7c3aed'}
- MODA/BELEZA: fundo #faf7f2, texto #1a1a1a, acento ${brandConfig?.cor_da_marca || '#c9a96e'}

Retorne APENAS o JSON no formato solicitado.`;

    const userPrompt = `
${brandContext}

PEDIDO DO USUÁRIO:
"${topic}"

PROCESSO OBRIGATÓRIO — execute internamente:
1. ENRIQUECIMENTO: Identifique um dado, erro comum ou medo oculto deste público sobre o tema.
2. ÂNGULO: Escolha entre Revelação, Desmistificação, Dado Surpreendente ou Passo a Passo Contraintuitivo.
3. GERAÇÃO: Crie ${numSlides || 7} slides.

RETORNE APENAS O JSON ABAIXO, sem texto antes ou depois:

{
  "carrossel": {
    "titulo_interno": "string",
    "angulo_escolhido": "string",
    "design": {
      "cor_fundo": "#hex",
      "cor_texto": "#hex",
      "cor_acento": "#hex",
      "estilo": "string"
    },
    "legenda_instagram": "string (máx 150 chars)",
    "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"],
    "slides": [
      {
        "numero": 1,
        "tipo": "capa",
        "titulo": "string (gancho brutal, máx 8 palavras)",
        "texto_apoio": null,
        "destaque_visual": null,
        "nota_design": "Instrução cirúrgica de layout"
      },
      {
        "numero": 2,
        "tipo": "conteudo",
        "titulo": "string (máx 6 palavras)",
        "texto_apoio": "string (diferente do título, com dado ou exemplo)",
        "destaque_visual": "string (número ou dado p/ destaque)",
        "nota_design": "Instrução cirúrgica de layout"
      }
    ]
  }
}

ATENÇÃO: Capa não pode começar com "Descubra", "Veja" ou "Conheça". Seja disruptivo.`;

    const response = await this._chat(systemPrompt, userPrompt);

    try {
      const firstBrace = response.indexOf('{');
      const lastBrace = response.lastIndexOf('}');
      if (firstBrace === -1 || lastBrace === -1) throw new Error('JSON não encontrado');
      
      let cleaned = response.substring(firstBrace, lastBrace + 1);
      
      // Limpeza de quebras de linha dentro de strings
      cleaned = cleaned.replace(/"([^"]*)"/g, (match) => {
        return match.replace(/\n/g, '\\n');
      });

      return JSON.parse(cleaned);
    } catch (err) {
      console.error('❌ Erro AI:', err.message);
      console.error('Texto bruto:', response.substring(0, 500));
      throw new Error('A IA retornou uma resposta inválida. Tente novamente.');
    }
  }

  async _chat(systemPrompt, userPrompt) {
    if (this.provider === 'gemini') return this._gemini(systemPrompt, userPrompt);
    if (this.provider === 'groq') return this._groq(systemPrompt, userPrompt);
    if (this.provider === 'openai') return this._openai(systemPrompt, userPrompt);
    return this._mock(systemPrompt, userPrompt);
  }

  async _gemini(systemPrompt, userPrompt) {
    try {
      console.log('🤖 [GEMINI] Enviando requisição para Google (v1beta)...');
      // v1beta é obrigatório para system_instruction e response_mime_type
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;
      
      const payload = {
        contents: [{ 
          parts: [{ text: userPrompt }] 
        }],
        system_instruction: { 
          parts: [{ text: systemPrompt }] 
        },
        generationConfig: {
          temperature: 0.2,
          response_mime_type: "application/json"
        }
      };

      const response = await axios.post(url, payload);
      
      if (!response.data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error('Resposta vazia do Gemini');
      }

      return response.data.candidates[0].content.parts[0].text;
    } catch (err) {
      if (err.response?.data) {
        console.error('❌ [GEMINI API ERROR DETAIL]:', JSON.stringify(err.response.data, null, 2));
      }
      // Captura o erro detalhado para o usuário
      const apiMessage = err.response?.data?.error?.message || err.message;
      throw new Error(`Erro Gemini (${err.response?.status || '500'}): ${apiMessage}`);
    }
  }

  async _groq(systemPrompt, userPrompt) {
    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: this.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.2,
          max_tokens: 4096,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.choices[0].message.content;
    } catch (err) {
      console.error('❌ [GROQ ERROR]', err.response?.data || err.message);
      throw err;
    }
  }

  async _openai(systemPrompt, userPrompt) {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.2,
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

  async _mock() {
    return JSON.stringify({ carrossel: { slides: [], design: {}, legenda_instagram: "", hashtags: [] } });
  }
}

module.exports = new AIService();
