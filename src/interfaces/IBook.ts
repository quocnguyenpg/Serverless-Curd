export default interface IBook {
  id: string;
  name: string;
  description: string;
  author: string;
  origin: string;
  createdAt: number;
  updateAt: number;
}

export interface ICreateBookInput {
  name: string;
  description: string;
  author: string;
  origin: string;
}

export interface IUpdateBookInput {
  name?: string;
  description?: string;
  author?: string;
  origin?: string;
}

export interface IBookQuery {
  name?: string;
  description?: string;
  author?: string;
  origin?: string;
}