import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useId, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { Button } from "@/components/atoms/Button/Button";
import { useModalTranslations } from "./useModalTranslations";
import type { ModalProps } from "./types";
import "./Modal.scss";

const Modal = ({
  open,
  title,
  children,
  onClose,
  size = "default",
  role = "dialog",
  ariaDescribedById,
  titleId,
  className = "",
}: ModalProps) => {
  const { closeAria } = useModalTranslations();
  const nodeRef = useRef<HTMLDivElement>(null);
  const generatedTitleId = useId();
  const dialogTitleId = titleId ?? generatedTitleId;

  useEffect(() => {
    if (!open) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      const openedModals = document.querySelectorAll('.modal-wrapper').length;
      if (openedModals <= 1) {
        document.body.style.overflow = originalStyle;
      }
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return createPortal(
    <CSSTransition
      in={open}
      timeout={300}
      classNames="modal-anim"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div className="modal-wrapper" ref={nodeRef}>
        <div
          className="modal-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />

        <div
          className={`modal-container modal-container--${size} ${className}`}
          role={role}
          aria-modal="true"
          aria-labelledby={dialogTitleId}
          aria-describedby={ariaDescribedById}
          tabIndex={-1}
        >
          <div className="modal-header">
            <h2 className="modal-header__title" id={dialogTitleId}>
              {title}
            </h2>
            <Button
              variant="danger"
              isIcon={true}
              onClick={onClose}
              aria-label={closeAria}
            >
              <X size={14} />
            </Button>
          </div>

          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.body
  );
};

export default Modal;
