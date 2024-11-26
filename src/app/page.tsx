"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Modal from "./pages/components/Modal";
import { useRouter } from "next/navigation";

interface Post {
  id: number;
  title: string;
}

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState("text-base");
  const [fontFamily, setFontFamily] = useState("font-sans");
  const router = useRouter();

  // Fetch posts from the API
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setTotalPages(Math.ceil(100 / 5)); // Mock total of 100 posts
      });
  }, [page]);

  // Add a new post (mocked for this example)
  const addPost = (title: string) => {
    const newPost: Post = {
      id: posts.length + 1, // Mock ID generation
      title,
    };
    setPosts([newPost, ...posts]);
  };

  // Update post in the local state
  const updatePost = (updatedPost: Post) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      )
    );
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Handle theme change
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? "dark" : "light";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-600">Posts</h1>

      {/* Theme Toggle Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleTheme}
          className="bg-gray-600 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Font Style Customization Section */}
      <div className="flex justify-center gap-4 mb-8">
        <select
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          className="p-2 rounded-md border"
        >
          <option value="text-sm">Small</option>
          <option value="text-base">Medium</option>
          <option value="text-lg">Large</option>
          <option value="text-xl">Extra Large</option>
        </select>

        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="p-2 rounded-md border"
        >
          <option value="font-sans">Sans Serif</option>
          <option value="font-serif">Serif</option>
          <option value="font-mono">Mono</option>
        </select>
      </div>

      {/* Create Post Button */}
      <div className="flex justify-center mb-8">
        <button
          className="bg-blue-600 text-white py-3 px-8 rounded-md text-xl shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition transform hover:scale-105"
          onClick={() => setModalOpen(true)}
        >
          Create New Post
        </button>
      </div>

      {/* Posts Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <table className="min-w-full text-left table-auto">
          <thead>
            <tr className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
              <th className="px-6 py-4 border-b">ID</th>
              <th className="px-6 py-4 border-b">Title</th>
              <th className="px-6 py-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-300"
              >
                <td
                  className={`px-6 py-4 border-b ${fontSize} ${fontFamily} ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {post.id}
                </td>
                <td
                  className={`px-6 py-4 border-b ${fontSize} ${fontFamily} ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {post.title}
                </td>
                <td className="px-6 py-4 border-b">
                  <Link
                    href={`/post/${post.id}`}
                    className="text-blue-500 hover:text-blue-700 focus:ring-2 focus:ring-blue-300 transition"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`py-2 px-4 rounded-md text-lg ${
            page === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="text-lg font-semibold">{`Page ${page} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className={`py-2 px-4 rounded-md text-lg ${
            page === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal setModalOpen={setModalOpen} addPost={addPost} />
      )}
    </div>
  );
};

export default PostsPage;
