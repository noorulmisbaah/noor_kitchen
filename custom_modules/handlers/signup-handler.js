const utils = require('./utils');

function createUserAccount(req, res) {
    const { username, password, email } = req.body;
    const fileContent = utils.readJSONFile('./users/users.json');
    const [currentUser] = fileContent.filter(user => user.username === username);

    if (!currentUser) {
        if (fileContent.some(user => user.email === email))
            res.send(JSON.stringify({ created: false }));
        else {
            fileContent[fileContent.length] = { username, password, email };
            utils.writeJSONFile('./users/users.json', fileContent);
            utils.createDirectory(`./users/${username}`, username, { username, password, email });
            res.send(JSON.stringify({ created: true }));
        }
    } else {
        res.send(JSON.stringify({ created: false }));
    }
}

module.exports = { createUserAccount };