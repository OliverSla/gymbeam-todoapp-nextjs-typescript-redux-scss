import styles from "./todocontent.module.scss";
import { GoSun } from "react-icons/go";
import { MdOutlineNightlight } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { Add, Flag } from "iconsax-react";
import classNames from "classnames";

const TodoContent = () => {
  return (
    <div className={styles.todoContent_wrapper}>
      {/* Todo Content Header */}
      <div className={styles.todoContent_header}>
        <p className={styles.todoContent_header_text}>My first category</p>
        <GoSun className={styles.todoContent_header_darkmode_icon} size={24} />
      </div>

      {/* Todo Content form to add todo */}

      <div className={styles.todoContent_form}>
        <form action="">
          <Add className={styles.todoContent_form_icon} size={20} />
          <input
            className={styles.todoContent_input}
            type="text"
            placeholder="Add new todo"
          />
          <input
            className={styles.todoContent_form_submit}
            type="submit"
            value="Pridať todo"
          />
        </form>
      </div>

      {/* Todo Content tText*/}

      <div className={styles.todoContent_todos}>
        <p>Todos</p>
      </div>

      {/* Todo Content List */}

      <div className={styles.todoContent_list_wrapper}>
        {/* Todo Content item 1 */}

        <div className={styles.todoContent_list_item}>
          <div className={styles.todoContent_list_item_left}>
            <input
              className={styles.todoContent_list_item_checkbox}
              type="checkbox"
            />

            <p className={styles.todoContent_list_item_text}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia...
            </p>
          </div>

          <div className={styles.todoContent_list_item_right}>
            <Flag size={20} className={styles.flag_icon_priority_medium} />
            <IoIosMore size={20} />
          </div>
        </div>

        {/* Todo Content item 2 */}

        <div className={classNames(styles.todoContent_list_item, styles.checked)}>
          <div className={styles.todoContent_list_item_left}>
            <input
              className={styles.todoContent_list_item_checkbox}
              type="checkbox"
            />

            <p className={classNames(styles.todoContent_list_item_text,styles.checked)}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia...
            </p>
          </div>

          <div className={styles.todoContent_list_item_right}>
            <Flag size={20} className={styles.flag_icon_priority_medium} />
            <IoIosMore size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoContent;
