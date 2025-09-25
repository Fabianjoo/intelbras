export default async function handler(req, res) {
    try {
      // URL do seu servidor interno
      const targetUrl = "http://10.1.45.193:8053" + req.url.replace("/api/proxy", "");
  
      const response = await fetch(targetUrl, {
        method: req.method,
        headers: {
          ...req.headers,
          host: undefined // remove host original para evitar bloqueio
        },
        body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined
      });
  
      // Repassa status e headers originais
      res.status(response.status);
      response.headers.forEach((value, name) => {
        res.setHeader(name, value);
      });
  
      // Envia o corpo da resposta
      const data = await response.arrayBuffer();
      res.send(Buffer.from(data));
    } catch (err) {
      console.error("Erro no proxy:", err);
      res.status(500).json({ error: "Erro ao conectar com o servidor interno" });
    }
  }
  