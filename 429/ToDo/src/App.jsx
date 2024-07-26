import { useRef, useState } from "react";

export default function App() {
  const taskInput = useRef();
  const [tasks, setTasks] = useState(
    localStorage.getItem("tasks")
      ? Array.isArray(JSON.parse(localStorage.getItem("tasks")))
        ? JSON.parse(localStorage.getItem("tasks"))
        : []
      : []
  );

  const saveIntoStorage = (arr) => {
    localStorage.setItem("tasks", JSON.stringify(arr));
  };

  const deletTask = (index) => {
    let oTasks = [...tasks];
    oTasks.splice(index, 1);
    setTasks(oTasks);
    saveIntoStorage(oTasks);
  };

  const handleSubmit = () => {
    event.preventDefault();
    let nTask = taskInput.current.value;
    let taskObj = {
      id: tasks.length + 1,
      name: nTask,
      isDone: false,
    };
    let oTasks = [...tasks];
    oTasks.push(taskObj);
    setTasks(oTasks);
    console.log(oTasks);
    saveIntoStorage(oTasks);
  };

  const changeStatus = (taskIndex) => {
    let OTasks = [...tasks];
    OTasks[taskIndex].isDone = !OTasks[taskIndex].isDone;
    setTasks(OTasks);
    saveIntoStorage(OTasks);
  };
  return (
    <div className="App col-12">
      <form className="col-12" onSubmit={handleSubmit}>
        <input ref={taskInput} placeholder="Enter New Task Name" />
      </form>
      <table className="table table-bordred">
        <thead>
          <tr>
            <th>-</th>
            <th>task Name</th>
            <th>task Status</th>
            <th>task Del</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((el, index) => {
            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <th>{el.name}</th>
                <th>
                  <input
                    type="checkbox"
                    checked={el.isDone}
                    onChange={() => {
                      changeStatus(index);
                    }}
                  />
                </th>
                <th>
                  <button
                    onClick={() => deletTask(index)}
                    className="btn btn-danger"
                  >
                    Del Task
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
