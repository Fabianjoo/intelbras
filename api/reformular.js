// pages/api/reformular.js
export default async function handler(req, res) {
    try {
      // 1️⃣ Apenas aceita POST
      if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
      }
  
      // 2️⃣ Verifica se o body existe e está no formato correto
      if (!req.body) {
        console.log("DEBUG: req.body não existe");
        return res.status(400).json({ error: "Body da requisição ausente" });
      }
  
      // 3️⃣ Extrai a propriedade 'texto'
      const { texto } = req.body;
      console.log("DEBUG recebido:", texto);
  
      if (!texto) {
        return res.status(400).json({ error: "Campo 'texto' é obrigatório" });
      }
  
      // 4️⃣ Simula a reformulação
      const resultado = `Reformulado: ${texto}`;
  
      // 5️⃣ Retorna resultado
      return res.status(200).json({ resultado });
    } catch (error) {
      console.error("Erro no servidor:", error);
      return res.status(500).json({ error: "Erro interno" });
    }
  }
  