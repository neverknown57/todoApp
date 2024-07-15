const express = require('express');
const cors = require('cors');
const { addtodo, todosList, updatetodo, deleteOne } = require('./db/schema.js');
const app = express();

app.use(express.json())
app.use(cors());
//add todos
app.post('/addtodo', async (req, res) => {
    const { title, description, complete } = req.body;
    // console.log(req.body)
    // console.log(req._body)
    try {
        await addtodo({ title, description, complete })
        res.json({ m: 'added' });

    }
    catch {
        res.json(e);

    }

})
//update status
app.patch('/', async (req, res) => {
    try {
        const ack = await updatetodo(req.body);
        res.json(ack);
    } catch {

        res.status(501).send(err)
    }
})
//all todos
app.get('/', async (req, res) => {
    const list = await todosList();
    console.log(list);
    res.json(list);
})
app.delete('/:_id', async (req, res) => {
    try {

        const result = await deleteOne(req.params._id);
        console.log(req.params)
        res.json(result);
    }
    catch (e) {
        res.status(501).send(e);
    }

})
app.listen(300);