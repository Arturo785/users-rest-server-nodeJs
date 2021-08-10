const { response } = require('express');
const User = require('../models/user');

const bcryptjs = require('bcryptjs');

const { generateJWT } = require('../helpers/jwtGenerator')
const { googleVerify } = require('../helpers/googleVerify')


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email })

        if (!user || !user.state) {
            return res.status(400).json({
                msg: 'That user does not exists or is deactivated'
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Password is incorrect'
            })
        }

        //JWT
        const token = await generateJWT(user.id);

        res.json({
            msg: 'Login ok',
            email,
            token,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Something went wrong'
        })
    }
}

const loginGoogle = async (req, res = response) => {

    const { id_token } = req.body;

    try {
        const { email, name, image } = await googleVerify(id_token);

        let userExists = await User.findOne({ email });

        if (!userExists) {
            const data = {
                name,
                email,
                password : 'na', // does not matter in case from coming from google
                image,
                google: true,
            };

            userExists = new User(data)

            await userExists.save(userExists)
        }

        if (!userExists.state) {
            return res.status(401).json({
                msg: 'User blocked'
            });
        }

        const token = await generateJWT(userExists.id);

        res.json({
            msg: 'Google Login ok',
            email,
            token,
        });

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            msg: 'Something went wrong with token'
        })
    }
}



module.exports = {
    login,
    loginGoogle
}