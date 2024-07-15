import Book from "../model/Book.js";

class BookRepo {
  // Create a new book
  async createBookRepo(dto) {
    try {
      const newBook = new Book(dto);
      const createdBook = await newBook.save();
      if (createdBook) {
        return {
          success: true,
          message: "Book created.",
          data: createdBook.toObject()
        };
      }
      return {
        success: false,
        message: "Something went wrong.",
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  // Update a book
  async updateBooksRepo(dto) {
    try {
      const updatedBook = await Book.findOneAndUpdate(
        { _id: dto.bookId },
        dto,
        { new: true }
      );
      if (!updatedBook) {
        return {
          success: false,
          message: "Book not found or could not be updated!",
          data: null,
        };
      }
      return {
        success: true,
        message: "Book updated successfully!",
        data: updatedBook.toObject(),
      };
    } catch (error) {
      console.error("Update book error:", error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  // Get a book by name
  async getBookByName(dto) {
    try {
      const existingBook = await Book.findOne({ bookName: dto.bookName, isActive: true });
      return existingBook || null;
    } catch (error) {
      console.error("Error in getBookByName:", error);
      return null;
    }
  }

  // Get all books with pagination, sorting, and search
  async allBooksRepo(dto) {
    const { page, limit, sort, search, bookId } = dto;
    try {
      const query = {
        bookId: bookId,
        isActive: true,
      };
      if (search) {
        query.bookName = { $regex: search, $options: "i" };
      }

      let sortCriteria = {};
      if (sort == 1) {
        sortCriteria = { updatedAt: -1 };
      } else if (sort == 2) {
        sortCriteria = { updatedAt: 1 };
      } else {
        sortCriteria = { updatedAt: -1 };
      }

      const skip = (page - 1) * limit;
      const allBooks = await Book.find(query)
        .sort(sortCriteria)
        .skip(skip)
        .limit(limit)
        .lean();
      if (!allBooks.length) {  // Check if the array is empty
        return {
          success: false,
          message: "No book to fetch!",
          data: null,
        };
      }

      const processedBook = allBooks.map((book) => ({
        bookName: book.bookName,
      }));
      const totalCount = await Book.countDocuments(query);
      const totalPages = Math.ceil(totalCount / limit);
      return {
        success: true,
        message: "Books fetched successfully!",
        data: {
          books: processedBook,
          totalPages,
          totalCount,
        },
      };
    } catch (error) {
      console.error("Get all books error:", error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  // Delete a book
  async statusChangeRepo(id) {
    try {
      const updatedBook = await Book.findByIdAndUpdate(id, { isActive: false }, { new: true });
      if (!updatedBook) {
        return {
          success: false,
          message: "Book not found or could not be deleted!",
          data: null,
        };
      }
      return {
        success: true,
        message: "Book deleted successfully!",
        data: updatedBook.toObject(),
      };
    } catch (error) {
      console.error("Delete book error:", error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }
}

export default BookRepo;
