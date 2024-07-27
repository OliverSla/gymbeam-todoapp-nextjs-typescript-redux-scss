"use client";

import { useState, useEffect } from "react";
import React from "react";
import styles from "./sidebar.module.scss";
import classNames from "classnames";
import { Add, Trash } from "iconsax-react";
import { MdDone } from "react-icons/md";
import { IoListOutline } from "react-icons/io5";
import { RiMenuFold2Fill, RiMenuUnfold2Fill } from "react-icons/ri";
import CreateCategoryPopup from "../../UI/CreateCategoryPopup/CreateCategoryPopup";

import {
  fetchCategories,
  deleteCategory,
} from "../../../store/slices/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";

interface SidebarProps {
  selectedCategoryId: string | null;
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<string | null>>;
  openSidebar: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedCategoryId,
  setSelectedCategoryId,
  openSidebar,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.categories
  );

  const [openPopupCreateCategory, setOpenPopupCreateCategory] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [categories, selectedCategoryId, setSelectedCategoryId]);

  const handleDeleteCategory = (id: string) => {
    dispatch(deleteCategory(id));
  };

  return (
    <>
      <aside className={classNames({ [styles.sidebar_open]: openSidebar, [styles.sidebar_close]: !openSidebar })}>
        {/* Logo */}

        <div className={styles.logo_container}>
          <div className={styles.logo}></div>
        </div>

        {/* Category list*/}

        <div className={styles.sidebar_item_wrapper_first}>
          <div className={styles.category_container}>
            <p>Category</p>
            <Add
              className={styles.add_icon}
              size={20}
              onClick={() =>
                setOpenPopupCreateCategory(!openPopupCreateCategory)
              }
            />
            {openPopupCreateCategory ? (
              <CreateCategoryPopup
                setOpenPopupCreateCategory={setOpenPopupCreateCategory}
              />
            ) : null}
          </div>
          <div className={styles.category_items_wrapper}>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {categories.map((category) => (
              <div
                key={category.id}
                className={classNames(styles.category_item, {
                  [styles.active]: category.id === selectedCategoryId,
                })}
                onClick={() => setSelectedCategoryId(category.id)}
              >
                <IoListOutline size={18} />
                <p
                  className={classNames(styles.category_item_text, {
                    [styles.active]: category.id === selectedCategoryId,
                  })}
                >
                  {category.name}
                </p>
                <Trash
                  size={18}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCategory(category.id);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;
