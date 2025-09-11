import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { texto } = req.body;

    if (!texto) {
      return res.status(400).json({ error: "O campo 'texto' é obrigatório" });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Você é um assistente que reformula frases de forma clara e profissional." },
        { role: "user", content: `Reformule o seguinte texto: "${texto}"` },
      ],
    });

    const resposta = completion.choices[0].message.content;
    res.status(200).json({ resposta });

  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ error: error.message || "Erro ao reformular o texto" });
  }
}
