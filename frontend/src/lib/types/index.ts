export type User = {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  posts?: Post[];
};

export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  author?: User;
};

export type FetchReturnType = {
  success: boolean;
  data?: Post[] | Post;
  message?: string;
  token?: string;
};
