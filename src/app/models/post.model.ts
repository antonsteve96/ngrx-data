export interface Post{
  id?: string;
  title: string;
  description: string
}

export const initialPost: Post = {
  id: "",
  title: "",
  description: ""
}
