import React, { useCallback, useState } from "react";
import { useRecoilState } from "recoil";

import { modifyPostState } from "@/store";

export const useFileInput = (
  onFileDrop: (file: Array<File>) => void,
  beforeFiles?: File[]
) => {
  const [files, setFiles] = useState<File[]>(beforeFiles || []);
  const [modifyPost, setModifyPost] = useRecoilState(modifyPostState);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const newFiles: Array<File> = [...files];

    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      newFiles.push(e.dataTransfer.files[i]);
    }

    setFiles(newFiles);
    onFileDrop(newFiles);
    setModifyPost({
      ...modifyPost,
      attachments: modifyPost.attachments.concat(newFiles),
    });
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) return;

    const newFiles: Array<File> = [...files];

    for (let i = 0; i < e.target.files.length; i++) {
      newFiles.push(e.target.files[i]);
    }

    onFileDrop(newFiles);
    setFiles(newFiles);
    setModifyPost({
      ...modifyPost,
      attachments: modifyPost.attachments.concat(newFiles),
    });
  };

  const handleRemove = (index: number): void => {
    const newFiles: Array<File> = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    setModifyPost({
      ...modifyPost,
      attachments: newFiles,
    });
  };

  return {
    files,
    handleDrop,
    handleDragOver,
    handleFileInput,
    handleRemove,
  };
};
