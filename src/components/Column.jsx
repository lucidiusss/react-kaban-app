import { FiPlus } from "react-icons/fi";
import { Task } from "./Task";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DropIndicator } from "./DropIndicator";

export const Column = ({
  column,
  isTrashActive,
  setIsTrashActive,
  tasks,
  setTasks,
}) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const [isColActive, setIsColActive] = useState(false);

  let filteredTasks = tasks.filter((t) => t.column === column);

  const newTask = {
    id: Math.random().toString(),
    title: text,
    column,
  };

  const addTask = () => {
    if (text) {
      setTasks((pv) => [...pv, newTask]);
      setAdding(false);
      setText("");
    }
  };

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  const handleDragEnd = (e) => {
    const taskId = e.dataTransfer.getData("taskId");

    setIsColActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== taskId) {
      let copy = [...tasks];

      let taskToTransfer = copy.find((t) => t.id === taskId);
      if (!taskToTransfer) return;
      taskToTransfer = { ...taskToTransfer, column };

      copy = copy.filter((t) => t.id !== taskId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(taskToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, taskToTransfer);
      }

      setTasks(copy);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);

    setIsColActive(true);
  };

  const clearHighlights = (els) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setIsColActive(false);
  };

  return (
    <div className="w-56">
      <div className="relative flex items-center border-b border-b-neutral-800">
        <h1
          className={`font-bold leading-relaxed text-2xl ${
            column === "todo"
              ? "text-orange-200"
              : column === "in progress"
              ? "text-blue-200"
              : "text-emerald-200"
          }`}
        >
          {column}
        </h1>
        <motion.span
          layout
          className="absolute right-0 text-sm font-bold text-neutral-500"
        >
          {filteredTasks.length}
        </motion.span>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`h-full w-full transition-colors ${
          isColActive ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        <div className="flex mt-5 flex-col w-full">
          {filteredTasks.map((t) => (
            <Task
              handleDragStart={handleDragStart}
              setTasks={setTasks}
              key={t.id}
              {...t}
            />
          ))}
          <DropIndicator beforeId={null} column={column} />
          {!adding ? (
            <motion.button
              layout
              onClick={() => setAdding(true)}
              className="flex items-center text-neutral-800 hover:text-neutral-500"
            >
              add task
              <FiPlus />
            </motion.button>
          ) : (
            <>
              <motion.input
                layout
                onChange={(e) => setText(e.target.value)}
                autoFocus
                placeholder="add a task..."
                className="w-full min-h-12  rounded border border-fuchsia-400 placeholder-fuchsia-300 bg-fuchsia-400/20 p-3 text-sm text-neutral-50  focus:outline-0"
              />
              <motion.div layout className="flex flex-row gap-4 mt-5">
                <motion.button
                  layout
                  onClick={() => setAdding(false)}
                  className="text-neutral-600 font-light hover:text-neutral-200 transition"
                >
                  close
                </motion.button>
                <motion.button
                  layout
                  onClick={() => addTask()}
                  onKeyDown={() => addTask()}
                  className="flex flex-row items-center font-medium rounded p-1 text-neutral-800 bg-neutral-200 hover:bg-neutral-200/70 transition"
                >
                  add
                  <FiPlus />
                </motion.button>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
