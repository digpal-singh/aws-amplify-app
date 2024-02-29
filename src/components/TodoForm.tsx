import React from "react";
import { CreateTodoInput } from "../API";

interface TodoFormProps {
  formState: CreateTodoInput;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: () => void;
  isUpdate: any;
}

const TodoForm: React.FC<TodoFormProps> = ({
  formState,
  onInputChange,
  onSubmit,
  isUpdate,
}) => {
  return (
    <div>
      <input
        onChange={onInputChange}
        className="border border-gray-400 px-3 py-2 mb-4 w-full"
        value={formState.name}
        name="name"
        placeholder="Name"
      />
      <textarea
        onChange={onInputChange}
        className="border border-gray-400 px-3 py-2 mb-4 w-full   "
        value={formState.description || ""}
        placeholder="Description"
        name="description"
        style={{ minWidth: "100%" }}
      />
      {isUpdate ? (
        <button
          className="bg-black text-white px-4 py-2 mb-4 w-full"
          onClick={onSubmit}
        >
          Update
        </button>
      ) : (
        <button
          className="bg-black text-white px-4 py-2 mb-4 w-full"
          onClick={onSubmit}
        >
          Create
        </button>
      )}
    </div>
  );
};

export default TodoForm;
