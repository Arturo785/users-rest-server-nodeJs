const jwt = require('jsonwebtoken');



const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.SECRET_KEY_JTW, {
            expiresIn: '4h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('Token gen failed')
            }
            else {
                resolve(token)
            }
        });
    });
}



module.exports = {
    generateJWT,
}