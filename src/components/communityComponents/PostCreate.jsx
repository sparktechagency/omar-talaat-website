// src/components/PostCreate.jsx
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { JoditEditor } from "./JoditTextEdito";

const PostCreate = ({ onPostCreate }) => {
  const [content, setContent] = useState("");

  const handlePost = () => {
    if (content.trim()) {
      const newPost = {
        id: Date.now(), // Use timestamp for unique ID
        user: {
          name: "@yourusername",
          avatar: "https://i.ibb.co.com/qHGmP2p/Ellipse-1.png",
        },
        timeAgo: "just now",
        content: content,
        likes: 0,
        likedBy: [], // Track who liked this post
        comments: [],
      };
      onPostCreate(newPost);
      setContent("");
    }
  };

  return (
    <div className="w-full mb-6">
      {/* Post creation area */}
      <Card className="p-4">
        <div className="text-xl font-semibold text-red">
          What's On Your Mind
        </div>
        <JoditEditor
          value={content}
          onChange={(newContent) => setContent(newContent)}
        />
        <div className="flex justify-end mt-">
          <Button
            size="sm"
            onClick={handlePost}
            className=" text-white rounded-full w-20 h-8 flex items-center bg-red justify-center "
          >
            Post
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PostCreate;
