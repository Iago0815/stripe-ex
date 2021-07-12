const cors = require("cors");
const express = require("express");
const stripe = require("stripe")(
  "sk_test_51IaoVWDlWSgIVBHS4HGfQ1p1vlJH3cmbhVtqUakDlexhWkgJkPn33hySqkCjaaiJIqZPOKwkEA2o7GdxRcoxSsIo00cT38UBUr"
);

const { v4: uuidv4 } = require("uuid");

const app = express();

//middleware

app.use(express.json());
app.use(cors());

app.post("/payment", async (req, res) => {
  //we need to pass a token from the frontend
  //destructuring assignment
  const { token } = req.body;

  //unique id

  const idempotencyKey = uuidv4();

  const charges = await stripe.charges.create(
    {
      amount: 3000,
      currency: "usd",

      source: token.id,
      // receipt_email: token.email,
      // description: product.name,
    },
    { idempotencyKey }
  );

  res.status(200).json(charges);
});

// .catch((err) => console.log(err));

//listen

app.listen(8282, () => console.log("LISTENING AT PORT 8282"));
