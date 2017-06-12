/**
 * @author Sven Koelpin
 */

const tweetService = require('./TweetService');

module.exports = server => {
    //TODO
    // - Add validation (use the Validation-middleware, location in src/server/common/Validation)
    // - Add validation (validateQueryParams)
    //   - page (number, min 1, max 10, default 1
    //   - size (number, min 1, max 100, default 10
    server.get('tweets', (req, res, next) => {
        const page = req.params.page ? parseInt(req.params.page, 10) : 1;
        const size = req.params.size ? parseInt(req.params.size, 10) : 10;
        const start = (page - 1) * size;
        const allTweets = tweetService.getTweets(start, size);
        res.send(allTweets);
        next();
    });
    //TODO:
    // - Implement createTweet, which listens to HTTP-POST (path: 'tweets'). Use  TweetService#createTweet
    // - The posted tweet is saved in req.body (don't forget to add the bodyParser()-middleware in Server.js)
    // - Add validation (validatePostBody).
    //  - a tweet needs to have at least the properties:
    //      - tweet (string, min. 3 chars, max 100 chars, required)
    //      - user (string, min. 3 chars, max 50 chars, required)

    //TODO:
    // - Implement getTweet which gets a single tweet by its id.
    //   - The method is a HTTP-GET method that has a dynamic path parameter :id (path: 'tweets/:id).
    //   - Use TweetService#getTweet
    //   - The path-parameter can be found in req.params

};