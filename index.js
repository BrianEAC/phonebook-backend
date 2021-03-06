require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./modules/person')

morgan.token('body', function (req) {
	let body = JSON.stringify(req.body)
	return body
})

app.use(express.json())
app.use(
	morgan(
		':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'
	)
)
app.use(cors())
app.use(express.static('build'))



app.get('/api/persons', (request, response, next) => {
	Person.find({})
		.then((person) => {
			response.json(person)
		})
		.catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then((person) => {
			if (person) {
				response.json(person)
			} else {
				response.status(404).end()
			}
		})
		.catch((error) => next(error))
})

app.post('/api/persons/', (request, response, next) => {
	const body = request.body

	if (!body.name || !body.number) {
		return response.status(400).json({
			error: 'content missing',
		})
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	})

	person
		.save()
		.then((savedPerson) => {
			response.json(savedPerson)
		})
		.catch((error) => {
			next(error)
			response.status(500).end()
		})
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then((response) => {
			response.status(204).end()
		})
		.catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response) => {
	const body = request.body

	const person = {
		name: body.name,
		number: body.number,
	}

	Person.findByIdAndUpdate(request.params.id, person, { new: true }).then(
		(updatedPerson) => {
			response.json(updatedPerson)
		}
	)
})

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

	next(error) 
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log('server in port 3001')
}) 
