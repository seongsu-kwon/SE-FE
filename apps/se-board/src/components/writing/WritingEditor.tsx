import { Box } from "@chakra-ui/react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";

export const WritingEditor = () => {
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
  return (
    <Box maxW="984px" m="0 auto 50px auto">
      <CKEditor
        editor={Editor}
        config={{
          fontSize: {
            options: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
          },
          width: "100px",
        }}
        onReady={(editor: any) => {
          editor.editing.view.change((writer: any) => {
            writer.setStyle(
              "height",
              "500px",
              editor.editing.view.document.getRoot()
            );
          });
        }}
      />
    </Box>
  );
};
