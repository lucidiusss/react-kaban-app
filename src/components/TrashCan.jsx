import React from "react";
import { FaFireFlameCurved, FaRegTrashCan } from "react-icons/fa6";
import { motion } from "framer-motion";

export const TrashCan = ({ isTrashActive, setIsTrashActive, setTasks }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsTrashActive(true);
  };

  const handleDragLeave = (e) => {
    setIsTrashActive(false);
  };

  const handleDragEnd = (e) => {
    const taskId = e.dataTransfer.getData("taskId");
    console.log(taskId);

    setTasks((pv) => pv.filter((t) => taskId !== t.id));

    setIsTrashActive(false);
  };

  return (
    <motion.div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`border rounded-md  absolute ${
        isTrashActive
          ? "bg-red-700/20 border-red-500/70"
          : "bg-neutral-500/20 border-neutral-400/70"
      } top-1/2 -translate-y-1/2 right-32  w-56 h-56 flex my-auto items-center justify-center`}
    >
      {isTrashActive ? (
        <FaFireFlameCurved className="text-red-600 w-12 h-12 animate-bounce" />
      ) : (
        <FaRegTrashCan className="text-neutral-600 w-12 h-12" />
      )}
    </motion.div>
  );
};
