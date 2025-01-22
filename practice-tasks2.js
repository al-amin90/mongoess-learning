db.getCollection("massive-data").aggregate([
    {
        $match: { isActive: true }
    },
    {
        $group: { _id: "$gender", count: { $sum: 1}}
    },
    {
        $project: {gender: 1, count: 1}
    }
])

db.getCollection("massive-data").aggregate([
    {
        $match: { isActive: true , favoriteFruit: "banana"}
    },
    {
        $project: {name: 1, email: 1}
    }
])

db.getCollection("massive-data").aggregate([
    // {
    //     $match: { isActive: true , favoriteFruit: "banana"}
    // },
    {
        $group: { _id: "$favoriteFruit", avgAges: {$avg: "$age"} } 
    },
    {
        $sort: { avgAges: -1}
    },
    {
        $project: {avgAges: 1 }
    },
])

db.getCollection("massive-data").aggregate([
    {
        $match: { friends: { $exists: true } }
    },
    {
        $unwind: "$friends"
    },
    {
        $match: {
            "friends.name": /^W/,
        }
    },
    {
        $group: { _id: null, uniqueFriends: { $addToSet: "$friends.name"} }
    },
    {
        $project: {uniqueFriends: 1 }
    },
])