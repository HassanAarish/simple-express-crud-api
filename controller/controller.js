import books from "../util/data.js";

export const all = async (req, res) => {
  res.status(200).json({ message: "Here are all the books", books });
};

export const getOneBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const book = books.find((item) => item.id == bookId);

    if (book) {
      return res
        .status(200)
        .json({ message: "Here is the requested book: ", book });
    } else {
      return res
        .status(404)
        .json({ message: "NO book was found with the provided book ID." });
    }
  } catch (error) {
    console.error("Error while fetching book:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const addBook = async (req, res) => {
  const { title, author, finished } = req.body;

  let book = {
    id: books.length + 1,
    title: title,
    author: author,
    finished: finished !== undefined ? finished : false,
    createdAt: new Date(),
  };

  books.push(book);

  return res.status(201).json({ message: "The book have been added: ", book });
};

export const updateBook = async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    let book = books.find((item) => item.id === bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const { title, author, finished } = req.body;

    if (!title && !author && finished === undefined) {
      return res.status(400).json({
        message:
          "At least one field (title, author, finished) must be provided for update.",
      });
    }
    const updatedBook = {
      id: book.id,
      title: title !== undefined ? title : book.title,
      author: author !== undefined ? author : book.author,
      finished: finished !== undefined ? finished : book.finished,
      createdAt: book.createdAt,
    };

    const updatedBooks = books.map((item) =>
      item.id === bookId ? updatedBook : item
    );

    books.splice(0, books.length, ...updatedBooks);

    return res
      .status(204)
      .json({ message: "Book updated successfully: ", updatedBooks });
  } catch (error) {
    console.error("Error updating book:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    let bookIndex = books.findIndex((item) => item.id === bookId);

    if (bookIndex === -1) {
      return res.status(404).json({
        message: `Book not found in the data with the ID: ${bookId}`,
      });
    }
    books.splice(bookIndex, 1);

    return res.status(204).json({ message: "Book deleted successfully " });
  } catch (error) {
    console.error("Error deleting book:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
