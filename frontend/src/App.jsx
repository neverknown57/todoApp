import { getCombinedNodeFlags } from "typescript";
import "./App.css";
import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  // fetch("http://localhost:300").then(async (fullfill) => {
  //   // console.log(res.json());

  //   const server_todo = await fullfill.json();
  //   console.log(server_todo)
  //   // server_todo.forEach((todo) => console.log(todo[0]));
  //   setTodos(server_todo);
  // })
  return (
    <div>
      {/* React ⚛️ + Vite ⚡ + Replit */}

      <ButtonComponent todo={todos} setTodos={setTodos} />

      {todos.map((todo) => {
        return <TodoItem todo={todo.title} dsc={todo.description} />;
      })}
    </div>
  );
}
//input todo
const Input_todo = ({ title, setTitle, description, setDescription }) => {
  const titleHandler = (e) => setTitle(e.target.value);
  const descriptionHandler = (e) => setDescription(e.target.value);

  return (
    <>
      <input id="title" onChange={titleHandler} placeholder="title"></input>
      <br></br>
      <input id="description" onChange={descriptionHandler} type="text" placeholder="description"></input>
    </>
  );
};
//Add task button
const ButtonComponent = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //function AddTodo()
  const addTodo = () => {
    console.log(props);
    console.log(description);
    console.log("addTodo");
    const posttodo = async () => {
      try {

        const res = await fetch("http://localhost:300/addtodo", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: title,
            description: description
          })
        })
        console.log(res.status);
        console.log((res.json()).body);
      } catch (e) {
        throw new Error(e)
        console.error(e);
      }
    }
    posttodo();

    props.setTodos([...props.todo, { title, description }]);
  };
  return (
    <>
      <Input_todo title={title} description={description} setTitle={setTitle} setDescription={setDescription} />
      <button onClick={addTodo}>Add task </button>
    </>
  )
};

//todos
const TodoItem = (props) => {
  // console.log(props);
  return (
    <div>
      <h3>{props.todo}</h3>
      <p>{props.dsc}</p>
    </div>
  );
};
