import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoupdate } from "../../redux/Slices/Todo/todoSlice";

export default function UpdateTodoForm() {
  const updateTodo = useSelector((state) => state.todos.updateTodo);
  const regex = /^(?!.*\s{2})(?!^\s)(?!.*\s$)[a-zA-Z0-9\s]{1,15}$/;
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(updateTodo);
  useEffect(() => {
    setUpdate(updateTodo);
  }, [updateTodo]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!regex.test(update?.name)) {
      alert(
        "Please enter a valid todo (1-15 characters, no spaces at start or end, and no double spaces)."
      );
      return;
    }
    dispatch(todoupdate(update));
    setUpdate({ ...update, name: "" });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex space-x-3 mb-2">
        <input
          value={update?.name || ""}
          onChange={(e) => {
            setUpdate({ ...update, name: e.target.value });
          }}
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-zinc-200"
          placeholder="Update todo"
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-7 rounded focus:outline-none focus:shadow-outline"
        >
          Update
        </button>
      </form>
    </>
  );
}
