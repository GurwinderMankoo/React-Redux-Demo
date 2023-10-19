import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxUtils";
import {
  closeEditModal,
  editModalSelector,
  titleHandler
} from "../../store/editModal";
import { createTodo, editTodo } from "../apis/todos";
import Modal from "../common/Modal";

import Style from "./EditModal.module.css";

const EditModal = () => {
  const { isOpen, selected } = useAppSelector(editModalSelector);
  const dispatch = useAppDispatch();
  const [isTouched, setIsTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (isOpen && inputRef?.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const onClose = () => {
    setIsTouched(false);
    dispatch(closeEditModal(""));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTouched(true);
    dispatch(titleHandler(e.target.value));
  };
  const SaveHandler = async () => {
    try {
      if (!selected?.title) {
        setIsTouched(true);
        return;
      }
      if (selected?.id) {
        const res = await dispatch(editTodo(selected)).unwrap();
      } else {
        const res = await dispatch(createTodo(selected)).unwrap();
      }
      onClose();
    } catch (error) {}
  };

  const isInvalidValue = isTouched && selected?.title.trim().length === 0;

  return (
    <Modal
      isOpen={isOpen}
      title={selected?.id ? "Edit Task" : "Create Task"}
      onClose={onClose}
      actions={[
        {
          label: "Close",
          onClick: onClose,
          style: "danger"
          // disabled: loading === "pending"
        },
        {
          label: "Save",
          onClick: SaveHandler,
          style: "primary"
          // loading: loading === "pending"
        }
      ]}
    >
      <div className={Style.editModal}>
        <input
          ref={inputRef}
          className={isInvalidValue ? Style.inputError : ""}
          value={selected?.title || ""}
          onChange={handleChange}
        />
        {isInvalidValue && (
          <span className={Style.errorMsg}>Please add your task!!</span>
        )}
      </div>
    </Modal>
  );
};

export default EditModal;
