const axios = require('axios');
const Product = require('../models/Product');

const fetchDataAndSeed = async () => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const data = response.data;

    
    await Product.insertMany(data);
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error fetching or seeding data:', error);
  }
};

module.exports = fetchDataAndSeed;
