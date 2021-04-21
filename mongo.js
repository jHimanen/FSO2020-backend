const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Joel_FSO:${password}@cluster0.qui1i.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  nr: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3], 
    nr: process.argv[4],
  })
  person.save().then(response => {
    console.log(`added ${person.name} number ${person.nr} to phonebook`)
    mongoose.connection.close()
  })
} else if (process.argv.length === 3) {
  console.log("phonebook:")
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.nr}`)
    })
    mongoose.connection.close()
  })
} else {
  console.log("Number of arguments invalid.")
  process.exit(1)
}

/*
Person.find({}).then(result => {
  result.forEach(person => {
    console.log(person)
  })
  mongoose.connection.close()
})
*/