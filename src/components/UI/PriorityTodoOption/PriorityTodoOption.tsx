import { useEffect, useRef } from "react";
import styles from "./priorityTodoOption.module.scss";
import { Flag } from "iconsax-react";
import ReactDOM from "react-dom";
import classNames from "classnames";

export interface TodoPriorityProps {
  position: { top: number; left: number };
  onChangePriority: (priority: "high" | "medium" | "low") => void;
  onClose: () => void;
}

const PriorityTodoOption: React.FC<TodoPriorityProps> = ({
  position,
  onChangePriority,
  onClose,
}) => {

    
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
      <div
        className={classNames(styles.todoOption_item, styles.high_priority)}
        onClick={() => onChangePriority("high")}
      >
        <Flag size={16} />
        <p className={styles.high_priority}>High</p>
      </div>

      <div
        className={classNames(styles.todoOption_item, styles.medium_priority)}
        onClick={() => onChangePriority("medium")}
      >
        <Flag size={16} />
        <p className={styles.medium_priority}>Medium</p>
      </div>

      <div
        className={classNames(styles.todoOption_item, styles.low_priority)}
        onClick={() => onChangePriority("low")}
      >
        <Flag size={16} />
        <p className={styles.low_priority}>Low</p>
      </div>
    </div>,
    document.body
  );
};

export default PriorityTodoOption;
