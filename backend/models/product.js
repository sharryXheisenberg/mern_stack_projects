const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  sold: Boolean,
  category: String,
  dateOfSale: Date
});

module.exports = mongoose.model('Product', productSchema);
