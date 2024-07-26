"use client";

import React, { useEffect, useState, useRef, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import styles from "./todocontent.module.scss";
import { GoSun } from "react-icons/go";
import { MdOutlineNightlight } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { Add, Flag, Trash } from "iconsax-react";
import classNames from "classnames";
import {
  addTodoToCategory,
  fetchCategories,
  updateTodoInCategory,
  deleteTodoFromCategory,
} from "@/store/slices/categoriesSlice";
import TodoOptions from "@/components/UI/TodoOptions/TodoOptions";
import PriorityTodoOption from "@/components/UI/PriorityTodoOption/PriorityTodoOption";

import { RiMenuUnfold2Line, RiMenuUnfoldLine } from "react-icons/ri";

const TodoContent = ({
  selectedCategoryId,
  onSelectTodo,
  setOpenSidebar,
  openSidebar,
}: {
  selectedCategoryId: string | null;
  onSelectTodo: (todoId: string) => void;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  openSidebar: boolean;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.categories
  );
  const [newTodo, setNewTodo] = useState("");
  const [optionsTodoId, setOptionsTodoId] = useState<string | null>(null);
  const [priorityTodoId, setPriorityTodoId] = useState<string | null>(null);
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [editingTodoText, setEditingTodoText] = useState<string>("");
  const [optionsPosition, setOptionsPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [activeTodoId, setActiveTodoId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (editingTodoId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingTodoId]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() !== "" && selectedCategoryId) {
      dispatch(
        addTodoToCategory({
          categoryId: selectedCategoryId,
          todo: {
            title: newTodo,
            description: "",
            completed: false,
            priority: "medium",
            dueDate: new Date().toISOString(),
            category: selectedCategoryId,
            trash: false,
          },
        })
      );
      setNewTodo("");
    }
  };

  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId
  );

  const handleToggleTodo = (todoId: string) => {
    const todo = selectedCategory?.todos.find((todo) => todo.id === todoId);
    if (todo) {
      dispatch(
        updateTodoInCategory({
          categoryId: selectedCategoryId!,
          todo: { ...todo, completed: !todo.completed },
        })
      );
    }
  };

  const handleDeleteTodo = (todoId: string) => {
    dispatch(
      deleteTodoFromCategory({
        categoryId: selectedCategoryId!,
        todoId,
      })
    );
  };

  const handleDuplicateTodo = (todoId: string) => {
    const todo = selectedCategory?.todos.find((todo) => todo.id === todoId);
    if (todo) {
      dispatch(
        addTodoToCategory({
          categoryId: selectedCategoryId!,
          todo: {
            title: `${todo.title}`,
            description: todo.description,
            completed: todo.completed,
            priority: todo.priority,
            dueDate: todo.dueDate,
            category: selectedCategoryId!,
            trash: todo.trash,
          },
        })
      );
    }
  };

  const handleShowOptions = (todoId: string, event: MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setOptionsPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setOptionsTodoId(optionsTodoId === todoId ? null : todoId);
    setPriorityTodoId(null);
  };

  const handleShowPriorityOptions = (todoId: string, event: MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setOptionsPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setPriorityTodoId(priorityTodoId === todoId ? null : todoId);
    setOptionsTodoId(null);
  };

  const handleEditTodo = (todoId: string, todoText: string) => {
    setEditingTodoId(todoId);
    setEditingTodoText(todoText);
    setOptionsTodoId(null);
    setPriorityTodoId(null);
  };

  const handleSaveEdit = (todoId: string) => {
    if (editingTodoText.trim() !== "") {
      const todo = selectedCategory?.todos.find((todo) => todo.id === todoId);
      console.log("Edited todo:", todo); // Debug log
      if (todo) {
        dispatch(
          updateTodoInCategory({
            categoryId: selectedCategoryId!,
            todo: { ...todo, title: editingTodoText },
          })
        );
      }
      setEditingTodoId(null);
      setEditingTodoText("");
    }
  };

  const handleChangePriority = (
    todoId: string,
    priority: "high" | "medium" | "low"
  ) => {
    const todo = selectedCategory?.todos.find((todo) => todo.id === todoId);
    if (todo) {
      dispatch(
        updateTodoInCategory({
          categoryId: selectedCategoryId!,
          todo: { ...todo, priority },
        })
      );
    }
    setPriorityTodoId(null);
  };

  return (
    <div className={styles.todoContent_wrapper}>
      {/* Todo Content Header */}
      <div className={styles.todoContent_header}>
        {openSidebar ? (
          <RiMenuUnfold2Line
            className={styles.menu_icon}
            size={24}
            onClick={() => setOpenSidebar(false)}
          />
        ) : (
          <RiMenuUnfoldLine
            className={styles.menu_icon}
            size={24}
            onClick={() => setOpenSidebar(true)}
          />
        )}
        <p className={styles.todoContent_header_text}>
          {selectedCategory?.name || "Select a category"}
        </p>
        <GoSun className={styles.todoContent_header_darkmode_icon} size={24} />
      </div>

      {/* Todo Content form to add todo */}
      <div className={styles.todoContent_form}>
        <form onSubmit={handleAddTodo}>
          <Add className={styles.todoContent_form_icon} size={20} />
          <input
            className={styles.todoContent_input}
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new todo"
          />
          <input
            className={styles.todoContent_form_submit}
            type="submit"
            value="Add todo"
          />
        </form>
      </div>

      {/* Todo Content Text */}
      <div className={styles.todoContent_todos}>
        <p>Todos</p>
      </div>

      {/* Todo Content List */}
      <div className={styles.todoContent_list_wrapper}>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {selectedCategory?.todos.map((todo) => (
          <div
            key={todo.id}
            className={classNames(styles.todoContent_list_item, {
              [styles.checked]: todo.completed,
              [styles.active]: todo.id === activeTodoId,
            })}
            onClick={() => {
              onSelectTodo(todo.id);
              setActiveTodoId(todo.id);
            }}
          >
            <div className={styles.todoContent_list_item_left}>
              <input
                className={styles.todoContent_list_item_checkbox}
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
              />
              {editingTodoId === todo.id ? (
                <input
                  className={styles.todoContent_edit_input}
                  type="text"
                  value={editingTodoText}
                  ref={inputRef}
                  onChange={(e) => setEditingTodoText(e.target.value)}
                  onBlur={() => handleSaveEdit(todo.id)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSaveEdit(todo.id)
                  }
                />
              ) : (
                <p
                  className={classNames(styles.todoContent_list_item_text, {
                    [styles.checked]: todo.completed,
                  })}
                >
                  {todo.title}
                </p>
              )}
            </div>
            <div className={styles.todoContent_list_item_right}>
              <Flag
                size={20}
                className={styles[`flag_icon_priority_${todo.priority}`]}
                onClick={(e) => {
                  e.stopPropagation();
                  handleShowPriorityOptions(todo.id, e);
                }}
              />
              <IoIosMore
                size={20}
                onClick={(e) => {
                  e.stopPropagation();
                  handleShowOptions(todo.id, e);
                }}
              />
              {optionsTodoId === todo.id && optionsPosition && (
                <TodoOptions
                  todoId={todo.id}
                  categoryId={selectedCategoryId!}
                  onEdit={() => handleEditTodo(todo.id, todo.title)}
                  onClose={() => setOptionsTodoId(null)}
                  onDelete={() => handleDeleteTodo(todo.id)}
                  onDuplicate={() => handleDuplicateTodo(todo.id)}
                  position={optionsPosition}
                />
              )}

              {priorityTodoId === todo.id && optionsPosition && (
                <PriorityTodoOption
                  position={optionsPosition}
                  onChangePriority={(priority) =>
                    handleChangePriority(todo.id, priority)
                  }
                  onClose={() => setPriorityTodoId(null)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoContent;
