import { Box } from "@chakra-ui/react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { useState } from "react";
import { useRecoilState } from "recoil";

import { modifyPostState } from "@/store";

export const WritingEditor = ({ contents }: { contents?: string }) => {
  const [editorData, setEditorData] = useState<string>(contents || "");
  const [modifyPost, setMofifyPost] = useRecoilState(modifyPostState);
  //   const imgLink = "http://localhost:3000/images";

  //   const customUploaadAdapterPlugin = (loader: ) => {
  //     return {
  //       upload() {
  //         return new Promise((resolve, reject) => {
  //           const data = new FormData();
  //           loader.file.then((file: File) => {
  //             data.append("file", file);
  //             data.append("name", file.name);

  //             console.log({ file });

  //             resolve({
  //               default: `${imgLink}/${file.name}`,
  //             });
  //           });
  //         });
  //       },
  //     };
  //   };

  //   function uploadPlugin(editor) {
  //     editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
  //       return customUploaadAdapterPlugin(loader);
  //     };
  //   }

  const editorConfiguration = {
    fontSize: {
      options: [
        6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 24, 30, 32,
      ],
    },
  };

  return (
    <Box maxW="100%" m="0 auto">
      <CKEditor
        editor={Editor}
        config={editorConfiguration}
        onReady={(editor: any) => {
          editor.editing.view.change((writer: any) => {
            writer.setStyle(
              "height",
              "500px",
              editor.editing.view.document.getRoot()
            );
          });

          editor.setData(editorData);
        }}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          const match = data.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/i);
          const title = match ? match[1] : "";
          const body = data.replace(match && match[0], "");
          setEditorData(data);

          setMofifyPost({
            ...modifyPost,
            title: title,
            contents: body,
          });
        }}
      />
    </Box>
  );
};
