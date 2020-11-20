const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

morgan.token('post_data', (req, res) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    } else return null
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post_data'))
app.use(cors())

let persons = [
    { 
        "name": "Arto Hellas", 
        "nr": "040-123456",
        "id": 1
    },
    { 
        "name": "Ada Lovelace", 
        "nr": "39-44-5323523",
        "id": 2
    },
    { 
        "name": "Dan Abramov", 
        "nr": "12-43-234345",
        "id": 3
    },
    { 
        "name": "Mary Poppendieck", 
        "nr": "39-23-6423122",
        "id": 4
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
    res.send(
        '<p>Phonebook has info for ' + 4 + ' people </p> <p>' + date + '</p>'
    )
})

app.get('/persons', (req, res) => {
    res.json(persons)
})

app.get('/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.status(204).end();
})

app.post('/persons', (req, res) => {
    const person = req.body
    
    if (!person.name || !person.nr) {
        return res.status(400).json({
            error: 'content missing'
        })
    } else if (persons.map(p => p.name).includes(person.name)) {
        return res.status(400).json({
            error: `${person.name} is already in the phonebook`
        })
    }
    
    const coef = persons.length
    const generateId = () => {
        return Math.floor(Math.random() * coef * 100 + coef)
    }

    person.id = generateId()
    persons = persons.concat(person)

    res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})