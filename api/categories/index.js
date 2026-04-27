const defaultProducts = [
  { id: '1', name: 'Premium Trolley - Black', price: 4999, category_id: 'cabin', image: '/images/prod-urban-gray-1.jpg', description: 'Sleek black premium trolley' },
  { id: '2', name: 'Elite Trolley - Burgundy', price: 5999, category_id: 'medium', image: '/images/prod-elite-burgundy-1.jpg', description: 'Elegant burgundy trolley' },
  { id: '3', name: 'Royal Trolley - Gold', price: 6999, category_id: 'large', image: '/images/prod-royal-4in1-1.jpg', description: 'Luxurious gold trolley set' },
  { id: '4', name: 'Wave Trolley - Fuchsia', price: 4499, category_id: 'hardshell', image: '/images/prod-wave-3in1-1.jpg', description: 'Vibrant fuchsia trolley' },
  { id: '5', name: 'Zenith Trolley - Navy', price: 5499, category_id: 'softshell', image: '/images/prod-zenith-navy-1.jpg', description: 'Classic navy trolley' },
  { id: '6', name: 'Apex Trolley - Titanium', price: 7499, category_id: 'sets', image: '/images/prod-apex-titanium-1.jpg', description: 'Premium titanium trolley set' },
  { id: '7', name: 'Compass Trolley - Green', price: 5299, category_id: 'cabin', image: '/images/prod-compass-green-1.jpg', description: 'Travel-ready green trolley' },
  { id: '8', name: 'Luxe Trolley - Cognac', price: 6299, category_id: 'medium', image: '/images/prod-luxe-cognac-1.jpg', description: 'Sophisticated cognac trolley' },
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
