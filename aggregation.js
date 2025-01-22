db.test.aggregate([
    //stage-1
    { $match: {gender: "Male" }},
    //stage-2
    { $addFields : { course: "Level-2"}},
      //stage-3
    { $project: {age: 1 , name :1 , gender: 1}}
])

db.test.aggregate([
    //stage-1
    { $match: {gender: "Male" } },
      //stage-2
    { $addFields : { course: "Level-2", eduTech: "PH", monerMoto: "Moner Issa"}},
      //stage-3
    // { $project: {eduTech: 1 , course :1 , gender: 1}},
    // stage-4
    { $out: "courseStudents"}  
])

db.test.aggregate([
    //stage-1
    { $match: {gender: "Male" } },
      //stage-2
    { $addFields : { course: "Level-2", eduTech: "PH", monerMoto: "Moner Issa"}},
      //stage-3
    { $project: {eduTech: 1 , course :1 , gender: 1}},
    // stage-4
    { $merge: "test"}  
])

db.test.aggregate([
    //stage-1
    {
        $group: {
            _id: "$address.country",
            count: { $sum: 1 },
            fullDoc: { $push: "$$ROOT" }
        }
    },
    //stage-2
    {
        $project: {
            "fullDoc.name" : 1,
            "fullDoc.email" : 1,
            "fullDoc.phone" : 1,
        }
    }
    //stage-3
    //stage-4
])


db.test.aggregate([
    //stage-1
    {
        $group: { 
            _id: null,
            totalSalary: { $sum: "$salary" },
            maxSalary: { $max: "$salary"},
            minSalary: { $min: "$salary"},
            avgSalary: { $avg: "$salary"}
        }
    },
    //stage-2
    { 
        $project: {
            totalSalary: 1,
            maxSalary: 1,
            minSalary: 1,
            averageSalary: "$avgSalary",
            rangeBetweenMaxandMin: { $subtract: ["$maxSalary", "$minSalary"]},
            totalMaxandMin: { $add: ["$maxSalary", "$minSalary"]}
        }
    }
    //stage-3
    //stage-4
])

db.test.aggregate([
    // stage-1
    {
        $unwind: "$interests"
    },
    // stage-2
    {
        $group: { _id: "$age", interesrsPerAge: { $push: "$interests" } }
    }
])

db.test.aggregate([
    //stage-1
    { 
        $bucket: {
            groupBy: "$age",
            boundaries: [20, 40, 60, 80],
            default: "80 ar uporer bura gula",
            output: {
                count: { $sum: 1},
                karakaraAse: { $push: "$$ROOT"}
            }
        }
        
    },
    //stage-2
    {
        $sort: { count: -1}
    },
    //stage-3
    {
        $limit: 2
    } ,
    //stage-4
    {
        $project: {count: 1}
    }
])

db.orders.aggregate([
    {
        $lookup: {
               from: "test",
               localField: "userId",
               foreignField: "_id",
               as: "user"
             }
    }
])

db.users.countDocuments({gender: "male"})