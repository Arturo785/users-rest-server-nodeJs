const {response} = require('express');


const getUser = (req, res = response) => {

    const params = req.query; // this gets the query params that are optional

    res.json({
        msg : 'GET (controller)',
        params
    });
}

const postUser = (req, res = response) => {

    const body = req.body;

    res.json({
        msg: 'POST (controller)',
        body
    });
}

const putUser = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'PUT (controller)',
        id 
    });
}

const deleteUser = (req, res = response) => {
    res.json({
        msg: 'DELETE (controller)'
    });
}


module.exports = {
    getUser,
    postUser,
    putUser,
    deleteUser,
}