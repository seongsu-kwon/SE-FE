import { Attachment } from "@types";
import React, { useCallback, useState } from "react";
import { useRecoilState } from "recoil";

import { modifyPostState } from "@/store";

export const useFileInput = (
  onFileDrop: (file: Array<File>) => void,
  beforeFiles?: Attachment[]
) => {
  // TODO: 받아온 File 처리 로직 필요
  const [files, setFiles] = useState<File[]>([]);
  const [modifyPost, setModifyPost] = useRecoilState(modifyPostState);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const newFiles: Array<File> = [...files];

    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      newFiles.push(e.dataTransfer.files[i]);
    }

    setFiles(newFiles);
    onFileDrop(newFiles);

    // TODO: 파일 서버 연동 처리 필요
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

    // TODO: 파일 서버 연동 처리 필요
  };

  const handleRemove = (index: number): void => {
    const newFiles: Array<File> = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);

    // TODO: 파일 삭제 연동 처리 필요
  };

  return {
    files,
    handleDrop,
    handleDragOver,
    handleFileInput,
    handleRemove,
  };
};
