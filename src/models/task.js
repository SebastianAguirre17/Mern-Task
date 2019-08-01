const mongoose = 'mongoose',
      URI = 'mongodb+srv://Seba1705:Seba1705@primerbase-qdsue.mongodb.net/merntask';

mongoose.conect(URI)
    .then(db => console.log('DB is conected'))
    .catch(err => console.error(err));

module.exports(mongoose);