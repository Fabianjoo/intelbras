// api/reformular.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { modelo = '', fato = '', causa = '', acao = '', info = '' } = req.body || {};

    const prompt = `
Reescreva os textos abaixo de forma clara, profissional e corrigindo erros de português.
Retorne estritamente UM JSON válido (sem texto extra) com as chaves:
modelo, fato, causa, acao, info.

MODELO: ${modelo}
FATO: ${fato}
CAUSA: ${causa}
AÇÃO: ${acao}
INFORMAÇÕES ADICIONAIS: ${info}
`;

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',       // ou 'gpt-3.5-turbo' dependendo do seu plano
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
        max_tokens: 800
      })
    });

    const data = await resp.json();
    const content = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || '';

    // Tenta parsear o JSON retornado
    try {
      const parsed = JSON.parse(content);
      return res.status(200).json({ success: true, ...parsed });
    } catch (err) {
      // se não for JSON puro, tenta pegar o trecho entre chaves
      const match = content.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        return res.status(200).json({ success: true, ...parsed });
      }
      // retorna a string bruta para debug
      return res.status(200).json({ success: false, raw: content });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro no servidor', details: error.message });
  }
}

