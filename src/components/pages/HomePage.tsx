import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxUtils";
import TaskCard from "../common/TaskCard";
import Modal from "../common/Modal";
import { close, modalStateSelector, open } from "../../store/modalSlice";
import Pagination from "../common/Pagination";

import Style from "./Home.module.css";
import { pageHandler, gotPrevPage, Todo } from "../../store/todoSlice";
import { deleteTodo, fetchAllTodos } from "../apis/todos";
import { useSelector } from "react-redux";
import { editModalSelector } from "../../store/editModal";
import EditModal from "../task/EditModal";
import { openEditModal } from "../../store/editModal";

type DeleteModalState = {
  isOpen: boolean;
  id: null | number;
};

const Home = () => {
  const { allTodos, todos, page, totalPage, loading } = useAppSelector(
    (state) => state.todos
  );
  const isOpen = useAppSelector(modalStateSelector);
  const dispatch = useAppDispatch();
  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    isOpen: false,
    id: null
  });
  const { isOpen: editModalOpen, selected } = useSelector(editModalSelector);

  const onOpen = () => {
    dispatch(
      openEditModal({
        title: "",
        userId: 1,
        completed: false
      })
    );
  };

  const onClose = () => {
    dispatch(close());
  };

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, []);

  const nexPageHandler = () => {
    dispatch(pageHandler("next"));
  };

  const prevPageHandler = () => {
    dispatch(pageHandler("prev"));
  };

  const deleteHandler = (id: number) => {
    setDeleteModal({
      isOpen: true,
      id
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      id: null
    });
  };

  const deleteIt = async () => {
    try {
      if (deleteModal.id) {
        const res = await dispatch(deleteTodo(deleteModal.id)).unwrap();
        closeDeleteModal();
      }
    } catch (error) {}
  };

  const editHandler = (todo: Todo) => {
    dispatch(openEditModal(todo));
  };

  if (loading === "pending" && allTodos.length === 0) {
    return (
      <div className={Style.home}>
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <>
      <div className={Style.home}>
        <div className={Style.titleContainer}>
          <h3 className={Style.title}>All Tasks</h3>
          <button className={`btn`} onClick={onOpen}>
            Create Task
          </button>
        </div>
        {todos.map((todo) => (
          <TaskCard
            task={todo}
            key={todo.id}
            onDelete={deleteHandler}
            onEdit={editHandler}
          />
        ))}
      </div>
      {totalPage > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPage}
          next={nexPageHandler}
          prev={prevPageHandler}
        />
      )}
      <EditModal />
      <Modal
        isOpen={deleteModal.isOpen}
        title="Delete Task"
        onClose={closeDeleteModal}
        actions={[
          {
            label: "Close",
            onClick: closeDeleteModal,
            style: "danger",
            disabled: loading === "pending"
          },
          {
            label: "Delete",
            onClick: deleteIt,
            style: "primary",
            loading: loading === "pending"
          }
        ]}
      >
        <p>Are you sure to delete the current task</p>
      </Modal>
    </>
  );
};

export default Home;
