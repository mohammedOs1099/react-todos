import { useDispatch, useSelector } from "react-redux";
import AddTodoForm from "../AddTodoForm/AddTodoForm";
import SingelTodoCard from "../singelTodoCard/singelTodoCard";
import UpdateTodoForm from "./../UpdateTodoForm/UpdateTodoForm";
import image from "./../../assets/employees-shortage.jpg";
import { clearTodos, setCurrentPag } from "../../redux/Slices/Todo/todoSlice";
import { useState } from "react";
import { selectPagesTodo } from "../../redux/Slices/Todo/assets";
import ReactPaginate from "react-paginate";

export default function Card() {
  const [searchTerm, setSearchTerm] = useState("");
  const todos = useSelector(selectPagesTodo);
  const pureTodos = useSelector((state) => state?.todos?.todos);
  const itemsPerPage = useSelector((state) => state?.todos?.itemsPerPage || 7);
  const totalTodos = pureTodos?.length;
  const dispatch = useDispatch();
  let totalPages = Math.ceil(totalTodos / itemsPerPage);

  const [currentPagSearch, setCurrentPagSearch] = useState(0);
  const startIndex = currentPagSearch * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = ({ selected }) => {
    dispatch(setCurrentPag(selected));
    setCurrentPagSearch(selected);
  };

  const toggelFormeInpute = useSelector(
    (state) => state?.todos?.toggelFormInput
  );

  function search(searchTerm) {
    const resulet = pureTodos?.filter((todo) =>
      todo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (resulet) {
      totalPages = Math.ceil(resulet.length / itemsPerPage);
      return resulet;
    }
  }
  function handelChangeSearch(e) {
    setSearchTerm(e.target.value);
  }

  function displayed(arr) {
    const todosToDisplay = searchTerm
      ? search(searchTerm).slice(startIndex, endIndex)
      : arr;
    return todosToDisplay.map((todo) => (
      <li key={todo.id} className="mb-2">
        <SingelTodoCard id={todo.id} name={todo.name} />
      </li>
    ));
  }

  return (
    <>
      <div className="  w-full md:w-3/4 shadow-2xl rounded-xl  p-2 my-2  flex flex-col items-center justify-between bg-amber-100   ">
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
                value={searchTerm}
                onChange={handelChangeSearch}
                type="search"
                placeholder="search by title"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-zinc-200"
              />
            </div>
            <ul className="w-full p-2 overflow-y-auto mx-auto">
              {todos.length > 0 ? (
                displayed(todos)
              ) : (
                <div className="flex flex-col justify-center items-center gap-3 my-1">
                  <img
                    src={image}
                    alt="image "
                    className=" w-full md:w-[50%] rounded-md mx-auto"
                  />
                  <p className=" text-red-400 font-semibold underline   ">
                    no to do yet !!
                  </p>
                </div>
              )}
            </ul>
          </div>
          <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            pageCount={totalPages}
            onPageChange={handlePageChange}
            breakLabel={"..."}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            className={`${
              todos.length > 0
                ? "  pagination   text-rose-600 bg-cyan-600 rounded-md p-2 flex justify-center flex-wrap items-center gap-2 "
                : "hidden"
            }`}
            pageClassName=" h-8 w-8 rounded-full flex justify-center items-center bg-slate-50 hover:bg-indigo-400"
            previousClassName=" font-bold p-3 h-10 w-10 rounded-lg flex justify-center items-center bg-slate-50 hover:bg-indigo-400 "
            nextClassName="font-bold p-3 h-10 w-10 rounded-lg flex justify-center items-center bg-slate-50 hover:bg-indigo-400 "
            activeLinkClassName={
              " bg-indigo-400  h-8 w-8 rounded-full flex justify-center items-center "
            }
          />
          <button
            disabled={!todos.length}
            onClick={() => {
              dispatch(clearTodos());
            }}
            className={`${
              todos.length !== 0
                ? "bg-red-500 hover:bg-red-700 text-white rounded  mb-2  py-2 px-10 focus:outline-none focus:shadow-outline  "
                : "bg-red-400  text-white rounded  mb-2  py-2 px-10 focus:outline-none focus:shadow-outline "
            }`}
          >
            Clear All
          </button>
        </div>
      </div>
    </>
  );
}
