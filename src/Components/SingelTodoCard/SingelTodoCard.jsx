import { BsCheckSquare, BsTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import {
  toggelTodoDone,
  deleteTodo,
  setToggelFormeInpute
} from "../../redux/Slices/Todo/todoSlice";

export default function SingelTodoCard({id,name}) {
  const Dispatch = useDispatch();

  const todos = useSelector((state) => state.todos.todos);
  function makeTodoDone(id) {
    Dispatch(toggelTodoDone(id));
  }
  const todo = todos.find((todo) => {
    return todo.id === id;
  });
  function removeTodo(id) {
    Dispatch(deleteTodo(id));
  }
  function toggelInputeForm(opj) {
    Dispatch(setToggelFormeInpute(opj));
  }

  return (
    <>
      <div className="flex justify-between  bg-zinc-200  p-3 rounded shadow hover:bg-zinc-300">
        <h3
          className={`${
            todo.done ? "line-through font-semibold " : "font-semibold"
          }`}
        >
          {name}
        </h3>
        <ul className=" flex justify-between items-center gap-3 ">
          <li>
            <BsCheckSquare
              onClick={() => {
                makeTodoDone(id);
              }}
              className={`${
                todo.done
                  ? "cursor-pointer text-green-500  hover:text-gray-700"
                  : "cursor-pointer text-gray-500  hover:text-green-700 "
              }`}
              size={20}
            />
          </li>
          <li>
            <FaEdit
              onClick={() => {
                toggelInputeForm({id:id,name:name,done:false});
              }}
              className="cursor-pointer text-yellow-500 hover:text-yellow-700 "
              size={20}
            />
          </li>
          <li>
            <BsTrashFill
              onClick={() => {
                removeTodo(id);
              }}
              className="cursor-pointer text-red-500  hover:text-red-700 "
              size={20}
            />
          </li>
        </ul>
      </div>
    </>
  );
}
