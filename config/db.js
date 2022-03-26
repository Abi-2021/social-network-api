const mongoose = require('mongoose');

const connectDB = async function() {
    await mongoose.connect(process.env.DB_URL, {
        USENewUrlParser: true
    }, function (err) {
        if (err) throw new Error('Connection issue ${err}');
        console.log('Database connected!')
    });
}

module.exports = connectDB;