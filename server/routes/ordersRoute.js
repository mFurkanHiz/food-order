const express = require("express");
const router = express.Router();
require("dotenv").config();
const stripe = require("stripe")(
  "sk_test_51MV9VIAEY249VO0ytdJflCM58bJdALVUF7Jp4WQka9EAzE0d3FP2Kjg9zQGUsgU76qt99jM9X63DPl7awtIlIhCu00JnmKG2sB"
);
const { v4: uuidv4 } = require("uuid");

const cors = require("cors");
const OrderModel = require("../models/OrderModel");
const app = express();

app.use(cors());

router.post("/checkout", async (req, res) => {
  const { token, toplamfiyat, currentUser, cartItems } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: toplamfiyat * 100,
        currency: "TRY",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      const newOrder = new OrderModel({
        name: currentUser.name,
        email: currentUser.mail,
        userid: currentUser._id,
        orderItems: cartItems,
        orderAmount: toplamfiyat,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          zipCode: token.card.address_zip,
        },
        transactionId: payment.source.id,
      });

      newOrder.save();

      res.send("Ödeme Başarıyla Gerçekleşti");
    } else {
      res.send("upps bir şeyler ters gitti..");
    }
  } catch (error) {
    res.status(400).json({ message: "Ödeme Başarısız", error });
  }
});

router.post("/getusersorders", async (req, res) => {
  const { userid } = req.body;

  try {
    const orders = await OrderModel.find({ userid: userid }).sort({ _id: -1 });
    res.send(orders);
  } catch (error) {
    res.status(400).json({ message: "Siparişlere Erişilemiyor" });
  }
});

//GET ALL ORDERs SERVİSİ
router.get("/getAllOrders", async (req, res) => {
  try {
    const orders = await OrderModel.find({});
    res.send(orders);
  } catch (err) {
    console.log(err);
  }
});

//deliver post işlemi
router.post("/deliverOrder", async (req, res) => {
  const orderid = req.body.orderid;

  try {
    const order = await OrderModel.findOne({ _id: orderid });
    order.isDelivered = true;
    await order.save();
    res.send("Sipariş Başarıyla Teslim Edildi");
  } catch (error) {
    res.status(400).json({ message: "Siparişlere Erişilemiyor", error });
  }
});

module.exports = router;
