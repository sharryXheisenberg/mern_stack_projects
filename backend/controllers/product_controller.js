const Product = require('../models/product');


exports.initializeDatabase = async (req, res) => {
  try {
    const fetchDataAndSeed = require('../utils/fetchData');
    await fetchDataAndSeed();
    res.status(200).json({ message: 'Database initialized with seed data' });
  } catch (error) {
    res.status(500).json({ message: 'Error initializing database', error });
  }
};


exports.getTransactions = async (req, res) => {
  const { page = 1, perPage = 10, search = '' } = req.query;
  const regex = new RegExp(search, 'i');

  try {
    const transactions = await Product.find({
      $or: [
        { title: regex },
        { description: regex },
        { price: { $regex: regex } }
      ]
    })
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
};


exports.getStatistics = async (req, res) => {
  const { month } = req.query;

  try {
    const sales = await Product.aggregate([
      {
        $match: {
          dateOfSale: { $regex: new RegExp(`-${month}-`, 'i') },
        }
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$price' },
          soldItems: { $sum: { $cond: [{ $eq: ['$sold', true] }, 1, 0] } },
          notSoldItems: { $sum: { $cond: [{ $eq: ['$sold', false] }, 1, 0] } }
        }
      }
    ]);

    res.status(200).json(sales[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error });
  }
};
