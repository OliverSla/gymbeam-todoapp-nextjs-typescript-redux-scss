'use client'

import styles from "./todoapp.module.scss";
import useResizable from "../hooks/useResizable";
import Sidebar from "@/components/layoutComponents/Sidebar/Sidebar";
import TodoContent from "@/components/layoutComponents/TodoContent/TodoContent";
import TodoDetails from "@/components/layoutComponents/TodoDetails/TodoDetails";

const TodoApp = () => {
  const { contentRef, detailsRef, handleMouseDown } = useResizable();

  return (
    <div className={styles.todo_wrapper}>
      <Sidebar />
      <div className={styles.content_wrapper}>

        <div ref={contentRef} className={styles.todoContent}>
          <TodoContent />
          <div
            className={styles.resize_handle}
            onMouseDown={handleMouseDown}
          ></div>
        </div>
        <div ref={detailsRef} className={styles.todoDetails}>
          <TodoDetails />
        </div>

      </div>
    </div>
  );
};

export default TodoApp;
