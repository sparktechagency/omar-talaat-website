"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { MoreVertical, Heart, MessageCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { toast } from "sonner";

// Dynamically import Jodit editor to avoid SSR issues
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

export default function MyFeed({ post, onDelete, onUpdate }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedContent, setEditedContent] = useState(post?.content || "");
  const [isProcessing, setIsProcessing] = useState(false); // Track if an action is in progress

  // Handle Delete Action
  const handleDelete = () => {
    if (isProcessing) return; // Prevent further actions if already processing
    setIsProcessing(true); // Mark as processing
    if (onDelete && typeof onDelete === "function") {
      onDelete(post.id);
      toast.success("Post deleted successfully!", { position: "top-right" }); // Toast only appears once
    }
    setIsDeleteDialogOpen(false);
    setIsProcessing(false); // Reset processing state after action
  };

  // Handle Update Action
  const handleUpdate = () => {
    if (isProcessing) return; // Prevent further actions if already processing
    setIsProcessing(true); // Mark as processing
    if (onUpdate && typeof onUpdate === "function") {
      onUpdate(post.id, editedContent);
      toast.success("Post updated successfully!", { position: "top-right" }); // Toast only appears once
    }
    setIsEditDialogOpen(false);
    setIsProcessing(false); // Reset processing state after action
  };

  // Parse HTML content for display
  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  return (
    <Card className="w-full max-w-md mb-4">
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-0">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post?.userAvatar} alt={post?.username} />
            <AvatarFallback>{post?.username?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{post?.username}</p>
            <p className="text-xs text-gray-500">{post?.timeAgo}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsDeleteDialogOpen(true)}
              className="text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="p-4">
        <h2 className="font-bold text-lg mb-2">{post?.title}</h2>
        {/* Use dangerouslySetInnerHTML to render HTML content */}
        <div
          className="text-sm"
          dangerouslySetInnerHTML={createMarkup(post?.content)}
        />
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
          <span>{post?.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <MessageCircle className="h-4 w-4" />
          <span>{post?.comments}</span>
        </Button>
      </CardFooter>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this post? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isProcessing} // Disable delete button while processing
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Post Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <JoditEditor
              value={editedContent}
              config={{
                readonly: false,
                height: 300,
                toolbar: true,
                // Preserve HTML formatting
                askBeforePasteHTML: false,
                askBeforePasteFromWord: false,
                defaultActionOnPaste: "insert_clear_html",
              }}
              onChange={(newContent) => setEditedContent(newContent)}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              disabled={isProcessing} // Disable cancel button while processing
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleUpdate}
              disabled={isProcessing} // Disable save button while processing
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
