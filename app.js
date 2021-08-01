const express = require("express");
require('dotenv').config()
const app = express();  
const PORT = process.env.PORT;
const connectdb= require('./config/connectDB')
const User = require('./models/Model')
//connect to mongodb database 
connectdb();
//Create and Save a Record of a Model:
var createAndSaveUser = function() {
    var AbdelkaderManoubi = new User({name: "Abdelkader", age: 28, favFoods: ["Coscous", "Pizza", "Chokolat"]});
  
    AbdelkaderManoubi.save(function(err, data) {
      if (err) return console.error(err);
console.log(data)
    });
  };
  createAndSaveUser()

  //Create Many Records with model.create()
const arrayOfPeople= [
    { name: "Jhon", age: 14, favFoods: ["Berger"] },
    { name: "Mark", age: 24, favFoods: ["Panckake"] },
    { name: "Elon", age: 45, favFoods: ["Chokolat"] },
  ];
  
  const createManyPeople = (arrayOfPeople) => {
    User.create(arrayOfPeople, (err, data) => {
      if (err) return console.log(err);
      console.log("aDDPeople",data)
    });
  };
  createManyPeople(arrayOfPeople);

  //Use model.find() to Search Your Database
const findPeopleByName = (personName) => {
  User.findOne({ name: personName }, (err, data) => {
    if (err) return console.log(err);
    console.log("searshbyName", data)
  });
};
findPeopleByName("Elon")

// Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food) => {
  User.findOne({ favFoods: food }, (err, data) => {
    if (err) return console.log(err);
    console.log("searchbyfood", data)
  });
};
findOneByFood(["Berger"])

//Use model.findById() to Search Your Database By _id
const findPersonById = (personId) => {
  User.findById({_id : personId}, (err, data) =>
    err ? console.log(err) : console.log("searchbyid", data)

  );
};
findPersonById('610706cfc7ca8b0ee416d174')

//Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId,foodToAdd) => {
  User.findById({_id: personId}, (err, data) => {
    if (err) return console.log(err);
    data.favFoods.push(foodToAdd);
    data.save((err, dataNext) =>
      err
        ? console.error("error saving data: ", err.message)
        : console.log("FindIdAddFood", dataNext)
    );
  });
};
//findEditThenSave('610708d9ab4a980f58f27ac6','fish')

const findAndUpdate = (personName, ageToSet) => {

  User.findOneAndUpdate(
    { name: personName },
    { $set: { age: ageToSet } },
    { new: true },
    (err, data) => (err ? console.log(err) : console.log('findbyname and UpdateAge',data))
  );
};
findAndUpdate('Mark',26)

//Delete One Document Using model.findByIdAndRemove
const removeById = (personId) => {
  User.findByIdAndRemove({_id: personId}, (err, data) =>
    err ? console.log(err) : console.log('Delete One Document Using model.findByIdAndRemove',data)
  );
};
//removeById('61070d0b4d67cd10322fc9e0')

//MongoDB and Mongoose - Delete Many Documents with model.remove()
const removeManyPeople = (nameToDelete) => {
  User.remove({ name: nameToDelete }, (err, data) =>
    err ? console.log(err) : console.log('MongoDB and Mongoose - Delete Many Documents with model.remove',data)
  );
};
//removeManyPeople('Jhon')

//Chain Search Query Helpers to Narrow Search Results
const queryChain = (foodToSearch) => {
  User.find({ favFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, dataNext) =>
      err
        ? console.error("error getting data: ", err.message)
        : console.log("Chain Search Query Helpers to Narrow Search Results",dataNext)
    );
};
queryChain('Panckake')

app.listen(PORT,(error)=>{
  error? console.error(error):
  console.log(`server is running on port ${PORT}`)
})
