"use client"; // Ensure it's a client-side component
import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Import useParams from next/navigation

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const PostPage = () => {
  const { id } = useParams(); // Use useParams for dynamic route parameter
  console.log("ID from useParams:", id);

  const [post, setPost] = useState<Post | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");

  // Fetch the post when the component mounts or the `id` changes
  useEffect(() => {
    if (id) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setPost(data);
          setNewTitle(data.title);
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
          alert("Failed to fetch post data. Please try again later.");
        });
    }
  }, [id]);
   // Fetch data when `id` changes

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value); // Update newTitle state as user types
  };

  const handleSave = () => {
    if (post) {
      console.log("Saving post with new title:", newTitle); // Debugging
      fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: post.id,
          title: newTitle, // Use newTitle to update the title
          body: post.body,
          userId: post.userId,
        }),
      })
         .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setNewTitle(data.title);
        console.log("Updated Post Data:", data);
        alert("Post updated successfully!");
      })
        .catch((error) => console.error("Error updating post:", error));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Post {post?.id}</h1>
      {post ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
            className="border p-2 w-full mb-4"
          />
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Save
          </button>
        </>
      ) : (
        <p>Loading post...</p>
      )}
    </div>
  );
};

export default PostPage;
