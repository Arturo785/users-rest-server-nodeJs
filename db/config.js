const mongoose = require('mongoose');



const dbConnection = async () => {

    try {
        // our config
       await mongoose.connect(process.env.MONGODB_ATLAS, {
           useNewUrlParser : true,
           useUnifiedTopology : true,
           useCreateIndex : true,
           useFindAndModify : false
       });

       console.log("DB is up");

    } catch (error) {
        console.log(error);
        throw new Error("error starting DB");
    }
}



module.exports = {
    dbConnection,
}