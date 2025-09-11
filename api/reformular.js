// pages/api/reformular.js
export default async function handler(req, res) {
    try {
      if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
      }
  
      // Log para debug no Function Log do Vercel
      console.log("Request body:", req.body);
  
      const { texto } = req.body;
  
      if (!texto || typeof texto !== "string") {
        return res.status(400).json({ error: "Campo 'texto' é obrigatório" });
      }
  
      // Exemplo de lógica simples (aqui você coloca a chamada para IA ou o que precisar)
      const resposta = `Texto reformulado: ${texto.toUpperCase()}`;
  
      return res.status(200).json({ sucesso: true, resultado: resposta });
    } catch (error) {
      console.error("Erro interno:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
  