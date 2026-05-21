const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();
const port = parseInt(process.env.PORT || '3000', 10);
const hostname = '0.0.0.0';

console.log('Starting Next.js server...');
console.log('Dev mode:', dev);
console.log('Port:', port);

app.prepare()
  .then(() => {
    console.log('Next.js app prepared successfully');
    
    const server = createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        console.log('Handling request:', req.url);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error('Error handling request:', err);
        res.statusCode = 500;
        res.end('Internal server error');
      }
    });

    server.listen(port, hostname, (err) => {
      if (err) {
        console.error('Server failed to start:', err);
        process.exit(1);
      }
      console.log(`✓ Ready on http://localhost:${port}`);
    });

    server.on('error', (err) => {
      console.error('Server error:', err);
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error('Failed to prepare Next.js app:', err);
    process.exit(1);
  });
