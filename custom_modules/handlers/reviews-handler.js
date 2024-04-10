const utils = require('./utils');

function handleReviewRequest(req, res) {
    const fileContent = utils.readJSONFile('./comments/comments.json');
    const reversedContent = utils.reverseArrayContent(fileContent);

    if (reversedContent)
        res.render('reviews', { reviews: reversedContent });
    else {
        res.render('reviews', { reviews: [] });
    }
}

module.exports = { handleReviewRequest };