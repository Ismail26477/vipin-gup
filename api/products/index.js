const defaultProducts = [
  { id: '1', name: 'Premium Trolley - Black', price: 4999, category_id: 'cabin', image: '/images/prod-urban-gray-1.jpg' },
  { id: '2', name: 'Elite Trolley - Burgundy', price: 5999, category_id: 'medium', image: '/images/prod-elite-burgundy-1.jpg' },
  { id: '3', name: 'Royal Trolley - Gold', price: 6999, category_id: 'large', image: '/images/prod-royal-4in1-1.jpg' },
  { id: '4', name: 'Wave Trolley - Fuchsia', price: 4499, category_id: 'hardshell', image: '/images/prod-wave-3in1-1.jpg' },
  { id: '5', name: 'Zenith Trolley - Navy', price: 5499, category_id: 'softshell', image: '/images/prod-zenith-navy-1.jpg' },
  { id: '6', name: 'Apex Trolley - Titanium', price: 7499, category_id: 'sets', image: '/images/prod-apex-titanium-1.jpg' },
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
    data: defaultProducts,
    source: 'default'
  });
};
