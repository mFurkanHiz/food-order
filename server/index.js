//express paketini tanımladık
const express = require("express");
//cors paketini tanımladık.
const cors = require("cors");
//app middleware i vasıtasıyla express kütüphanesine erişim sağladık.
const app = express();

//db için hazırlamış olduğumuz js dosyasını çağıralım.
const db = require("./db");
const burgerModel = require("./models/BurgerModel");
const burgersRoute = require("./routes/burgersRoute");
const usersRoute = require("./routes/usersRoute");
const ordersRoute = require("./routes/ordersRoute");

//middlewareimiz ile cors kütüphanesini kullanmayı ve json req ve res'lerinde hata almanın önüne geçtik.
app.use(express.json());
app.use(cors());

//servisleri route ile çağırma
//burger servisleri
app.use("/api/burgers", burgersRoute);

//user servisleri
app.use("/api/users", usersRoute);

//order servisleri
app.use("api/orders", ordersRoute);

//serverımızı inşa edeceğimiz portu belirledik.
var port = 4000;
app.listen(4000, () => {
  console.log(
    `Food Order Serverı ${port} portunda başarıyla ayağa kalktı. 🔥🔥`
  );
});
