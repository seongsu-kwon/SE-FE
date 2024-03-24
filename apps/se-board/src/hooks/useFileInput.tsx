import { Attachment } from "@types";
import React, { useCallback, useState } from "react";
import { useRecoilState } from "recoil";

import {
  useDeleteFileQuery,
  usePostFileQuery,
} from "@/react-query/hooks/useFileQuery";
import { modifyPostState, writePostState } from "@/store";

export const useFileInput = (
  isModified: boolean,
  beforeFiles: Attachment[]
) => {
  const [files, setFiles] = useState<Attachment[]>(beforeFiles);

  const [writePost, setWritePost] = useRecoilState(writePostState);
  const [modifyPost, setModifyPost] = useRecoilState(modifyPostState);

  const { mutate: postFileMutate, isLoading: isFileUploadLoading } =
    usePostFileQuery();
  const { mutate: deleteFileMutate, isLoading: isFileDeleteLoading } =
    useDeleteFileQuery();

  const setPostState = (data: Attachment[]) => {
    if (!isModified) {
      setWritePost({
        ...writePost,
        attachmentIds: [
          ...writePost.attachmentIds,
          ...data.map((file: Attachment) => file.fileMetaDataId),
        ],
      });
    } else {
      setModifyPost({
        ...modifyPost,
        attachmentIds: [
          ...modifyPost.attachmentIds,
          ...data.map((file: Attachment) => file.fileMetaDataId),
        ],
      });
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const formData = new FormData();

    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      formData.append("files", e.dataTransfer.files[i]);
    }

    postFileMutate(formData, {
      onSuccess(data) {
        setFiles((prev) => [...prev, ...data.fileMetaDataList]);

        setPostState(data.fileMetaDataList);
      },
    });

    e.dataTransfer.clearData();
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) return;

    const formData = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("files", e.target.files[i]);
    }

    postFileMutate(formData, {
      onSuccess(data) {
        setFiles((prev) => [...prev, ...data.fileMetaDataList]);

        setPostState(data.fileMetaDataList);
      },
    });
  };

  const handleRemove = (fileId: number): void => {
    deleteFileMutate(fileId, {
      onSuccess() {
        setFiles(files.filter((file) => file.fileMetaDataId !== fileId));

        if (!isModified) {
          setWritePost({
            ...writePost,
            attachmentIds: writePost.attachmentIds.filter(
              (id) => id !== fileId
            ),
          });
        } else {
          setModifyPost({
            ...modifyPost,
            attachmentIds: modifyPost.attachmentIds.filter(
              (id) => id !== fileId
            ),
          });
        }
      },
    });
  };

  return {
    files,
    handleDrop,
    handleDragOver,
    handleFileInput,
    handleRemove,
    isFileUploadLoading,
    isFileDeleteLoading,
  };
};
