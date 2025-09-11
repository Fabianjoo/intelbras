export default async function handler(req, res) {
    try {
      if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
      }
  
      const { texto } = req.body;
  
      console.log("DEBUG texto recebido:", texto);
  
      if (!texto) {
        return res.status(400).json({ error: "Campo 'texto' é obrigatório" });
      }
  
      const resposta = `Texto reformulado: ${texto.toUpperCase()}`;
  
      return res.status(200).json({ sucesso: true, resultado: resposta });
    } catch (error) {
      console.error("Erro interno:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
  