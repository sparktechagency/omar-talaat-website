"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const CommentsModal = ({
  postId,
  comments,
  currentUserId,
  onAddComment,
  onAddReply,
  open,
  onClose,
}) => {
  const [newComment, setNewComment] = useState("");
  const [replyTexts, setReplyTexts] = useState({});
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyingToReply, setReplyingToReply] = useState(null);

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(postId, newComment);
      setNewComment("");
    }
  };

  const handleAddReply = (commentId, parentReplyId = null) => {
    const replyText = replyTexts[`${commentId}-${parentReplyId || ""}`];
    if (replyText && replyText.trim()) {
      onAddReply(postId, commentId, replyText, parentReplyId);
      setReplyTexts({
        ...replyTexts,
        [`${commentId}-${parentReplyId || ""}`]: "",
      });
      setReplyingTo(null);
      setReplyingToReply(null);
    }
  };

  const toggleReply = (commentId, replyId = null) => {
    if (replyId) {
      setReplyingToReply(replyingToReply === replyId ? null : replyId);
      setReplyingTo(commentId);
    } else {
      setReplyingTo(replyingTo === commentId ? null : commentId);
      setReplyingToReply(null);
    }

    const key = `${commentId}-${replyId || ""}`;
    if (!replyTexts[key]) {
      setReplyTexts({ ...replyTexts, [key]: "" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-96 md:min-w-xl lg:min-w-3xl max-h-[60vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 text-sm p-2 border rounded "
          />
          <Button size="sm" onClick={handleAddComment} className="bg-button">
            Comment
          </Button>
        </div>

        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-t pt-3">
              <div className="flex items-start gap-2 mb-2">
                <Avatar className="h-8 w-8">
                  <img src={comment.user.avatar} alt={comment.user.name} />
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {comment.user.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {comment.timeAgo}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{comment.content}</p>
                  <button
                    onClick={() => toggleReply(comment.id)}
                    className="text-sm text-blue-500 mt-1"
                  >
                    {replyingTo === comment.id && !replyingToReply
                      ? "Cancel"
                      : "Reply"}
                  </button>
                </div>
              </div>

              {replyingTo === comment.id && !replyingToReply && (
                <div className="ml-10 mt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={replyTexts[`${comment.id}-`] || ""}
                    onChange={(e) =>
                      setReplyTexts({
                        ...replyTexts,
                        [`${comment.id}-`]: e.target.value,
                      })
                    }
                    placeholder="Write a reply..."
                    className="flex-1 text-sm p-2 border rounded"
                  />
                  <Button size="sm" onClick={() => handleAddReply(comment.id)}>
                    Reply
                  </Button>
                </div>
              )}

              {comment.replies.length > 0 && (
                <div className="ml-10 mt-2 space-y-3">
                  {comment.replies.map((reply) => (
                    <ReplyItem
                      key={reply.id}
                      reply={reply}
                      commentId={comment.id}
                      currentUserId={currentUserId}
                      replyingTo={replyingTo}
                      replyingToReply={replyingToReply}
                      replyTexts={replyTexts}
                      setReplyTexts={setReplyTexts}
                      toggleReply={toggleReply}
                      handleAddReply={handleAddReply}
                      depth={1}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

function ReplyItem({
  reply,
  commentId,
  currentUserId,
  replyingTo,
  replyingToReply,
  replyTexts,
  setReplyTexts,
  toggleReply,
  handleAddReply,
  depth = 1,
}) {
  const maxDepth = 5;
  const canReply = depth < maxDepth;

  return (
    <div
      className={`flex items-start gap-2 ${
        depth > 1 ? "border-l-2 border-gray-200 pl-2" : ""
      }`}
    >
      <Avatar className="h-6 w-6">
        <img src={reply.user.avatar} alt={reply.user.name} />
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{reply.user.name}</span>
          <span className="text-xs text-gray-500">{reply.timeAgo}</span>
        </div>
        <p className="text-sm mt-1">{reply.content}</p>

        {canReply && (
          <button
            onClick={() => toggleReply(commentId, reply.id)}
            className="text-sm text-blue-500 mt-1"
          >
            {replyingToReply === reply.id ? "Cancel" : "Reply"}
          </button>
        )}

        {replyingToReply === reply.id && (
          <div className="mt-2 flex items-center gap-2">
            <input
              type="text"
              value={replyTexts[`${commentId}-${reply.id}`] || ""}
              onChange={(e) =>
                setReplyTexts({
                  ...replyTexts,
                  [`${commentId}-${reply.id}`]: e.target.value,
                })
              }
              placeholder="Write a reply..."
              className="flex-1 text-sm p-2 border rounded"
            />
            <Button
              size="sm"
              onClick={() => handleAddReply(commentId, reply.id)}
            >
              Reply
            </Button>
          </div>
        )}

        {reply.replies && reply.replies.length > 0 && (
          <div className="mt-2 space-y-3">
            {reply.replies.map((nestedReply) => (
              <ReplyItem
                key={nestedReply.id}
                reply={nestedReply}
                commentId={commentId}
                currentUserId={currentUserId}
                replyingTo={replyingTo}
                replyingToReply={replyingToReply}
                replyTexts={replyTexts}
                setReplyTexts={setReplyTexts}
                toggleReply={toggleReply}
                handleAddReply={handleAddReply}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
