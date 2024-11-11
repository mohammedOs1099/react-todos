import { useDispatch, useSelector } from "react-redux";
import AddTodoForm from "../AddTodoForm/AddTodoForm";
import SingelTodoCard from "../singelTodoCard/singelTodoCard";
import UpdateTodoForm from "./../UpdateTodoForm/UpdateTodoForm";
import image from "./../../assets/employees-shortage.jpg";
import { clearTodos } from "../../redux/Slices/Todo/todoSlice";
export default function Card(props) {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  function display(array) {
    return array.map((todo) => {
      return (
        <li key={todo.id} className=" mb-2 ">
          <SingelTodoCard id={todo.id} name={todo.name} />
        </li>
      );
    });
  }
  const toggelFormeInpute = useSelector((state) => state.todos.toggelFormInput);

  return (
    <>
      <div className=" h-100  w-full md:w-3/4 shadow-2xl rounded-xl  p-2 my-2  flex flex-col items-center justify-between bg-amber-100   ">
        <div className=" flex flex-col items-center justify-center w-full  gap-2   ">
          <h1 className="underline text-3xl font-semibold mb-2 ">
            My Todo List
          </h1>
          <div className="w-full">
            {toggelFormeInpute ? <AddTodoForm /> : <UpdateTodoForm />}
          </div>

          <div className=" w-full flex flex-col justify-center items-center my-4">
            <div className=" mb-2 mx-auto w-[80%] ">
              <input
                type="search"
                placeholder="search"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-zinc-200"
              />
            </div>
            <ul className="w-full p-2 overflow-y-auto mx-auto">
              {todos.length > 0 ? (
                display(todos)
              ) : (
                <div className="flex flex-col justify-center items-center gap-3 my-1">
                  <img
                    src={image}
                    alt="image "
                    className="md:w-[40%] rounded-md mx-auto"
                  />
                  <p className=" text-red-400 font-semibold underline   ">
                    no to do yet !!
                  </p>
                </div>
              )}
            </ul>
          </div>
          <button
            onClick={() => {
              dispatch(clearTodos());
            }}
            className="bg-red-500 hover:bg-red-700 text-white rounded  mb-2  py-2 px-10 focus:outline-none focus:shadow-outline "
          >
            Clear All
          </button>
        </div>
      </div>
    </>
  );
}
