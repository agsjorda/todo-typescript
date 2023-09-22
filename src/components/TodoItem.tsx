import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "../App";

interface Props {
	todo: Todo;
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoItem = ({ todo, todos, setTodos }: Props) => {
	// state for editing todo
	const [edit, setEdit] = useState<boolean>(false);
	const [editTodo, setEditTodo] = useState<string>(todo.todo);

	const handleDone = (id: number) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
			)
		);
	};

	const handleDelete = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const handleEdit = (e: React.FormEvent, id: number) => {
		e.preventDefault();
		setTodos(
			todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
		);
		setEdit(false);
	};

	const inputRef = useRef<HTMLInputElement>(null);

	//triggers focus when edit state changes
	useEffect(() => {
		inputRef.current?.focus();
	}, [edit]);

	return (
		<form
			className="flex bg-slate-200 w-[90%] md:w-[30%] rounded-[5px] p-5 mt-4"
			onSubmit={(e) => handleEdit(e, todo.id)}
		>
			{edit ? (
				<input
					ref={inputRef}
					className="flex flex-1 p-1 outline-none text-base focus:outline-none"
					value={editTodo}
					onChange={(e) => setEditTodo(e.target.value)}
				/>
			) : todo.isDone ? (
				<s className="flex flex-1 p-1 outline-none text-base focus:outline-none">
					{todo.todo}
				</s>
			) : (
				<span className="flex flex-1 p-1 outline-none text-base focus:outline-none">
					{todo.todo}
				</span>
			)}

			<div className="flex">
				<span
					className="icon"
					onClick={() => {
						if (!edit && !todo.isDone) {
							setEdit(!edit);
						}
					}}
				>
					<AiFillEdit />
				</span>
				<span className="icon" onClick={() => handleDelete(todo.id)}>
					<AiFillDelete />
				</span>
				<span className="icon" onClick={() => handleDone(todo.id)}>
					<MdDone />
				</span>
			</div>
		</form>
	);
};

export default TodoItem;
