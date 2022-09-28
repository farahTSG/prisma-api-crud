import { db } from "../src/utils/db.server";

type Author = {
  firstName: String;
  lastName: String;
};

type Book = {
  title: string;
  isFiction: boolean;
  datePublished: Date;
};

async function seed() {
  await Promise.all(
    getAuthors().map((author) => {
      return db.author.create({
        data: {
          firstName: author.firstName,
          lastName: author.lastName,
        },
      });
    })
  );
  const author = await db.author.findFirst({
    where: {
      firstName: "Mary",
    },
  });

  await Promise.all(
    getBooks().map((book) => {
      const { title, isFiction, datePublished } = book;
      return db.book.create({
        data: {
          title,
          isFiction,
          datePublished,
          authorId: author!.id,
        },
      });
    })
  );
}
seed();

function getAuthors(): Array<Author> {
  return [
    {
      firstName: "John",
      lastName: "Doe",
    },
    {
      firstName: "William",
      lastName: "Shakespeare",
    },
    {
      firstName: "Mary",
      lastName: "Jane",
    },
  ];
}
function getBooks(): Array<Book> {
  return [
    {
      title: "Jane Eyre",
      isFiction: false,
      datePublished: new Date(),
    },
    {
      title: "Oliver Twist",
      isFiction: true,
      datePublished: new Date(),
    },
    {
      title: "Black Beauty",
      isFiction: false,
      datePublished: new Date(),
    },
  ];
}
