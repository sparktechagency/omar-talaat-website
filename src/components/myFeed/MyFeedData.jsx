"use client";
import { useState } from "react";
import MyFeed from "./MyFeed";
import { Toaster } from "sonner";

export default function MyFeedData() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "@DebraKursh",
      userAvatar: "/avatar-placeholder.png",
      timeAgo: "2 hours ago",
      title: "Exciting Things Are Coming",
      content:
        "We're thrilled to introduce our latest update – <strong>Feature Name</strong>! Whether you're connecting with friends, sharing content, or discovering new things, this new feature is designed to make your experience even better.",
      likes: 20,
      comments: 10,
    },
    {
      id: 2,
      username: "@JohnDoe",
      userAvatar: "/avatar-placeholder.png",
      timeAgo: "3 hours ago",
      title: "New Announcement",
      content:
        "Just launched our <em>newest product</em>! Check out the details on our website.",
      likes: 15,
      comments: 5,
    },
    {
      id: 3,
      username: "@SarahSmith",
      userAvatar: "/avatar-placeholder.png",
      timeAgo: "5 hours ago",
      title: "Community Update",
      content:
        "Thanks to everyone who participated in our recent survey. The <strong>results</strong> will help us improve our services.",
      likes: 30,
      comments: 12,
    },
    {
      id: 4,
      username: "@TechGuru",
      userAvatar: "/avatar-placeholder.png",
      timeAgo: "1 day ago",
      title: "Tech Tips",
      content:
        "Here's how to optimize your workflow: <ol><li>Plan your day</li><li>Use productivity tools</li><li>Take regular breaks</li></ol>",
      likes: 45,
      comments: 20,
    },
  ]);

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const handleUpdatePost = (postId, newContent) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, content: newContent } : post
      )
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Toaster position="top-right" richColors />
      <h1 className="text-2xl font-bold mb-6">My Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <MyFeed
            key={post.id}
            post={post}
            onDelete={handleDeletePost}
            onUpdate={handleUpdatePost}
          />
        ))}
      </div>
    </div>
  );
}
