'use client';

import React, { useState } from 'react';
import styles from "./todoapp.module.scss";
import useResizable from "../hooks/useResizable";
import Sidebar from "@/components/layoutComponents/Sidebar/Sidebar";
import TodoContent from "@/components/layoutComponents/TodoContent/TodoContent";
import TodoDetails from "@/components/layoutComponents/TodoDetails/TodoDetails";
import ReduxProvider from "@/store/Provider";

const TodoApp = () => {
  const { contentRef, detailsRef, handleMouseDown } = useResizable();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);

  return (
    <ReduxProvider>
      <div className={styles.todo_wrapper}>
        <Sidebar selectedCategoryId={selectedCategoryId} setSelectedCategoryId={setSelectedCategoryId} />
        <div className={styles.content_wrapper}>
          <div ref={contentRef} className={styles.todoContent}>
            <TodoContent selectedCategoryId={selectedCategoryId} onSelectTodo={setSelectedTodoId} />
            <div
              className={styles.resize_handle}
              onMouseDown={handleMouseDown}
            ></div>
          </div>
          <div ref={detailsRef} className={styles.todoDetails}>
            <TodoDetails todoId={selectedTodoId} />
          </div>
        </div>
      </div>
    </ReduxProvider>
  );
};

export default TodoApp;
