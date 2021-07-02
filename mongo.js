const mongoose = require("mongoose");

if (process.argv.length < 3 || process.argv.length === 4 || process.argv.length > 5) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password> to see all entries. To add new entries you should add <name> and <number>."
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://BrianEAC:${password}@cluster0.aj0vp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

if (process.argv.length === 5) {
  person.save().then((result) => {
    console.log(`added ${person.name} number: ${person.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    })
    mongoose.connection.close();
  })
}
