//
const mongoose = require('mongoose');
const dbConfig =
  'mongodb+srv://rafael:ntH2WXXDEp9vaSlG@cluster0.yzke8a9.mongodb.net/?retryWrites=true&w=majority';

mongoose.set('strictQuery', true);
const connection = mongoose.connect(dbConfig, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
