import { useState } from "react";

interface ModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addPost: (title: string) => void; // Callback to add the new post
}

const Modal = ({ setModalOpen, addPost }: ModalProps) => {
  const [title, setTitle] = useState<string>("");

  const handleCreatePost = () => {
    if (title.trim()) {
      addPost(title); // Pass the title to the parent for handling the new post
      setModalOpen(false); // Close the modal
    } else {
      alert("Please enter a valid title!"); // Simple validation
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
        <input
          type="text"
          value={title || ""} // Ensure the input is always controlled
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter post title"
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={handleCreatePost}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition"
          >
            Create
          </button>
          <button
            onClick={() => setModalOpen(false)}
            className="bg-gray-300 py-2 px-4 rounded-md hover:bg-gray-400 focus:ring-2 focus:ring-gray-200 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal; 