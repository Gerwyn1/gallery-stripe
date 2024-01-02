const express = require('express');
const router = express.Router();
const Art = require("../models/art")
const stripe = require("stripe")(
    "sk_test_51OTjIEIJ2HwS05ZmcUfViQs5X25DtKepVVfKrPkVZHQMgeW0J8FDyCmjaPoMFeUMsw62AdGumsV6y52kpFZYTzsC0028xedT9n"
)

router.post("/create-payment-intent",async (req,res)=>{
    const price = req.query.price
    const amountInCents = Math.round(parseFloat(price) * 100);
    const paymentIntent = await stripe.paymentIntents.create({
        amount:amountInCents,
        currency:"sgd",
        statement_descriptor_suffix:"payment using stripe",
        automatic_payment_methods:{
            enabled:true
        }
    })
    console.log(paymentIntent.client_secret)
    res.send({
        
        clientSecret:paymentIntent.client_secret
    })
})

module.exports = router;
