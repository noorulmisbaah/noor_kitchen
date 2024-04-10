const utils = require('./utils');

function removeUser(req, res) {
    const { username } = req.body;
    const users = utils.readJSONFile('./users/users.json');
    const newUsers = users.filter(user => user.username !== username);

    utils.writeJSONFile('./users/users.json', newUsers);
    utils.removeUserDirectory(`./users/${username}`);
    res.send(JSON.stringify({ removed: true }));
}

module.exports = { removeUser };