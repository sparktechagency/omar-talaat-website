"use client";

import { useState } from "react";
import MyFeed from "./MyFeed";

export default function MyFeedData() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      content:
        "We're thrilled to introduce our latest update – [Feature Name]!<br>Whether you're connecting with friends, sharing content, or discovering new things, this new feature is designed to make your experience even better.",
    },
    {
      id: 2,
      content:
        "We're thrilled to introduce our latest update – [Feature Name]!<br>Whether you're connecting with friends, sharing content, or discovering new things, this new feature is designed to make your experience even better.",
    },
    {
      id: 3,
      content:
        "We're thrilled to introduce our latest update – [Feature Name]!<br>Whether you're connecting with friends, sharing content, or discovering new things, this new feature is designed to make your experience even better.",
    },
    {
      id: 4,
      content:
        "We're thrilled to introduce our latest update – [Feature Name]!<br>Whether you're connecting with friends, sharing content, or discovering new things, this new feature is designed to make your experience even better.",
    },
  ]);

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const handleUpdate = (id, newContent) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, content: newContent } : post
      )
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
      {posts.map((post) => (
        <MyFeed
          key={post.id}
          id={post.id}
          initialContent={post.content}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}
