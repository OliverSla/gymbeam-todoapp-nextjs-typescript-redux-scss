import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./todoOptions.module.scss";
import { Trash, Edit2, Copy } from "iconsax-react";

export interface TodoOptionsProps {
  todoId: string;
  categoryId: string;
  onEdit: () => void;
  onClose: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  position: { top: number; left: number };
}

const TodoOptions: React.FC<TodoOptionsProps> = ({
  todoId,
  categoryId,
  onEdit,
  onClose,
  onDelete,
  onDuplicate,
  position,
}) => {
  const handleEditClick = () => {
    onEdit();
    onClose();
  };

  const handleDeleteClick = () => {
    onDelete();
    onClose();
  };

  const handleDuplicateClick = () => {
    onDuplicate();
    onClose();
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose]);

  return ReactDOM.createPortal(
    <div
      className={styles.popupContainer}
      style={{ top: position.top, left: position.left }}
      ref={ref}
    >
      <div className={styles.todoOption_item} onClick={handleEditClick}>
        <Edit2 size={16} />
        <p>Edit</p>
      </div>
      <div className={styles.todoOption_item} onClick={handleDuplicateClick}>
        <Copy size={16} />
        <p>Duplicate</p>
      </div>
      <div className={styles.todoOption_item} onClick={handleDeleteClick}>
        <Trash size={16} />
        <p>Delete</p>
      </div>
    </div>,
    document.body
  );
};

export default TodoOptions;
