const express = require('express');
const cors = require('cors');
const { MikroORM } = require('@mikro-orm/core');
const mikroOrmConfig = require('./mikro-orm.config');
const { RequestLog } = require('./entities/RequestLog');

const app = express();
app.use(cors());
app.use(express.json());

let orm;
const historyCache = new Map(); // key: `${limit}:${offset}`, value: { logs, count }

(async () => {
  orm = await MikroORM.init(mikroOrmConfig);
  await orm.getSchemaGenerator().updateSchema();

  // POST /api/request - log a request/response
  app.post('/api/request', async (req, res) => {
    try {
      const em = orm.em.fork();
      const { method, url, requestHeaders, requestBody, status, responseHeaders, responseBody } = req.body;
      const log = em.create(RequestLog, {
        method, url, requestHeaders, requestBody, status, responseHeaders, responseBody, createdAt: new Date()
      });
      await em.persistAndFlush(log);
      historyCache.clear(); // Invalidate cache on new log
      res.json(log);
    } catch (err) {
      console.error('Error saving log:', err);
      res.status(500).json({ error: err.message });
    }
  });

  // GET /api/history?limit=10&offset=0 - paginated logs with cache
  app.get('/api/history', async (req, res) => {
    try {
      const em = orm.em.fork();
      const limit = parseInt(req.query.limit) || 10;
      const offset = parseInt(req.query.offset) || 0;
      const cacheKey = `${limit}:${offset}`;

      if (historyCache.has(cacheKey)) {
        // Serve from cache
        return res.json(historyCache.get(cacheKey));
      }

      const [logs, count] = await em.findAndCount(RequestLog, {}, { limit, offset, orderBy: { id: 'DESC' } });
      const result = { logs, count };
      historyCache.set(cacheKey, result);
      res.json(result);
    } catch (err) {
      console.error('Error fetching history:', err);
      res.status(500).json({ error: err.message });
    }
  });

  const PORT = 4000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})(); 