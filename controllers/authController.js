const { response } = require('express');
const User = require('../models/user');

const bcryptjs = require('bcryptjs');

const {generateJWT} = require('../helpers/jwtGenerator')


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



module.exports = {
    login,
}