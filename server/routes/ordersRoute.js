const express = require("express");
const router = express.Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
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
      res.send("Ödeme Başarısız");
    }
  } catch (error) {
    res.status(400).json({ message: "Ödeme Başarısız", error });
  }
});

module.exports = router;
