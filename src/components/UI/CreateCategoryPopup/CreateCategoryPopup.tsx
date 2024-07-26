"use client";

import { useState, useEffect } from "react";
import React from "react";
import { Add } from "iconsax-react";
import styles from "./createCategoryPopup.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { addCategory } from "../../../store/slices/categoriesSlice";

interface CreateCategoryPopupProps {
  setOpenPopupCreateCategory: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateCategoryPopup: React.FC<CreateCategoryPopupProps> = ({
  setOpenPopupCreateCategory,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [categoryName, setCategoryName] = useState("");

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryName.trim() !== "") {
      dispatch(addCategory(categoryName));
      setCategoryName("");
      setOpenPopupCreateCategory(false);
    }
  };

  return (
    <div className={styles.popupContainer}>
      <div>
        <form
          className={styles.popupContainer_form}
          onSubmit={handleAddCategory}
        >
          <Add size={16} />
          <input
            type="text"
            placeholder="Create new category"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className={styles.popupContainer_input}
          />
          <button type="submit" className={styles.popupContainer_button}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryPopup;
