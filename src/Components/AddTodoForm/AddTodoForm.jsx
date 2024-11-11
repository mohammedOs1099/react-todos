import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux/Slices/Todo/todoSlice";
import { nanoid } from "@reduxjs/toolkit";


export default function AddTodoForm() {
  
 const regex = /^(?!.*\s{2})(?!^\s)(?!.*\s$)[a-zA-Z0-9\s]{1,15}$/;
  const [value, setValue] = useState("");
  const dispatch =useDispatch()
  const handelSubmit = (e) => {
    e.preventDefault()
if (!regex.test(value)) {
  alert(
    "Please enter a valid todo (1-15 characters, no spaces at start or end, and no double spaces)."
  );

  return;
}

dispatch(addTodo({ id: nanoid(), name: value,done:false }));
setValue("");
  };
 
  return (
    <>
      <form onSubmit={handelSubmit} className="flex space-x-3 mb-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="add todo"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-zinc-200"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
        >
          add
        </button>
      </form>
    </>
  );
}
