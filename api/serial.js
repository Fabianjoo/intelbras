let token = null;
let expira = 0;

async function gerarToken() {
  const response = await fetch('https://apim.intelbras.com.br/oauth2/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${process.env.INTELBRAS_BASIC_AUTH}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  if (!response.ok) {
    throw new Error('Erro ao gerar token');
  }

  const data = await response.json();
  token = data.access_token;
  expira = Date.now() + (data.expires_in * 1000);
}

export default async function handler(req, res) {
  const { serial } = req.query;

  if (!serial) {
    return res.status(400).json({ error: 'Serial não informado' });
  }

  try {
    if (!token || Date.now() > expira) {
      await gerarToken();
    }

    const response = await fetch(
      `https://api-v2.intelbras.com.br/products/1.0.0/serial-numbers/${serial}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Erro na consulta' });
    }

    const data = await response.json();
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
