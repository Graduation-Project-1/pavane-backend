const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const Customer = require('../../models/customer/customer.repo');
const app = require('express').Router();

app.post('/webhook', async (req, res) => {
  const event = req.body;
  if(event.type == "payment_intent.created"){
    stripe.customers.retrieve(event.data.object.customer).then(async(customer)=>{
        let id = customer.metadata.customerId;
        const customerData = {
            accountType: "premium",
            daysOfSubscription : 30,
        };
        let data = await Customer.update({ _id: id }, customerData);
    }).catch((err)=>{
        console.log(err.message);
    })
  }
  res.send();
});

module.exports = app;