const http = require('http');

function testAPI(endpoint, port = 5173) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: port,
      path: endpoint,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          console.log(`✓ ${endpoint}: ${json.success ? 'SUCCESS' : 'FAILED'}`);
          console.log(`  Data count: ${json.data ? json.data.length : 0}`);
          console.log(`  Source: ${json.source || 'unknown'}`);
        } catch (e) {
          console.log(`✗ ${endpoint}: Invalid JSON response`);
        }
        resolve();
      });
    });

    req.on('error', (e) => {
      console.log(`✗ ${endpoint}: ${e.message}`);
      resolve();
    });

    req.end();
  });
}

async function main() {
  console.log('Testing API endpoints...\n');
  await testAPI('/api/categories');
  await testAPI('/api/products');
  console.log('\nDone!');
  process.exit(0);
}

setTimeout(() => {
  console.log('Timeout - server may not be running');
  process.exit(1);
}, 10000);

main();
