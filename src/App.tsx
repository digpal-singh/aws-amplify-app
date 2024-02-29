import React, { useEffect, useState } from "react";
import { CreateTodoInput, Todo } from "./API";
import { generateClient } from "aws-amplify/api";
import { createTodo, deleteTodo, updateTodo } from "./graphql/mutations";
import { listTodos } from "./graphql/queries";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const client = generateClient();
function App() {
  const [formState, setFormState] = useState<CreateTodoInput>({
    name: "",
    description: "",
  });
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isUpdate, setIsUpdate] = useState<any>(null);
  // const [updateId, setUpdateId] = useState<string | null>(null);

  const addTodo = async () => {
    try {
      if (!formState.name || !formState.description) return;
      const todo = { ...formState };
      setFormState({
        name: "",
        description: "",
      });
      const data = await client.graphql({
        query: createTodo,
        variables: {
          input: todo,
        },
      });
      setTodos([...todos, data.data.createTodo]);
    } catch (error) {
      console.log("error creating todo:", error);
    }
  };

  const updateTodoHandler = async () => {
    try {
      if (!formState.name || !formState.description) return;

      if (isUpdate) {
        const todo = { ...formState, id: isUpdate.id };
        setFormState({
          name: "",
          description: "",
        });
        setIsUpdate(null);

        const data = await client.graphql({
          query: updateTodo,
          variables: {
            input: todo,
          },
        });
        if (data.data) {
          const updatedTodos = todos.map((item) =>
            item.id === todo.id ? data.data.updateTodo : item
          );
          setTodos(updatedTodos);
        }
      }
    } catch (error) {
      console.log("error updating todo:", error);
    }
  };

  const fetchTodos = async () => {
    try {
      const res = await client.graphql({
        query: listTodos,
      });
      setTodos(res.data.listTodos.items);
    } catch (error) {
      console.log("error fetching todo:", error);
    }
  };

  const deleteHandler = async (id: any) => {
    if (isUpdate?.id === id) {
      setIsUpdate(null);
      setFormState({
        name: "",
        description: "",
      });
    }
    try {
      const res = await client.graphql({
        query: deleteTodo,
        variables: {
          input: { id },
        },
      });
      if (res.data) {
        const filterTodos = todos.filter((todo) => todo.id !== id);
        setTodos(filterTodos);
      }
    } catch (error) {
      console.log("error deleting todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = (todo: Todo) => {
    setFormState({
      name: todo.name,
      description: todo.description,
    });
    setIsUpdate(todo);
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h2 className="text-3xl font-medium mb-4">Todo app</h2>
      <TodoForm
        formState={formState}
        onInputChange={handleInputChange}
        onSubmit={isUpdate ? updateTodoHandler : addTodo}
        isUpdate={isUpdate}
      />
      <TodoList
        todos={todos}
        onUpdate={handleUpdate}
        onDelete={deleteHandler}
      />
    </div>
  );
}

export default App;
