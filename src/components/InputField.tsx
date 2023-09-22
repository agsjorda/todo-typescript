import React, { useRef } from "react";

interface Props {
	todo: string;
	setTodo: React.Dispatch<React.SetStateAction<string>>;
	handleAdd: (e: React.FormEvent) => void;
}

const InputField = ({ todo, setTodo, handleAdd }: Props) => {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<form
			className="flex w-[90%] relative items-center"
			onSubmit={(e) => {
				handleAdd(e);
				inputRef.current?.blur();
			}}
		>
			<input
				ref={inputRef}
				className="w-full rounded-[50px] py-5 px-[30px] text-lg outline-none duration-200 shadow-innerCustom focus:shadow-outerCustom text-center"
				type="input"
				placeholder="Enter a Task"
				value={todo}
				onChange={(e) => setTodo(e.target.value)}
			/>
			<button
				className="absolute w-[50px] h-[50px] m-3 rounded-[50px] right-0 outline-none text-base text-white bg-indigo-600 transition-all duration-200 shadow-normalButton hover:bg-indigo-400 focus:scale-[.90] focus:shadow-pressedButton"
				type="submit"
			>
				Go
			</button>
		</form>
	);
};

export default InputField;
