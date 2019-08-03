const mongoose = require('mongoose'),
      URI = 'mongodb+srv://Seba1705:Seba1705@primerbase-qdsue.mongodb.net/merntask';

mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;