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

  const SUPABASE_URL = process.env.NEXT_PUBLIC_CRIZAC_POTLACK_URL || process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_CRIZAC_POTLACK_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return response.status(500).json({ error: 'Missing Supabase credentials in environment variables.' });
  }

  // GET request - Fetch current progress from Supabase
  if (request.method === 'GET') {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/progress?select=*`, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        return response.status(res.status).json({ error: data.message || 'Error fetching data' });
      }

      return response.status(200).json({ message: 'success', data: data });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  // POST request - Update progress in Supabase (Upsert)
  if (request.method === 'POST') {
    try {
      const { id, status, progress } = request.body;
      
      if (id === undefined || status === undefined || progress === undefined) {
        return response.status(400).json({ error: 'Missing required fields' });
      }

      // Upsert the new item
      const res = await fetch(`${SUPABASE_URL}/rest/v1/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify({ id, status, progress })
      });

      if (!res.ok) {
        const errorData = await res.json();
        return response.status(res.status).json({ error: errorData.message || 'Error updating data' });
      }

      return response.status(200).json({ message: 'success', id });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  // Method not allowed
  return response.status(405).json({ error: 'Method not allowed' });
};
