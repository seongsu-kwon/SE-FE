import React, { useCallback, useState } from "react";

export const useFileInput = (onFileDrop: (file: Array<File>) => void) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const newFiles: Array<File> = [...files];
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      newFiles.push(e.dataTransfer.files[i]);
    }

    setFiles(newFiles);
    onFileDrop(newFiles);
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
  };

  const handleRemove = (index: number): void => {
    console.log(index);
    const newFiles: Array<File> = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return {
    files,
    handleDrop,
    handleDragOver,
    handleFileInput,
    handleRemove,
  };
};
