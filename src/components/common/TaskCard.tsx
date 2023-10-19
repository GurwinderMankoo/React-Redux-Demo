import React from "react";
import { completeTodo, Todo } from "../../store/todoSlice";

import Edit from "../../images/EditIcon";
import DeleteIcon from "../../images/DeleteIcon";

import Style from "./TaskCard.module.css";
import { useAppDispatch } from "../../hooks/reduxUtils";

type props = {
  task: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
};

const TaskCard = ({ task, onEdit, onDelete }: props) => {
  const dispatch = useAppDispatch();

  const completeHandler = (id: number) => {
    dispatch(completeTodo(id));
  };

  return (
    <div className={`${Style.card}`}>
      <div className={Style.titleSection}>
        <input
          type="checkbox"
          className={Style.checkInput}
          onChange={() => task.id && completeHandler(task.id)}
          checked={task.completed}
        />
        <h3 className={task.completed ? Style.strike : ""}>{task.title}</h3>
      </div>
      <div className={Style.actions}>
        <button onClick={() => onEdit(task)}>
          <Edit />
        </button>
        <button onClick={() => task.id && onDelete(task.id)}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
