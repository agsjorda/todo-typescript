import React, { useState } from "react";

import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
	const [todo, setTodo] = useState<string>("");
	const [todos, setTodos] = useState<Todo[]>([]);

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();

		if (todo) {
			setTodos((prevTodos) => [
				...prevTodos,
				{ id: Date.now(), todo, isDone: false },
			]);
			setTodo("");
		}
	};

	console.log(todo);

	return (
		<div className="App bg-indigo-600">
			<h1 className="uppercase text-4xl my-8 text-white z-10 text-center md:my-4 mx-0 md:text-[42px]">
				Taskify
			</h1>
			<InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
			<TodoList todos={todos} setTodos={setTodos} />
		</div>
	);
};

export default App;
