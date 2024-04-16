const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const Person = require('./models/person');

const app = express();


dotenv.config();
const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error.message);
    });

morgan.token('body', (req) => JSON.stringify(req.body));

const errorHandler = (error, req, res, next) => {
    console.log(error.name, error.name === 'ValidationError');

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        console.log('====');
        return res.status(400).json({ error: error.message });
    }

    next(error);
};

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.static('dist'));
app.use(express.json());
app.use(cors());

app.get('/api/persons', async (req, res) => {
    const persons = await Person.find({});
    res.json(persons);
});

app.post('/api/persons', async (req, res, next) => {
    const { name, number } = req.body;

    if (!name || !number) {
        return res.status(400).json({ error: 'name or number missing' });
    }

    const person = new Person({ name, number });

    try {
        const savedPerson = await person.save();
        res.json(savedPerson);
    } catch (error) {
        next(error);
    }
});

app.get('/info', async (req, res) => {
    const date = new Date();
    const count = await Person.countDocuments();
    res.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`);
});

app.get('/api/persons/:id', async (req, res, next) => {
    try {
        const person = await Person.findById(req.params.id);
        if (person) {
            res.json(person.toJSON());
        } else {
            res.status(404).end();
        }
    } catch (error) {
        next(error);
    }
});

app.delete('/api/persons/:id', async (req, res, next) => {
    try {
        await Person.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

app.put('/api/persons/:id', async (req, res, next) => {
    const { name, number } = req.body;
    const person = { name, number };

    try {
        const updatedPerson = await Person.findByIdAndUpdate(req.params.id, person, { new: true });
        res.json(updatedPerson);
    } catch (error) {
        next(error);
    }
});

app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
