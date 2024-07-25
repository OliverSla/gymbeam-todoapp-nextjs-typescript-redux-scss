import styles from "./todocontent.module.scss";
import { GoSun } from "react-icons/go";
import { MdOutlineNightlight } from "react-icons/md";

const TodoContent = () => {
  return (
    <div className={styles.todoContent_wrapper}>
      {/* Todo Content Header */}
      <div className={styles.todoContent_header}>
        <p className={styles.todoContent_header_text}>My new category</p>
        <MdOutlineNightlight
          className={styles.todoContent_header_darkmode_icon}
          size={24}
        />
      </div>

      {/* Todo Content form to add todo */}

      <div className={styles.todoContent_form_wrapper}>
        
      </div>

      {/* Todo Content List */}
    </div>
  );
};

export default TodoContent;
