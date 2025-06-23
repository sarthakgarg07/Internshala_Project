const { EntitySchema } = require('@mikro-orm/core');

const RequestLog = new EntitySchema({
  name: 'RequestLog',
  properties: {
    id: { type: 'number', primary: true, autoincrement: true },
    method: { type: 'string' },
    url: { type: 'string' },
    requestHeaders: { type: 'json' },
    requestBody: { type: 'text', nullable: true },
    status: { type: 'number' },
    responseHeaders: { type: 'json' },
    responseBody: { type: 'text', nullable: true },
    createdAt: { type: 'date', onCreate: () => new Date() },
  },
});

module.exports = { RequestLog }; 