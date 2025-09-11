// pages/api/reformular.js
import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método não permitido" });
    }

    const { texto } = req.body;
    if (!texto) {
      return res.status(400).json({ error: "Campo 'texto' é obrigatório" });
    }

    let resultado = `Reformulado: ${texto}`; // fallback seguro

    // Só tenta OpenAI se a chave existir
    if (process.env.OPENAI_API_KEY) {
      try {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "Você é um assistente que reescreve textos, corrigindo erros, melhorando a clareza, a gramática e a formatação."
            },
            { role: "user", content: texto }
          ]
        });

        resultado = completion.choices[0].message.content;
      } catch (err) {
        console.error("OpenAI deu erro, usando fallback:", err);
        // resultado continua como o fallback simples
      }
    } else {
      console.log("OPENAI_API_KEY não definida, usando fallback");
    }

    return res.status(200).json({ resultado });

  } catch (error) {
    console.error("Erro no servidor:", error);
    return res.status(500).json({ error: "Erro interno" });
  }
}
