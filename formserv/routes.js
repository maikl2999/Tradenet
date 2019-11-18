let multer  = require('multer')
let upload = multer()

module.exports = function (app) {
    let existingEmails = ['misha@ukr.net', 'oleg@ukr.net'];
    app.post('/register', upload.none(), function (req, res) {
        let result = {
            error: 'The email you provided already registered',
            success: false
        };

        const email = req.body.email;
        
           if (!existingEmails.includes(email)) {
            existingEmails.push(email);
            result.error = null;
            result.success = true;
        }

        res.send(result);
    });

};




/*
module.exports = function (app) {
    let existingEmails = ['misha@ukr.net', 'oleg@ukr.net'];
    app.post('/register', function (req, res) {
        let result = {
            error: 'The email you provided already registered',
            success: false
        };

        const {email} = req.body;
        
           if (!existingEmails.includes(email)) {
            existingEmails.push(email);
            result.error = null;
            result.success = true;
        }


        res.send(result)

    });

};
*/