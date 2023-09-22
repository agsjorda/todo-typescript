import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "../App";
import { Draggable } from "react-beautiful-dnd";

type Props = {
	index: number;
	todo: Todo;
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoItem = ({ index, todo, todos, setTodos }: Props) => {
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
		<Draggable draggableId={todo.id.toString()} index={index}>
			{(provided, snapshot) => (
				<form
					className={`${
						snapshot.isDragging ? "drag" : ""
					}flex bg-slate-200  rounded-[5px] p-5 mt-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-pressedButton`}
					onSubmit={(e) => handleEdit(e, todo.id)}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
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
			)}
		</Draggable>
	);
};

export default TodoItem;
