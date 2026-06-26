import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
} from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";

export function ProfileAvatar({ name, initials, size = "default" }) {
  const [avatar, setAvatar] = useState(null);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("profileAvatar");
      if (saved) setAvatar(saved);
    } catch (e) {
      /* ignore */
    }
  }, []);

  function onFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function save() {
    if (!preview) return setOpen(false);
    setAvatar(preview);
    try {
      localStorage.setItem("profileAvatar", preview);
    } catch (e) {
      /* ignore */
    }
    setPreview(null);
    setOpen(false);
  }

  function remove() {
    setAvatar(null);
    setPreview(null);
    try {
      localStorage.removeItem("profileAvatar");
    } catch (e) {}
    setOpen(false);
  }

  const initialsText =
    initials ||
    (name
      ? name
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase()
      : "?");

  return (
    <>
      <div onClick={() => setOpen(true)} style={{ cursor: "pointer" }}>
        <Avatar size={size}>
          {avatar ? (
            <AvatarImage src={avatar} alt={name} />
          ) : (
            <AvatarFallback>{initialsText}</AvatarFallback>
          )}
          <AvatarBadge>
            <Camera className="size-3" />
          </AvatarBadge>
        </Avatar>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Update profile picture</DialogTitle>
          <DialogDescription>
            Upload an image to use as your profile picture.
          </DialogDescription>

          <div className="mt-4 flex flex-col gap-3 items-center">
            <div className="w-36 h-36 rounded-full overflow-hidden bg-muted flex items-center justify-center">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : avatar ? (
                <img
                  src={avatar}
                  alt="current"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xl font-semibold">{initialsText}</span>
              )}
            </div>

            <Input type="file" onChange={onFile} />
          </div>

          <DialogFooter>
            <div className="flex items-center gap-2 w-full justify-between">
              <Button variant="outline" onClick={remove}>
                Remove
              </Button>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={save}>Save</Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProfileAvatar;
