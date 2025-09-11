export default async function handler(req, res) {
    try {
      if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
      }
  
      const { texto } = req.body;
      console.log("DEBUG recebido:", texto);
  
      if (!texto) {
        return res.status(400).json({ error: "Campo 'texto' é obrigatório" });
      }
  
      // simula a reformulação
      const resultado = `Reformulado: ${texto}`;
  
      return res.status(200).json({ resultado });
    } catch (error) {
      console.error("Erro no servidor:", error);
      return res.status(500).json({ error: "Erro interno" });
    }
  }
  