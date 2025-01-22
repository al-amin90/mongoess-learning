db.users.countDocuments({ gender: "male" })

db.orders.aggregate([
    {
        $project: {
            totalAmount: "$total_price",
            status: 1
        }
    }
])

db.orders.aggregate([
    {
        $match: {
            status: "Shipped"
        }
    },
    {
        $facet: {
            "totalSale": [
                //stage-1
                {
                    $project: {
                        orderTotal: {
                            $sum: {
                                $map: {
                                    input: "$products",
                                    as: "product",
                                    in: { $multiply: ["$$product.quantity", "$$product.price_per_unit"] }
                                }
                            }
                        }
                    }
                },
                //stage-2
                {
                    $group: { _id: null, totalSale: { $sum: "$orderTotal" } }
                },
                // stage-3
                {
                    $project: { totalSale: 1 }
                }
            ],
            "avgOrderTotal": [
                {
                    $project: {
                        orderTotal: {
                            $sum: {
                                $map: {
                                    input: "$products",
                                    as: "product",
                                    in: { $multiply: ["$$product.quantity", "$$product.price_per_unit"] }
                                }
                            }
                        }
                    }
                },
                {
                    $group: { _id: null, avgOrder: { $avg: "$orderTotal"}}
                },
                // stage-3
                {
                    $project: {  9 : 1,  avgOrder: 1 }
                }
            ]
        }
    }
])