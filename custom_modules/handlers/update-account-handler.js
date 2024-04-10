const utils = require('./utils');
const fs = require('fs');

function updateAccount(req, res) {
    const { username, newUsername, newUseremail, oldPassword, newPassword } = req.body;
    const users = utils.readJSONFile('./users/users.json');
    const [user] = users.filter(user => user.username === username.toLowerCase());
    
    if (!user)
        return;
    if (users.some(user => user.username === newUsername.toLowerCase()))
        res.send(JSON.stringify({ updated: false, response: 'an account exists with the information you provided.' }));
    else if (users.some(user => user.email === newUseremail))
        res.send(JSON.stringify({ updated: false, response: 'an account exists with the information you provided.' }));
    else if (newPassword && (user.password !== oldPassword))
        res.send(JSON.stringify({ updated: false, response: 'a password mismatch has been detected.' }));
    else {
        for (var i = 0; i < users.length; i++) {
            console.log('Making changes llo')
            if (users[i].username === username.toLowerCase()) {
                users[i].username = newUsername || username;
                users[i].email = newUseremail || users[i].email;
                users[i].password = newPassword || user.password;

                if (newUsername) {
                    fs.renameSync(`./users/${username}`, `./users/${newUsername}`);
                }

                utils.writeJSONFile('./users/users.json', users);
                utils.writeJSONFile(`./users/${newUsername || username}/user_information.json`, { 
                    username: newUsername || username,
                    email: newUseremail || user.email,
                    password: newPassword || user.password
                });
            }
        }
        res.send(JSON.stringify({ updated: true }));
    }
}

module.exports ={ updateAccount };