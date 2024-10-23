import { useEffect, useState } from "react";
import { Column } from "./Column";
import { TrashCan } from "./TrashCan";

export const Container = () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [isTrashActive, setIsTrashActive] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  return (
    <div className="flex flex-row gap-20 h-screen">
      <Column
        tasks={tasks}
        setTasks={setTasks}
        isTrashActive={isTrashActive}
        setIsTrashActive={setIsTrashActive}
        column="todo"
      />
      <Column
        tasks={tasks}
        setTasks={setTasks}
        isTrashActive={isTrashActive}
        setIsTrashActive={setIsTrashActive}
        column="in progress"
      />
      <Column
        tasks={tasks}
        setTasks={setTasks}
        isTrashActive={isTrashActive}
        setIsTrashActive={setIsTrashActive}
        column="done"
      />
      <TrashCan
        setTasks={setTasks}
        isTrashActive={isTrashActive}
        setIsTrashActive={setIsTrashActive}
      />
    </div>
  );
};
