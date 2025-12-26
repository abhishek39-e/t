const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
const Note = require('./models/Note')

app.use(cors())
app.use(express.json())

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected ✅'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Server + DB connected 🚀')
})

// Add note
app.post('/api/notes', async (req, res) => {
    try {
        const note = await Note.create(req.body)
        res.status(201).json(note)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Get notes
app.get('/api/notes', async (req, res) => {
    const notes = await Note.find()
    res.json(notes)
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
