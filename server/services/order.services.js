const Product = require('../models/Product');

exports.updateStockService = async function(id, quantity){
    const product = await Product.findById(id);
    product.stock -= quantity;
    product.save({ validateBeforeSave: false });
};  