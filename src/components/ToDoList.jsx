import { useEffect, useState } from "react";

const ToDoList = () => {
  const [todo, setTodo] = useState([
    {
      done: true,
      text: "Taste JavaScript",
    },
    {
      text: "Code furiously",
      done: true,
    },
    {
      text: "Promote Mavo",
      done: false,
    },
    {
      text: "Give talks",
      done: false,
    },
    {
      text: "Write tutorials",
      done: true,
    },
    {
      text: "Have a life!",
      done: false,
    },
  ]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [newTodo, setNewTodo] = useState({ text: "", done: false });

  const handleChange = (event) => {
    // console.log(event.target.value);
    setNewTodo({ ...newTodo, text: event.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setNewTodo({ ...newTodo, text: "" });
    setTodo([...todo, newTodo]);
  };

  const checkItem = (index) => {
    var arr = todo;
    arr[index].done = !arr[index].done;
    setTodo([...arr]);
  };

  const removeItem = (index) => {
    todo.splice(index, 1);
    setTodo([...todo]);
  };

  const clearCompleted = () => {
    const cleared = todo.filter((el) => {
      return el.done === false;
    });
    setTodo(cleared);
  };

  const checkAll = () => {
    const arr = todo.some((el) => el.done === false)
      ? todo.filter((el) => {
          if (!el.done) {
            el.done = true;
            return el;
          }
          return el;
        })
      : todo.filter((el) => {
          el.done = !el.done;
          return el;
        });
    setTodo(arr);
  };

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={onSubmitHandler}>
            <input
              onChange={handleChange}
              property="newTodo"
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              value={newTodo.text}
            />
          </form>
        </header>

        <section className="main" hidden={todo.length === 0}>
          <input
            property="toggleAll"
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            checked={
              todo.filter((element) => {
                return element.done === false;
              }).length === 0
            }
          />
          <label onClick={() => checkAll()} htmlFor="toggle-all">
            Mark all as complete
          </label>

          <ul className="todo-list">
            {todo.map((item, index) => {
              return (
                <li
                  key={index}
                  className={item.done ? "completed" : ""}
                  hidden={
                    (item.done && activeFilter === "active") ||
                    (!item.done && activeFilter === "completed")
                  }
                >
                  <div className="view">
                    <input
                      onClick={() => checkItem(index)}
                      checked={item.done}
                      property="done"
                      className="toggle"
                      type="checkbox"
                    />
                    <label property="text">{item.text}</label>

                    <button
                      onClick={() => removeItem(index)}
                      className="destroy"
                    ></button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <footer className="footer" hidden={todo.length === 0}>
          <meta
            property="todoDone"
            content={
              todo.filter((element) => {
                return element.done === true;
              }).length
            }
          />
          <meta
            property="todoLeft"
            content={
              todo.filter((element) => {
                return element.done === false;
              }).length
            }
          />

          <span className="todo-count">
            <strong mv-value="todoLeft">
              {
                todo.filter((element) => {
                  return element.done === false;
                }).length
              }
            </strong>
          </span>

          <meta property="activeFilter" content="all" />
          <ul className="filters">
            <li>
              <a
                onClick={() => setActiveFilter("all")}
                className={activeFilter === "all" ? "selected" : ""}
              >
                All
              </a>
            </li>
            <li>
              <a
                onClick={() => setActiveFilter("active")}
                className={activeFilter === "active" ? "selected" : ""}
              >
                Active
              </a>
            </li>
            <li>
              <a
                onClick={() => setActiveFilter("completed")}
                className={activeFilter === "completed" ? "selected" : ""}
              >
                Completed
              </a>
            </li>
          </ul>

          <button
            onClick={() => clearCompleted()}
            hidden={!todo.some((item) => item.done === true)}
            className="clear-completed"
          >
            Clear completed
          </button>
        </footer>
      </section>
      <footer className="info">
        <p>Click to edit a todo</p>
        <p>
          Created by <a href="https://oguzhansimsek.dev/">Oğuzhan Şimşek</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </>
  );
};

export default ToDoList;
