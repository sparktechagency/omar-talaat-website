"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HeartIcon, MessageSquare } from "lucide-react";
import { CommentsModal } from "./CommentsModal";

const PostDisplay = ({
  posts,
  currentUserId = "yourusername",
  onPostsUpdate,
}) => {
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const alreadyLiked = post.likedBy.includes(currentUserId);
        if (alreadyLiked) {
          return {
            ...post,
            likes: post.likes - 1,
            likedBy: post.likedBy.filter((id) => id !== currentUserId),
          };
        } else {
          return {
            ...post,
            likes: post.likes + 1,
            likedBy: [...post.likedBy, currentUserId],
          };
        }
      }
      return post;
    });
    onPostsUpdate(updatedPosts);
  };

  const addComment = (postId, commentText) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const newComment = {
          id: Date.now(),
          user: {
            name: "@" + currentUserId,
            avatar: "https://i.ibb.co.com/8gh3mqPR/Ellipse-48-1.jpg",
          },
          content: commentText,
          timeAgo: "just now",
          replies: [],
        };
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    });
    onPostsUpdate(updatedPosts);
  };

  const addReply = (postId, commentId, replyText, parentReplyId = null) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = post.comments.map((comment) => {
          if (comment.id === commentId) {
            const newReply = {
              id: Date.now(),
              user: {
                name: "@" + currentUserId,
                avatar: "https://i.ibb.co.com/8gh3mqPR/Ellipse-48-1.jpg",
              },
              content: replyText,
              timeAgo: "just now",
              replies: [],
            };

            if (parentReplyId) {
              const updatedReplies = addNestedReply(
                comment.replies,
                parentReplyId,
                newReply
              );
              return { ...comment, replies: updatedReplies };
            } else {
              return { ...comment, replies: [...comment.replies, newReply] };
            }
          }
          return comment;
        });
        return { ...post, comments: updatedComments };
      }
      return post;
    });
    onPostsUpdate(updatedPosts);
  };

  const addNestedReply = (replies, parentId, newReply) => {
    return replies.map((reply) => {
      if (reply.id === parentId) {
        return {
          ...reply,
          replies: [...reply.replies, newReply],
        };
      } else if (reply.replies && reply.replies.length > 0) {
        return {
          ...reply,
          replies: addNestedReply(reply.replies, parentId, newReply),
        };
      }
      return reply;
    });
  };

  const selectedPost = posts.find((post) => post.id === selectedPostId);

  return (
    <div className="mb-8 mt-16 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {posts.map((post) => (
          <Card key={post.id} className="p-4">
            <div className="flex items-center mb-3">
              <Avatar className="h-12 w-12 mr-2">
                <img src={post.user.avatar} alt="User" />
              </Avatar>
              <div className="flex flex-col gap-2">
                <span className="text- font-bold">{post.user.name}</span>
                <span className="text-xs text-gray-500 ml-2">
                  {post.timeAgo} ago
                </span>
              </div>
            </div>
            <div
              className="text- mb-3 max-w-2xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <div className="flex items-center space-x-10">
              <button
                className="flex items-center text-xl"
                onClick={() => handleLike(post.id)}
              >
                <HeartIcon
                  className={`h-8 w-8 mr-1 ${
                    post.likedBy.includes(currentUserId)
                      ? "text-white fill-red-500"
                      : "text-red-500 "
                  }`}
                />
                {post.likes}
              </button>
              <button
                className="flex items-center text-xl"
                onClick={() => setSelectedPostId(post.id)}
              >
                <MessageSquare className="h-6 w-6 mr-1" />
                {post.comments.length}
              </button>
            </div>
          </Card>
        ))}
      </div>

      {selectedPostId && (
        <CommentsModal
          postId={selectedPostId}
          comments={selectedPost?.comments || []}
          currentUserId={currentUserId}
          onAddComment={addComment}
          onAddReply={addReply}
          open={!!selectedPostId}
          onClose={() => setSelectedPostId(null)}
        />
      )}
    </div>
  );
};

export default PostDisplay;
