import React, { useState } from "react";

import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
	const [todo, setTodo] = useState<string>("");
	const [todos, setTodos] = useState<Todo[]>([]);
	const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

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

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result;

		if (!destination) return;

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		let add,
			active = todos,
			complete = completedTodos;

		if (source.droppableId === "TodosList") {
			add = active[source.index];
			active.splice(source.index, 1);
		} else {
			add = complete[source.index];
			complete.splice(source.index);
		}

		if (destination.droppableId === "TodosList") {
			active.splice(destination.index, 0, { ...add, isDone: false });
		} else {
			complete.splice(destination.index, 0, { ...add, isDone: true });
		}

		setCompletedTodos(complete);
		setTodos(active);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="App bg-indigo-600">
				<h1 className="uppercase text-4xl my-8 text-white z-10 text-center md:my-4 mx-0 md:text-[42px]">
					Taskify
				</h1>
				<InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
				<TodoList
					todos={todos}
					setTodos={setTodos}
					completedTodos={completedTodos}
					setCompletedTodos={setCompletedTodos}
				/>
			</div>
		</DragDropContext>
	);
};

export default App;
