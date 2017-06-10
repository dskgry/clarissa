/**
 * @author Sven Koelpin
 */
const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const config = require('../config/config');
const logger = require('./Logger');
const security = require('../security/Security');

const PORT = 3001;

const server = restify.createServer({
    name: 'Twttr',
    log: logger,
    version: '1.0.0'
});
server.on('uncaughtException', (req, res, route, err) => {
    logger.error(err);
    res.send(500);
});

//middlewares
const cors = corsMiddleware({
    origins: config.origins,
    allowHeaders: ['Authorization']
});
server.pre(cors.preflight);
server.pre(restify.throttle({burst: 2, rate: 2, ip: true}));


server.use(cors.actual);
server.use(restify.acceptParser(['application/json', 'text/event-stream']));
server.use(restify.requestLogger());
server.use(restify.gzipResponse());
server.use(restify.queryParser());
server.use(restify.bodyParser({mapParams: false}));

server.use(security);


module.exports = {
    register(resource){
        resource(server);
    },
    start() {
        server.listen(PORT, () => {
            logger.info(`Server started: http://localhost:${PORT}`);
        });
    }
};
