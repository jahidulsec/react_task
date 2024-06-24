import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { FaArrowUp } from "react-icons/fa6";


const TableCell = ({ item: { id, title, photo, username, like } }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="grid-container font-thin justify-center items-center border hover:bg-bg-secondary border-border hover:border-border-hover rounded-xl py-5 px-4 transition-colors duration-500"
    >
      <div className="text-[17px]">{id}</div>
      <div className="relative flex items-center gap-5">
        <img
          src={photo}
          alt="image"
          width={118}
          height={64}
          className="w-[118px] h-[64px] object-cover object-top rounded-md"
        />
        <span className="text-xl font-thin max-w-[364px]">{title}</span>
      </div>
      <div className="avatar flex gap-2 items-center">
        <img
          src={"/image.png"}
          alt="avatar"
          className="w-[24px] aspect-square rounded-full"
        />
        <p className=" text-secondary">{username}</p>
      </div>
      <div className="flex items-center gap-2 justify-end">
        <span>{like}</span>
        <FaArrowUp className=" text-primary" />
      </div>
    </div>
  );
};

export default TableCell;
