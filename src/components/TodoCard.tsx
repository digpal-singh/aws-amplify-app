import React, { useState } from "react";
import { Todo } from "../API";
import ConfirmModal from "./ConfirmModal";

interface TodoCardProps {
  todo: Todo;
  onUpdate: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onUpdate, onDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(todo.id);
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="bg-gray-200 rounded-md p-4 mb-4">
      <p className="text-lg font-bold mb-2">{todo.name}</p>
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <p
          className="text-gray-700 mb-2 sm:mb-0 sm:mr-4"
          style={{ minWidth: 0 }}
        >
          {todo.description}
        </p>
        <div className="flex gap-2">
          <button
            className="bg-black text-white px-3 py-1"
            onClick={() => onUpdate(todo)}
          >
            Update
          </button>
          <button
            className="bg-black text-white px-3 py-1"
            onClick={() => handleDeleteClick()}
          >
            Delete
          </button>
        </div>
      </div>
      {isDeleteModalOpen && (
        <ConfirmModal
          handleConfirmDelete={handleConfirmDelete}
          handleCancelDelete={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default TodoCard;
