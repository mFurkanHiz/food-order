const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

//connection'ın açık kapalı olmasına göre iki farklı opsiyon verdiğimiz veritabanını dinleyen metotları yazalım.

var db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongo DB bağlantısı başarıyla sağlandı");
});

db.on("error", () => {
  console.log("Mongo DB bağlantısı arızalı");
});

module.exports = mongoose;
