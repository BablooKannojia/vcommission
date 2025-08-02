import { create, router as _router, defaults } from 'json-server';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = create();
const router = _router(join(__dirname, 'db.json'));
const middlewares = defaults();

server.use(middlewares);

// Custom routes for filtering
server.get('/marketplaceMetrics', (req, res) => {
  const { startDate, endDate } = req.query;
  let metrics = router.db.get('marketplaceMetrics').value();
  
  if (startDate && endDate) {
    metrics = metrics.filter(metric => {
      return metric.date >= startDate && metric.date <= endDate;
    });
  }
  
  res.jsonp(metrics);
});

server.use(router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Server error:', err);
});