const mongoose = require('mongoose');

function connecToDatabase(){
    mongoose.connect(process.env.DB_CONNECT,
).then(()=>{
    console.log('Connected to MongoDB');
}).catch(err => console.error(err));
}

module.exports = connecToDatabase;