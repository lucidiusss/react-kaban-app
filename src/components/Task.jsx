import { motion } from "framer-motion";
import { DropIndicator } from "./DropIndicator";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";

export const Task = ({ title, id, column, handleDragStart, setTasks }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [editing, setEditing] = useState(false);

  const targetRef = useRef(null);

  useClickAway(targetRef, () => {
    if (editing) {
      setTasks((pv) =>
        pv.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
      );
      setEditing(false);
    }
  });

  const taskClickHandler = () => {
    setEditing(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setTasks((pv) =>
        pv.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
      );
      setEditing(false);
    }
  };

  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        ref={targetRef}
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="p-3 bg-neutral-800 border border-neutral-700  rounded-md hover:bg-neutral-700 transition-colors cursor-grab active:cursor-grabbing"
      >
        {editing ? (
          <>
            <input
              onKeyDown={(e) => handleKeyPress(e)}
              autoFocus
              className="w-full h-1 line-clamp-3  rounded border border-neutral-400 placeholder-neutral-300 bg-neutral-400/20 p-3 text-sm text-neutral-50  focus:outline-0"
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </>
        ) : (
          <p
            onDoubleClick={(e) => taskClickHandler(e)}
            className="line-clamp-3"
          >
            {title}
          </p>
        )}
      </motion.div>
    </>
  );
};
