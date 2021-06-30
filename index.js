const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
app.use(express.static('build'))
const app = express()


morgan.token('body', function (req){
    body = JSON.stringify(req.body)
    return body
})

app.use(express.json())
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'))
app.use(cors())


date = new Date()

const generateId = (a, b) => {
    a = Math.ceil(a)
    b = Math.floor(b)
    return Math.floor(Math.random() * (b - a) + a)

}

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${persons.length} persons</p>
        <p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
}
)

app.post('/api/persons/', (request, response) => {
const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(5, 15000),
    }

    persons = persons.concat(person)
    response.json(person)
})







app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('server in port 3001')
})