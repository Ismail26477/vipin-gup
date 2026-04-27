const { MongoClient } = require('mongodb');

const mongoUri = process.env.MONGODB_URI;
const dbName = process.env.DATABASE_NAME || 'trolley';

// Default categories fallback
const defaultCategories = [
  { id: 'cabin', name: 'Cabin Trolleys', slug: 'cabin', description: 'Compact cabin-sized luggage' },
  { id: 'medium', name: 'Medium Trolleys', slug: 'medium', description: 'Perfect for weekend trips' },
  { id: 'large', name: 'Large Trolleys', slug: 'large', description: 'Ideal for extended travels' },
  { id: 'hardshell', name: 'Hard Shell', slug: 'hardshell', description: 'Durable hard shell luggage' },
  { id: 'softshell', name: 'Soft Shell', slug: 'softshell', description: 'Flexible soft luggage' },
  { id: 'sets', name: 'Luggage Sets', slug: 'sets', description: 'Complete luggage sets' },
];

async function handler(req, res) {
  try {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    if (req.method !== 'GET') {
      res.status(405).json({ success: false, error: 'Method not allowed' });
      return;
    }

    // Check if MongoDB URI is configured
    if (!mongoUri) {
      console.log('[v0] MongoDB URI not configured, returning default categories');
      res.status(200).json({
        success: true,
        data: defaultCategories,
        source: 'default'
      });
      return;
    }

    let client;
    try {
      console.log('[v0] Attempting MongoDB connection for categories...');
      
      client = new MongoClient(mongoUri, { 
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 5000,
        connectTimeoutMS: 5000,
      });
      
      await client.connect();
      console.log('[v0] MongoDB connected successfully');
      
      const db = client.db(dbName);
      const categories = await db.collection('categories').find({}).toArray();
      
      console.log('[v0] Retrieved', categories.length, 'categories from database');
      res.status(200).json({
        success: true,
        data: categories && categories.length > 0 ? categories : defaultCategories,
        source: 'database'
      });
    } catch (dbError) {
      console.warn('[v0] Database error, using fallback:', dbError.message);
      res.status(200).json({
        success: true,
        data: defaultCategories,
        source: 'fallback'
      });
    } finally {
      if (client) {
        try {
          await client.close();
        } catch (closeError) {
          console.warn('[v0] Error closing client:', closeError.message);
        }
      }
    }
  } catch (error) {
    console.error('[v0] Unexpected error:', error);
    res.status(200).json({
      success: true,
      data: defaultCategories,
      source: 'fallback-error'
    });
  }
}

module.exports = handler;
exports.default = handler;
