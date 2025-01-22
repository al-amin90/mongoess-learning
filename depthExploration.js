db.test.insertOne({name: "something"})
db.test.insertMany([
    { name: "Complete Web Development" },
    { name: "Level 2 web development" }
])
db.test.find({gender: "Male"}, {name: 1, email: 1, phone: 1, gender: 1})
db.test.find({gender: "Male"}).project({name: 1, gender: 1})

db.test.find(
    {
        age: { $gte: 18,  $nin : [18, 20 , 22, 24, 26, 28, 30] }, // ati condition and ba implicit and && bole
        gender: { $eq: "Female" },
        interests: { $in : ["Cooking" , "Gardening"]}
    },
    { age: 1 , gender: 1, interests: 1}
).sort({age: 1})
   

db.test.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000066") },
    {
        $push: {
            interests: { $each: ["Writeing", "Cooking"]}
        }
    }
)

db.test.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000066") },
    {
        $pullAll:  {friends : ["Nahid Hasan Bulbul", "Mir Hussain",]}
    }
)





   