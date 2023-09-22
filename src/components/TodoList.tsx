import React from "react";
import { Todo } from "../model";
import TodoItem from "./TodoItem";
import { Droppable } from "react-beautiful-dnd";

interface Props {
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
	completedTodos: Todo[];
	setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({
	todos,
	setTodos,
	completedTodos,
	setCompletedTodos,
}: Props) => {
	return (
		<div className="container flex flex-start flex-col justify-between py-4 w-[95%] md:w-full md:flex-row">
			<Droppable droppableId="TodosList">
				{(provided, snapshot) => (
					<div
						className={`todos md:w-[47.5%] ${
							snapshot.isDraggingOver ? "dragactive" : ""
						}`}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						<span className="todos__heading">Active Tasks</span>
						{todos.map((todo, index) => (
							<TodoItem
								index={index}
								todo={todo}
								key={todo.id}
								todos={todos}
								setTodos={setTodos}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
			<Droppable droppableId="TodosRemove">
				{(provided, snapshot) => (
					<div
						className={`todos remove md:w-[47.5%] ${
							snapshot.isDraggingOver ? "dragcomplete" : ""
						}`}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						<span className="todos__heading">Completed Tasks</span>
						{completedTodos.map((todo, index) => (
							<TodoItem
								index={index}
								todo={todo}
								key={todo.id}
								todos={completedTodos}
								setTodos={setCompletedTodos}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default TodoList;
