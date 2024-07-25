import React from "react";
import styles from "./tododetails.module.scss";
import { Flag, Calendar } from "iconsax-react";

const TodoDetails = () => {
  return (
    <aside className={styles.todo_details_wrapper}>
      {/* Todo Details Header */}
      <div className={styles.todo_details_header}>
        <div className={styles.todo_details_header_left}>
          <input
            className={styles.todo_details_header_checkbox}
            type="checkbox"
            size={24}
          />
          <div className={styles.todo_details_header_divider}></div>
          <div className={styles.todo_details_header_calendar}>
            <Calendar size={24} />
            <p>25.7.2024</p>
          </div>
        </div>
        <div className={styles.todo_details_header_right}>
          <Flag size={24} />
          <p>Priority</p>
        </div>
      </div>

      {/* Todo Details Content */}

      <div className={styles.todo_details_content_wrapper}>
        <p className={styles.todo_details_content_title}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia...
        </p>

        <p className={styles.todo_details_content_description}>Write some description..</p>
      </div>
    </aside>
  );
};

export default TodoDetails;
