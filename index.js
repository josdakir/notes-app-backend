const express = require('express')
const app = express()
const logger = require('logger')
const cors = require('cors')


app.use(cors())
app.use(express.json())
app.use(logger)


let notes = [
  {
    id: 1,
    content: 'Valor 1',
    important: true,
    date: '2022-10-12T18:39:34.0912',
  },
  {
    id: 2,
    content: 'Valor 2', 
    important: false,
    date: '2022-10-12T18:39:34.0912',
  },
  {
    id: 3,
    content: 'Valor 3',
    important: true,
    date: '2022-10-12T18:39:34.0912',
  },
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find((note) => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.post('/api/notes', (request, response) => {
  const note = request.body
  console.log(note)

  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note.content is missing',
    })
  }

  const ids = notes.map((note) => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString(),
  }

  notes = [...notes, newNote]

  response.status(201).json(newNote)
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter((note) => note.id !== id)

  response.status(204).end()
})

const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
