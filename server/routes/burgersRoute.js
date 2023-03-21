const express = require("express");
const burgerodel = require("../models/BurgerModel");
const router = express.Router(); // rotalama yaptırıyor

//GET ALL FOODS SERVİSİ
app.get("/getFoods", async (req, res) => {
  try {
    const foods = await burgerModel.find({});
    res.send(foods);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
