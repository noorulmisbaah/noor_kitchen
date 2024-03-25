const { readJSONFile } = require('./utils');

function checkSigninInfo(req, res) {
    const fileContent = readJSONFile('./users/users.json');
    const { username, password } = req.body;
    const [currentUser] = fileContent.filter(user => user.username === username); 

    if (!(currentUser) || (currentUser.password !== password))
        res.send(JSON.stringify({ found: false }));
    else {
        res.send(JSON.stringify({ found: true }));
    }
}

module.exports = { checkSigninInfo };