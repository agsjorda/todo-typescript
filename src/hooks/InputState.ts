import React, { useState } from "react";

interface InputStateProps {
	initialVal: any;
}

const useInputState = ({ initialVal }: InputStateProps) => {
	const [value, setValue] = useState<string>(initialVal);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const reset = () => {
		setValue("");
	};

	return [value, handleChange, reset];
};

export default useInputState;
