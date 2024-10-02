import { create } from "zustand";

type TodoStore = {
  todos: { id: number; task: string; title: string; updatedAt: Date }[];
  fetchTodos: () => Promise<void>;
  updateTodo: (title: string, task: string, id: number) => Promise<string>;
};

export const useTodoStore = create<TodoStore>()((set) => ({
  todos: [],
  fetchTodos: async () => {
    try {
      const response = await fetch("http://192.168.1.72:3000/api/todo/getAll");
      const data = await response.json();
      set({ todos: data });
      // console.log(data);
    } catch (error) {
      console.error("Error fetching Todos: ", error);
    }
  },
  updateTodo: async (title: string, task: string, id: number) => {
    const bodyJson = JSON.stringify({
      id: id,
      title: title,
      task: task,
    });
    console.log(bodyJson);

    try {
      const response = await fetch("http://192.168.1.72:3000/api/todo/update", {
        method: "POST",
        body: bodyJson,
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      });
      const data = await response.json();
      console.log(data);
      return "success";
    } catch (error) {
      console.error("Error updating todo: ", error);
      return "fail";
    }
  },
}));
