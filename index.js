const express = require("express");
const bodyParser = require('body-parser');
const app = express();


const port = 8080;

let tasks = [
    {
        id: 1,
        text: 'Wake up'
    },
    {
        id: 2,
        text: 'Go to work'
    },
    {
        id: 3,
        text: 'Save the world'
    },
    {
        id: 4,
        text: 'Back home'
    },
    {
        id: 5,
        text: 'Go to sleep'
    },
];

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello bratuha!');
});


app.get('/tasks', (req, res) => {
    return res.status(200).json(tasks);
});

app.post('/tasks', (req, res) => {
    const newTask = req.body;

    tasks.push(newTask);

    return res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const updatedTask = req.body;
    const taskId = parseInt(req.params.id);


    const foundTask = tasks.find(task => task.id === taskId);

    if (!foundTask) {
        return res.status(404).json({ message: 'Task not found'});
    }

    foundTask.text = updatedTask.text;

    return res.status(200).json(foundTask);
});

app.delete('/tasks/:id', (req, res) => {
    const tasksId = parseInt(req.params.id);

    tasks = tasks.filter(t => t.id !== tasksId);

    return res.status(204).json(tasks);
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});