export interface subComment {
  comment_id: number;
  tag: number;
  author: {
    user_id: string | null;
    name: string;
  };
  created_at: string;
  modified_at: string;
  contents: string;
  isEditable: boolean;
}
