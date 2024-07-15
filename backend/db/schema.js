const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/todo").then(console.log("connected"));
const todoSchema = mongoose.Schema({
    title: 'string',
    description: 'string',
    complete: Boolean
})
const todo = mongoose.model('todo', todoSchema);

const addtodo = ({ title, description, complete }) => {
    console.log("awaiting to add")
    todo.create({ title, description, complete }).then((res) => {
        console.log(res);
    })
    console.log("added")
}
// addtodo({
//     title: "sleep",
//     description: "sleep",
//     complete: true
// });

const todosList = async () => {
    // awautodo.find();
    try {
        const todos = await todo.find();
        console.log(todos);
        return todos;
    } catch (e) {
        console.error(e)
    }
};
//updatetodo():
const updatetodo = async ({ title, description, complete }) => {
    // try {
    const update = await todo.updateOne({ title }, { $set: { title, description, complete: complete ? true : false } })
    // todo.update()
    console.log(update);
    // } catch (e) {
    //     console.log('not updated')
    //     console.log(e)
    // }
}
// updatetodo({

//     title: "nikki",
//     description: "TereNaam"
// })
const deleteOne = async (_id) => {
    try {

        const res = await todo.findByIdAndDelete({ _id });
        console.log(res);
        // return res;
    } catch (e) {
        console.log(e)
        console.log('okaynot')
        return new Error({ error: e });
        // return e;
    }
}
// deleteOne('66942269252121ec446ff71d')
module.exports = {
    addtodo,
    todosList,
    updatetodo,
    deleteOne,
};