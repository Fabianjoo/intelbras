import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") return res.status(405).json({ error: "Método não permitido" });

    const { texto } = req.body;
    if (!texto) return res.status(400).json({ error: "Campo 'texto' é obrigatório" });

    // Aqui pedimos explicitamente ao modelo para reescrever de forma clara e legível
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Você é um assistente que reescreve textos, corrigindo erros, melhorando a clareza, a gramática e a formatação, mantendo todas as informações importantes."
        },
        { role: "user", content: texto }
      ]
    });

    const resultado = completion.choices[0].message.content;
    return res.status(200).json({ resultado });

  } catch (error) {
    console.error("Erro no servidor:", error);
    return res.status(500).json({ error: "Erro interno" });
  }
}
