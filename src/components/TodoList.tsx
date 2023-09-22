import React from "react";
import { Todo } from "../model";
import TodoItem from "./TodoItem";

interface Props {
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({ todos, setTodos }: Props) => {
	return (
		<div className="flex justify-evenly w-[90%] flex-wrap">
			{todos.map((todo) => (
				<TodoItem todo={todo} key={todo.id} todos={todos} setTodos={setTodos} />
			))}
		</div>
	);
};

export default TodoList;
