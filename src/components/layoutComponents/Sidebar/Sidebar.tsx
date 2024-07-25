import React from "react";
import styles from "./sidebar.module.scss";
import classNames from "classnames";
import { Add, Trash } from "iconsax-react";
import { MdDone } from "react-icons/md";
import { IoListOutline } from "react-icons/io5";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      {/* Logo */}

      <div className={styles.logo_container}>
        <div className={styles.logo}></div>
      </div>

      {/* Category list*/}

      <div className={styles.sidebar_item_wrapper_first}>
        <div className={styles.category_container}>
          <p>Category</p>
          <Add className={styles.add_icon} size={20}></Add>
        </div>
        <div className={styles.category_items_wrapper}>
          <div className={classNames(styles.category_item, styles.active)}>
            <IoListOutline size={18} />
            <p className={classNames(styles.category_item_text, styles.active)}>
              My first category
            </p>
          </div>
          <div className={styles.category_item}>
            <IoListOutline size={18} />
            <p className={styles.category_item_text}>My first category</p>
          </div>
          <div className={styles.category_item}>
            <IoListOutline size={18} />
            <p className={styles.category_item_text}>My first category</p>
          </div>
        </div>
      </div>

      {/* Completed button */}

      <div className={styles.sidebar_item_wrapper}>
        <div className={styles.completed_container}>
          <MdDone size={18}></MdDone>
          <p>Completed</p>
        </div>
      </div>

      {/* Trash button */}

      <div className={styles.sidebar_item_wrapper}>
        <div className={styles.trash_container}>
          <Trash size={18}></Trash>
          <p>Trash</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
