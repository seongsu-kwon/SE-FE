import { Box } from "@chakra-ui/react";
import { Comment } from "@types";
import { useEffect, useState } from "react";

import {
  CommentBody,
  CommentHeader,
  CommentInput,
  ShowMoreCommentButton,
} from "@/components/comment";
import { useGetCommentQuery } from "@/react-query/hooks";
import { openColors } from "@/styles";

const comments = {
  comments: {
    totalSize: 100, // 댓글 + 답글
    pagenationInfo: {
      commentSize: 75, // 댓글 총개수 (답글 제외)
      perPage: 25, // 한 페이지당 받을 댓글 개수
      currentPage: 1, // 현재 페이지
      lastPage: 3, // 마지막 페이지
    },
    data: [
      {
        comment_id: 123,
        author: {
          loginId: "m1234", //익명 사용자면, anonymous
          name: "min jong",
        },
        created_at: "2022-05-05-12:00:02",
        modified_at: "2022-05-06-12:00:01",
        contents: "hello comments",
        isEditable: true, // 작성자가 익명 사용자면 항상 true, 작성자가 로그인 사용자면, 글 수정/삭제 가능할 시, true
        sub_comments: [
          {
            comment_id: 4322,
            tag: 123, //댓글 태그가 가능하다
            author: {
              loginId: "j1111", //익명 사용자면, anonymous
              name: "jin woo",
            },
            created_at: "2022-05-08-12:12:32",
            modified_at: "2022-05-09-15:17:01",
            contents: "comments apply",
            isEditable: true, // 작성자가 익명 사용자면 항상 true, 작성자가 로그인 사용자면, 글 수정/삭제 가능할 시, true
          },
          {
            //삭제 됬을때 -> 수정필요 (원 댓글 작성자 데이터 추가 필요)
            comment_id: 4325,
            tag: 123, //댓글 태그가 가능하다
            author: {
              loginId: null, //익명 사용자면, anonymous
              name: "삭제된 사용자",
            },
            created_at: "2022-05-08-12:12:32",
            modified_at: "2022-05-09-15:17:01",
            contents: "삭제된 댓글 입니다.",
            isEditable: true, // 작성자가 익명 사용자면 항상 true, 작성자가 로그인 사용자면, 글 수정/삭제 가능할 시, true
          },
          {
            comment_id: 153,
            tag: 4322, // 대댓글 태그도 가능하다
            author: {
              loginId: "chung12312", //익명 사용자면, anonymous
              name: "chung yeop",
            },
            created_at: "2022-04-12-12:12:02",
            modified_at: "2022-05-01-12:45:01",
            contents: "sub comments apply",
            isEditable: true, // 작성자가 익명 사용자면 항상 true, 작성자가 로그인 사용자면, 글 수정/삭제 가능할 시, true
          },
        ],
      },
      {
        comment_id: 123,
        author: {
          loginId: "m1234", //익명 사용자면, anonymous
          name: "min jeong",
        },
        created_at: "2022-05-05-12:00:02",
        modified_at: "2022-05-06-12:00:01",
        contents: "hello comments",
        isEditable: true, // 작성자가 익명 사용자면 항상 true, 작성자가 로그인 사용자면, 글 수정/삭제 가능할 시, true
        sub_comments: [
          {
            comment_id: 4322,
            tag: 123, //댓글 태그가 가능하다
            author: {
              loginId: "j1111", //익명 사용자면, anonymous
              name: "jin woo",
            },
            created_at: "2022-05-08-12:12:32",
            modified_at: "2022-05-09-15:17:01",
            contents:
              "comments applycomments applycomments applycomments applycomments applycomments applycomments applycomments applycomments applycomments applycomments applycomments applycomments apply",
            isEditable: true, // 작성자가 익명 사용자면 항상 true, 작성자가 로그인 사용자면, 글 수정/삭제 가능할 시, true
          },
          {
            //삭제 됬을때 -> 수정필요 (원 댓글 작성자 데이터 추가 필요)
            comment_id: 4325,
            tag: 123, //댓글 태그가 가능하다
            author: {
              loginId: null, //익명 사용자면, anonymous
              name: "삭제된 사용자",
            },
            created_at: "2022-05-08-12:12:32",
            modified_at: "2022-05-09-15:17:01",
            contents: "삭제된 댓글 입니다.",
            isEditable: true, // 작성자가 익명 사용자면 항상 true, 작성자가 로그인 사용자면, 글 수정/삭제 가능할 시, true
          },
          {
            comment_id: 153,
            tag: 4322, // 대댓글 태그도 가능하다
            author: {
              loginId: "chung12312", //익명 사용자면, anonymous
              name: "chung yeop",
            },
            created_at: "2022-04-12-12:12:02",
            modified_at: "2022-05-01-12:45:01",
            contents: "sub comments apply",
            isEditable: true, // 작성자가 익명 사용자면 항상 true, 작성자가 로그인 사용자면, 글 수정/삭제 가능할 시, true
          },
        ],
      },
    ],
  },
};

interface CommentSectionProps {
  postId: string | undefined;
}

export const CommentSection = ({ postId }: CommentSectionProps) => {
  const { data, isLoading, isError } = useGetCommentQuery(postId, 1);
  const [commentData, setCommentData] = useState<Comment | undefined>(data);

  if (isLoading) {
    // 로딩중 화면 렌더링
  }

  if (isError) {
    // 에러 화면 렌더링
  }

  useEffect(() => {
    console.log(data);
  });

  const moreCommentsOnClick = () => {
    // 댓글 더보기 버튼 클릭 시
    if (commentData) {
      const newData = useGetCommentQuery(
        postId,
        commentData.pagenationInfo.currentPage + 1
      ).data; // comment에 data 추가 후 더보기 버튼 클릭 시 기존 데이터와 새로운 데이터 합치기 필요

      if (newData) {
        setCommentData({
          pagenationInfo: newData.pagenationInfo,
          data: [...commentData.data, ...newData.data],
        });
      }
    }
  };

  // TODO: comments -> commentData로 수정 필요
  return (
    <Box
      maxW="100%"
      mx="auto"
      borderBottom={`1px solid ${openColors.gray[3]}`}
      mb="100px"
      textAlign="center"
    >
      <CommentHeader commentTotalSize={comments.comments.totalSize} />
      <CommentInput />
      {comments.comments.data.map((comment) => (
        <CommentBody
          commentId={comment.comment_id}
          author={{
            userId: comment.author.loginId, // loginId로 수정 필요
            name: comment.author.name,
          }}
          createdAt={comment.created_at}
          modifiedAt={comment.modified_at}
          contents={comment.contents}
          isEditable={comment.isEditable}
          subComments={comment.sub_comments}
        />
      ))}
      {comments.comments.pagenationInfo.currentPage <
        comments.comments.pagenationInfo.lastPage && (
        <ShowMoreCommentButton onClick={moreCommentsOnClick} />
      )}
    </Box>
  );
};
