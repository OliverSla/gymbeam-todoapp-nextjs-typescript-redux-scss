import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { MockAPI } from "@/lib/config";

const API_URL = `${MockAPI}`;

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  priority: "high" | "medium" | "low";
  category: string;
  trash: boolean;
}

interface Category {
  id: string;
  name: string;
  todos: Todo[];
}

interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (name: string) => {
    const response = await axios.post(API_URL, { name, todos: [] });
    return response.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

export const addTodoToCategory = createAsyncThunk(
  "categories/addTodoToCategory",
  async (
    { categoryId, todo }: { categoryId: string; todo: Omit<Todo, "id"> },
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as RootState;
    const category = state.categories.categories.find(
      (cat) => cat.id === categoryId
    );

    if (category) {
      const updatedTodos = [
        ...category.todos,
        { ...todo, id: Date.now().toString() },
      ];
      const response = await axios.put(`${API_URL}/${categoryId}`, {
        ...category,
        todos: updatedTodos,
      });
      return { categoryId, todos: response.data.todos };
    } else {
      throw new Error("Category not found");
    }
  }
);

export const updateTodoInCategory = createAsyncThunk(
  "categories/updateTodoInCategory",
  async (
    { categoryId, todo }: { categoryId: string; todo: Todo },
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as RootState;
    const category = state.categories.categories.find(
      (cat) => cat.id === categoryId
    );

    if (category) {
      const updatedTodos = category.todos.map((t) =>
        t.id === todo.id ? todo : t
      );
      const response = await axios.put(`${API_URL}/${categoryId}`, {
        ...category,
        todos: updatedTodos,
      });
      return { categoryId, todos: response.data.todos };
    } else {
      throw new Error("Category not found");
    }
  }
);

export const deleteTodoFromCategory = createAsyncThunk(
  "categories/deleteTodoFromCategory",
  async (
    { categoryId, todoId }: { categoryId: string; todoId: string },
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as RootState;
    const category = state.categories.categories.find(
      (cat) => cat.id === categoryId
    );

    if (category) {
      const updatedTodos = category.todos.filter((todo) => todo.id !== todoId);
      const response = await axios.put(`${API_URL}/${categoryId}`, {
        ...category,
        todos: updatedTodos,
      });
      return { categoryId, todos: response.data.todos };
    } else {
      throw new Error("Category not found");
    }
  }
);

export const duplicateTodoInCategory = createAsyncThunk(
  "categories/duplicateTodoInCategory",
  async (
    { categoryId, todo }: { categoryId: string; todo: Todo },
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as RootState;
    const category = state.categories.categories.find(
      (cat) => cat.id === categoryId
    );

    if (category) {
      const duplicatedTodo = { ...todo, id: Date.now().toString() };
      const updatedTodos = [...category.todos, duplicatedTodo];
      const response = await axios.put(`${API_URL}/${categoryId}`, {
        ...category,
        todos: updatedTodos,
      });
      return { categoryId, todos: response.data.todos };
    } else {
      throw new Error("Category not found");
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch categories";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload
        );
      })
      .addCase(addTodoToCategory.fulfilled, (state, action) => {
        const category = state.categories.find(
          (cat) => cat.id === action.payload?.categoryId
        );
        if (category) {
          category.todos = action.payload.todos ?? [];
        }
      })
      .addCase(updateTodoInCategory.fulfilled, (state, action) => {
        const category = state.categories.find(
          (cat) => cat.id === action.payload.categoryId
        );
        if (category) {
          category.todos = action.payload.todos ?? [];
        }
      })
      .addCase(deleteTodoFromCategory.fulfilled, (state, action) => {
        const category = state.categories.find(
          (cat) => cat.id === action.payload?.categoryId
        );
        if (category) {
          category.todos = action.payload.todos ?? [];
        }
      })
      .addCase(duplicateTodoInCategory.fulfilled, (state, action) => {
        const category = state.categories.find(
          (cat) => cat.id === action.payload?.categoryId
        );
        if (category) {
          category.todos = action.payload.todos ?? [];
        }
      });
  },
});

export default categoriesSlice.reducer;
