const Bunyan = require('bunyan');
const BunyanPrettyStream = require('bunyan-prettystream-circularsafe');
const { Client, ClientMiddleware, Job } = require('@taskbotjs/client');

const ArgJob = require('./tasks/arg-job');
const middleware = require('./middleware');

const logger = Bunyan.createLogger({
  name: 'producer',
  level: 'trace', // everything you didn't actually want to know
  // level: 'debug', // less spam, includes implementation details
  // level: 'info', // minimal what-you-need-to-know level
  streams: [
    {
      type: 'raw',
      stream: (() => {
        const prettyStream = new BunyanPrettyStream();
        prettyStream.pipe(process.stderr);

        return prettyStream;
      })()
    }
  ]
});

const clientMiddleware = new ClientMiddleware();
clientMiddleware.register(logger, middleware);

const clientPool = Client.withRedisOptions(logger, {
  url: process.env.TASKBOT_REDIS_URL || 'redis://localhost:6379',
  prefix: 'ex/'
}, clientMiddleware);
Job.setDefaultClientPool(clientPool);

const sleepTime = 1000;
const max = 10;
let count = 0;
(async () => {
  while (true) {
    await clientPool.use(async(taskbot) => taskbot.perform(ArgJob, count++));

    logger.info('Queueing a job to be fired in 15 seconds.');
    await clientPool.use(taskbot => taskbot.scheduleIn({ seconds: 15 }, ArgJob, count));

    logger.trace({ sleepTime }, 'sleeping.');
    await sleep(sleepTime);
    if (count >= max) break;
  }
})()
.then(console.log)
.catch(console.error)
.then(() => process.exit());

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
