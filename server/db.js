const mongoose = require("mongoose");

const DB_LINK =
  "mongodb+srv://admin:asd@cluster0.jkgfq38.mongodb.net/food-order?retryWrites=true&w=majority";
mongoose.connect(DB_LINK);

//connection'ın açık kapalı olmasına göre iki farklı opsiyon verdiğimiz veritabanını dinleyen metotları yazalım.
var db = mongoose.connection;
db.on("connected", () => {
  console.log("Mongo DB bağlantısı başarıyla sağlandı");
});

db.on("error", () => {
  console.log("Mongo DB bağlantısı arızalı");
});

module.exports = mongoose;
