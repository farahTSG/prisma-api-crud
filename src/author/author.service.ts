import { StringLiteral } from "typescript";
import { db } from "../utils/db.server";
import { authorRouter } from "./author.router";

type Author = {
  id: number;
  firstName: string;
  lastName: string;
};
//Get list of all authors
export const listAuthors = async (): Promise<Author[]> => {
  return db.author.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
};
//Get single author by ID
export const getAuthor = async (id: number): Promise<Author | null> => {
  return db.author.findUnique({
    where: {
      id,
    },
  });
};

//Create new author
export const createAuthor = async (
  author: Omit<Author, "id">
): Promise<Author> => {
  const { firstName, lastName } = author;
  return db.author.create({
    data: {
      firstName,
      lastName,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
};

//Update Author Name
export const updateAuthor = async (
  author: Omit<Author, "id">,
  id: number
): Promise<Author> => {
  const { firstName, lastName } = author;
  return db.author.update({
    where: {
      id,
    },
    data: {
      firstName,
      lastName,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
};

//Delete Author based on ID
export const deleteAuthor = async (id: number): Promise<void> => {
  await db.author.delete({
    where: {
      id,
    },
  });
};
