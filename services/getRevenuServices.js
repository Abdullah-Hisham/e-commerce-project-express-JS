const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const ApiError = require('../utils/ApiError');


const calcTotalOrderPrice = (cart) => {
    let revenu = 0;
    cart.forEach((item) => {
    revenu += item.totalOrderPrice;
    });
    cart.totalCartPrice = revenu;

    return revenu;
};


// eslint-disable-next-line no-shadow
exports.getRevenu=asyncHandler(
        async (req, res) => {
            const order = await Order.find({isPaid:true});
            const revenu = calcTotalOrderPrice(order);
            res.status(200).json({ revenu: revenu });
        }
    )



exports.getRevenuByDate=asyncHandler(
    async (req, res) => {
        try {
            const startOfYear = new Date(new Date().getFullYear(), 0, 1);
            const endOfYear = new Date(new Date().getFullYear() + 1, 0, 1);
    
            const orders = await Order.aggregate([
                {
                    $match: {
                        isPaid: true,
                        updatedAt: {
                            $gte: startOfYear,
                            $lt: endOfYear
                        }
                    }
                },
                {
                    $group: {
                        _id: { $month: "$updatedAt" },
                        totalPrice: { $sum: "$totalOrderPrice" }
                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ]);
            const results = Array(12).fill(0);
            orders.forEach(order => {
            results[order._id - 1] = order.totalPrice;
        });

            res.json({results:results})
    
        } catch (error) {
            res.status(500).send(error);
        }
    }
)


