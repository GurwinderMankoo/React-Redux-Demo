import React from "react";
import { createPortal } from "react-dom";
import CloseButton from "../../images/CloseButton";

import Style from "./Modal.module.css";

type Action = {
  label: string;
  onClick: () => void;
  style: "primary" | "danger";
  loading?: boolean;
  disabled?: boolean;
};

type Props = {
  title: string;
  onClose?: () => void;
  onOpen?: () => void;
  isOpen: boolean;
  children: React.ReactNode;
  actions?: Action[];
};

const Modal = ({
  title,
  onClose,
  onOpen,
  isOpen,
  children,
  actions = []
}: Props) => {
  const ModalComponent = (
    <>
      <div
        className={`${Style.backDrop} ${isOpen ? Style.open : Style.close}`}
      ></div>
      <div className={`${Style.modal} ${isOpen ? Style.open : Style.close}`}>
        <div className={Style.header}>
          <h3>{title}</h3>
          <button className={Style.closeBtn} onClick={onClose}>
            <CloseButton />
          </button>
        </div>
        <div className={Style.modalBody}>{children}</div>
        {actions.length > 0 && (
          <div className={Style.actions}>
            {actions.map((act, i) => (
              <button
                className={`${act.style ? Style[act.style] : ""} ${
                  act.loading ? Style.loading : ""
                }`}
                disabled={act.disabled}
                key={i}
                onClick={act.disabled || act.loading ? () => "" : act.onClick}
              >
                {act.loading ? "Wait..." : act.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );

  return createPortal(ModalComponent, document.body);
};

export default Modal;
