const utils = require('./utils');

/**
 * Handles the review request
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @description Handles the review request.
 */
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