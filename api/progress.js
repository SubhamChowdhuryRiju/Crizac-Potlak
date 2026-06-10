module.exports = async function handler(request, response) {
  // CORS Headers for Vercel
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  const BIN_ID = process.env.JSONBIN_BIN_ID;
  const API_KEY = process.env.JSONBIN_API_KEY;

  if (!BIN_ID || !API_KEY) {
    return response.status(500).json({ error: 'Missing JSONBin credentials in environment variables.' });
  }

  // GET request - Fetch current progress from JSONBin
  if (request.method === 'GET') {
    try {
      const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: 'GET',
        headers: {
          'X-Master-Key': API_KEY
        }
      });
      
      const json = await res.json();
      
      if (!res.ok) {
        return response.status(res.status).json({ error: json.message });
      }

      // JSONBin wraps data in a 'record' object
      const data = json.record || [];
      return response.status(200).json({ message: 'success', data: data });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  // POST request - Update progress in JSONBin
  if (request.method === 'POST') {
    try {
      const { id, status, progress } = request.body;
      
      if (id === undefined || status === undefined || progress === undefined) {
        return response.status(400).json({ error: 'Missing required fields' });
      }

      // 1. Fetch current data first
      const getRes = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: 'GET',
        headers: {
          'X-Master-Key': API_KEY
        }
      });
      
      let currentData = [];
      if (getRes.ok) {
        const getJson = await getRes.json();
        currentData = getJson.record || [];
      } else {
         // If it's empty or hasn't been initialized, we might get an error, but let's assume it's an array
         if (getRes.status !== 404) {
             const errJson = await getRes.json();
             return response.status(getRes.status).json({ error: errJson.message });
         }
      }

      // Ensure it's an array
      if (!Array.isArray(currentData)) {
          currentData = [];
      }

      // 2. Update or insert the new item
      const itemIndex = currentData.findIndex(item => item.id === id);
      if (itemIndex > -1) {
          currentData[itemIndex] = { id, status, progress };
      } else {
          currentData.push({ id, status, progress });
      }

      // 3. Save the updated data back to JSONBin
      const putRes = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': API_KEY
        },
        body: JSON.stringify(currentData)
      });

      const putJson = await putRes.json();
      
      if (!putRes.ok) {
        return response.status(putRes.status).json({ error: putJson.message });
      }

      return response.status(200).json({ message: 'success', id });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  // Method not allowed
  return response.status(405).json({ error: 'Method not allowed' });
};
