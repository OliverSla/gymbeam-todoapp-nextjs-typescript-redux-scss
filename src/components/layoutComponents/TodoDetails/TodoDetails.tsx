import React, { useState, useEffect, useRef } from "react";
import styles from "./tododetails.module.scss";
import { Flag, Calendar } from "iconsax-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { updateTodoInCategory } from "@/store/slices/categoriesSlice";

interface TodoDetailsProps {
  todoId: string | null;
}

const TodoDetails: React.FC<TodoDetailsProps> = ({ todoId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.categories);
  const [description, setDescription] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const todo = categories
    .flatMap((category) => category.todos)
    .find((todo) => todo.id === todoId);

  useEffect(() => {
    if (todo) {
      setDescription(todo.description);
    }
  }, [todo]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [description]);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleDescriptionBlur = () => {
    if (todo && todo.description !== description) {
      dispatch(
        updateTodoInCategory({
          categoryId: todo.category,
          todo: { ...todo, description },
        })
      );
    }
  };

  const handleToggleCompleted = () => {
    if (todo) {
      dispatch(
        updateTodoInCategory({
          categoryId: todo.category,
          todo: { ...todo, completed: !todo.completed },
        })
      );
    }
  };

  if (!todo) {
    return (
      <div className={styles.todo_details_wrapper}>
        <p className={styles.todo_details_not_found}>
          Select a todo to view details
        </p>
      </div>
    );
  }

  return (
    <aside className={styles.todo_details_wrapper}>
      {/* Todo Details Header */}
      <div className={styles.todo_details_header}>
        <div className={styles.todo_details_header_left}>
          <input
            className={styles.todo_details_header_checkbox}
            type="checkbox"
            size={24}
            checked={todo.completed}
            onChange={handleToggleCompleted} // Added this line
          />
          <div className={styles.todo_details_header_divider}></div>
          <div className={styles.todo_details_header_calendar}>
            <Calendar size={24} />
            <p>{new Date(todo.dueDate).toLocaleDateString()}</p>
          </div>
        </div>
        <div className={styles.todo_details_header_right}>
          <Flag size={24} />
          <p>
            {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
          </p>
        </div>
      </div>

      {/* Todo Details Content */}
      <div className={styles.todo_details_content_wrapper}>
        <p className={styles.todo_details_content_title}>{todo.title}</p>
        <textarea
          className={styles.todo_details_content_description}
          value={description}
          ref={textareaRef}
          onChange={handleDescriptionChange}
          onBlur={handleDescriptionBlur}
          placeholder="Write some description..."
        />
      </div>
    </aside>
  );
};

export default TodoDetails;
