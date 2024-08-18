const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.axtsmlj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const database = client.db('pagify');
    const productCollection = database.collection('product');

    app.get("/products", async (req, res) => {
      const { search, sort, priceSort, brand, category,minPrice, maxPrice, page=1 } = req.query;
      let query = {};
      let sortQuery = {};
      const limit = 10;
      const skip = (page - 1) * limit;


      // Filtering
      if (search) {
        query.name = { $regex: search, $options: 'i' };
      }
      if (brand) {
        query.brand = brand;
      }
      if (category) {
        query.category = category;
      }
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) {
          query.price.$gte = parseFloat(minPrice);
        }
        if (maxPrice) {
          query.price.$lte = parseFloat(maxPrice);
        }
      }
      
      if (sort) {
        sortQuery.created_at = sort === 'date-asc' ? 1 : -1;
      }
   
      // Sorting by Price
      if (priceSort) {
        sortQuery.price = priceSort === 'price-asc' ? 1 : -1;
      }
      const totalItems = await productCollection.countDocuments(query);
      const products = await productCollection.find(query).sort(sortQuery).skip(skip).limit(limit).toArray();
      res.send({
        totalItems,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalItems / limit),
        products
      });
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('pagifyPulse server is running');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
