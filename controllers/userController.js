const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');



const getUser = async (req, res = response) => {

    const { limit = 5, from = 0 } = req.query; // this gets the query params that are optional
    // const users = await User.find({ state: true }) // only the ones that are active
    //     .skip(Number(from))
    //     .limit(Number(limit));

    // const totalAmount = await User.countDocuments({ state: true })

    const [totalAmount, users] = await Promise.all([
        User.countDocuments({ state: true }),
        User.find({ state: true }) // only the ones that are active
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    const authenticatedUser = req.user;

    res.json({
        msg: 'GET (controller)',
        "total": totalAmount,
        users,
        authenticatedUser,
    });
}

const postUser = async (req, res = response) => {

    const { name, email, password, role } = req.body; //only the fields we want the user to control to send, the other we managed it

    const user = new User({ name, email, password, role }); // only sets the matching fields

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt); // gets encrypted

    await user.save();

    res.json({
        msg: 'GET (controller)',
        user
    });
}

const putUser = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...extra } = req.body; //only the fields we want the user to control to send, the other we managed it

    if (password) { // wants to change it
        const salt = bcryptjs.genSaltSync();
        extra.password = bcryptjs.hashSync(password, salt); // gets encrypted
    }

    const user = await User.findByIdAndUpdate(id, extra);



    res.json({
        msg: 'PUT (controller)',
        id
    });
}

const deleteUser = async (req, res = response) => {

    const { id } = req.params;

    // hard delete
    //const user = await User.findByIdAndDelete(id);

    // soft delete
    const user = await User.findByIdAndUpdate(id, {state : false});

    const authenticatedUser = req.user;

    res.json({
        msg: 'DELETE (controller)',
        user,
        authenticatedUser
    });
}


module.exports = {
    getUser,
    postUser,
    putUser,
    deleteUser,
}