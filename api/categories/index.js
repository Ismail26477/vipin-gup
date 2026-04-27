const defaultCategories = [
  { id: 'cabin', name: 'Cabin Trolleys', slug: 'cabin', description: 'Compact cabin-sized luggage' },
  { id: 'medium', name: 'Medium Trolleys', slug: 'medium', description: 'Perfect for weekend trips' },
  { id: 'large', name: 'Large Trolleys', slug: 'large', description: 'Ideal for extended travels' },
  { id: 'hardshell', name: 'Hard Shell', slug: 'hardshell', description: 'Durable hard shell luggage' },
  { id: 'softshell', name: 'Soft Shell', slug: 'softshell', description: 'Flexible soft luggage' },
  { id: 'sets', name: 'Luggage Sets', slug: 'sets', description: 'Complete luggage sets' },
];

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }
  
  return res.status(200).json({
    success: true,
    data: defaultCategories,
    source: 'default'
  });
};
