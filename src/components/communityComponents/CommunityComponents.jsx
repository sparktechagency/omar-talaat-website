"use client";

import { useState } from "react";
import PostCreate from "./PostCreate";
import PostDisplay from "./PostDisplay";
import Leaderboard from "./Leaderboard";

// Mock data for posts - now with likedBy array to track who liked the post
const initialPosts = [
  {
    id: 1,
    user: {
      name: "@johnsmith",
      avatar: "https://i.ibb.co.com/qHGmP2p/Ellipse-1.png",
    },
    timeAgo: "2h",
    content:
      "We're thrilled to introduce our latest update - [Feature Name]! Whether you're connecting with friends, sharing content, or discovering new things, this new feature is designed to make your experience even better.",
    likes: 12,
    likedBy: [],
    comments: [],
  },
  {
    id: 2,
    user: {
      name: "@johnsmith",
      avatar: "https://i.ibb.co.com/8gh3mqPR/Ellipse-48-1.jpg",
    },
    timeAgo: "3h",
    content:
      "We're thrilled to introduce our latest update - [Feature Name]! Whether you're connecting with friends, sharing content, or discovering new things, this new feature is designed to make your experience even better.",
    likes: 8,
    likedBy: [],
    comments: [],
  },
  {
    id: 3,
    user: {
      name: "@johnsmith",
      avatar: "https://i.ibb.co.com/qHGmP2p/Ellipse-1.png",
    },
    timeAgo: "4h",
    content:
      "We're thrilled to introduce our latest update - [Feature Name]! Whether you're connecting with friends, sharing content, or discovering new things, this new feature is designed to make your experience even better.",
    likes: 15,
    likedBy: [],
    comments: [],
  },
  {
    id: 4,
    user: {
      name: "@johnsmith",
      avatar: "https://i.ibb.co.com/qHGmP2p/Ellipse-1.png",
    },
    timeAgo: "5h",
    content:
      "We're thrilled to introduce our latest update - [Feature Name]! Whether you're connecting with friends, sharing content, or discovering new things, this new feature is designed to make your experience even better.",
    likes: 7,
    likedBy: [],
    comments: [],
  },
  {
    id: 5,
    user: {
      name: "@johnsmith",
      avatar: "https://i.ibb.co.com/8gh3mqPR/Ellipse-48-1.jpg",
    },
    timeAgo: "6h",
    content:
      "We're thrilled to introduce our latest update - [Feature Name]! Whether you're connecting with friends, sharing content, or discovering new things, this new feature is designed to make your experience even better.",
    likes: 20,
    likedBy: [],
    comments: [],
  },
  {
    id: 6,
    user: {
      name: "@johnsmith",
      avatar: "https://i.ibb.co.com/d4tpsSPj/Frame-2147227088-1.png",
    },
    timeAgo: "7h",
    content:
      "We're thrilled to introduce our latest update - [Feature Name]! Whether you're connecting with friends, sharing content, or discovering new things, this new feature is designed to make your experience even better.",
    likes: 9,
    likedBy: [],
    comments: [],
  },
];

// Mock leaderboard data
const leaderboardData = {
  streaks: [
    { rank: 1, user: "John", score: "7 days" },
    { rank: 2, user: "Sarah", score: "6 days" },
    { rank: 3, user: "Mark", score: "5 days" },
    { rank: 4, user: "Jenny", score: "4 days" },
    { rank: 5, user: "Robert", score: "3 days" },
  ],
  totalTime: [
    { rank: 1, user: "John", score: "42h 30m" },
    { rank: 2, user: "Sarah", score: "38h 15m" },
    { rank: 3, user: "Mark", score: "33h 20m" },
    { rank: 4, user: "Jenny", score: "29h 45m" },
    { rank: 5, user: "Robert", score: "25h 10m" },
  ],
  sessions: [
    { rank: 1, user: "John", score: "58 sessions" },
    { rank: 2, user: "Sarah", score: "47 sessions" },
    { rank: 3, user: "Mark", score: "42 sessions" },
    { rank: 4, user: "Jenny", score: "38 sessions" },
    { rank: 5, user: "Robert", score: "31 sessions" },
  ],
};

export default function CommunityComponents() {
  const [posts, setPosts] = useState(initialPosts);
  const currentUserId = "yourusername"; // This would normally come from auth

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostsUpdate = (updatedPosts) => {
    setPosts(updatedPosts);
  };

  return (
    <main className="flex min-h-screen flex-col items-center mt-6">
      <div className="">
        <PostCreate onPostCreate={handleNewPost} />

        <PostDisplay
          posts={posts}
          currentUserId={currentUserId}
          onPostsUpdate={handlePostsUpdate}
        />

        <Leaderboard leaderboardData={leaderboardData} />
      </div>
    </main>
  );
}
