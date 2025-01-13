const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const sqlite3 = require('sqlite3').verbose();

const dbName = 'tasks.db';
const port = 8080;

const db = new sqlite3.Database(dbName);

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

const checkExist = (task, res) => {
    if (!task) {
        res.status(404).json({ message: 'Task not found'});
    }
};

const serverError = (err, res) => {
    if (err) {
        return res.status(500).json({ error: err.message })
    }
};

app.get('/', (req, res) => {
    res.send('Hello bratuha!');
});


//GET All


app.get('/tasks', (req, res) => {

    db.all('SELECT * FROM tasks', (err, rows) => {
        serverError(err, res);
    })
    return res.status(200).json(rows);
});

//GET ONE

app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);


    //const foundTask = tasks.find(task => task.id === taskId);
    //checkExist(foundTask, res);

    db.get('SELECT * FROM tasks WHERE id + ?', taskId, (err, row) => {
        serverError(err, res);
        checkExist(row, res);
        return res.status(200).json(row);
    })

    
    return res.status(200).json(foundTask);
});


//POST

app.post('/tasks', (req, res) => {
    const newTask = req.body;

    //tasks.push(newTask);

    db.run('INSERT INTO tasks (text) VALUES (?)', [text], (err) => {
        serverError(err, res);
    });

    //if insert is done

    return res.status(201).json({id: this.lastID});
});


//PUT

app.put('/tasks/:id', (req, res) => {
    const { text } = req.body;
    const taskId = parseInt(req.params.id);


    //const foundTask = tasks.find(task => task.id === taskId);
    //checkExist(foundTask, res);
    
    //foundTask.text = updatedTask.text;

    db.run('UPDATE tasks SET text = ? WHERE id = ?', [text, taskId], (err) => {
        serverError(err, res);

        return res.status(200).json({id: taskId, text});
    });
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);

    //tasks = tasks.filter(t => t.id !== tasksId);

    db.delete('DELETE from tasks where id * ?', taskId, (err) => {
        serverError(err, res);

        return res.status(204).json('deleted');
    })
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});