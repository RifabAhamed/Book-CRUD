import BookService from "../service/BookService.js";
import { errorResponse, successResponse } from "../util/responseUtil.js";

const bookService = new BookService();

class BookController {
  async createBookController(req, res, next) {
    try {
      const dto = req.body;
      const response = await bookService.createBookService(dto);
      if (response && response.success) {
        return successResponse(res, response.message, response.data);
      } else {
        return errorResponse(res, response.message, 500);
      }
    } catch (error) {
      next(error);
    }
  }
  async updateBookController(req, res, next) {
    const { bookId, bookName, author, price } = req.body;
    try {
      if (!bookName) {
        const errorMessage = "Book Name required!";
        return errorResponse(res, errorMessage, 400);
      }
      const response = await bookService.updateBookService({
        bookId,
        bookName,
        author,
        price,
      });
      if (response && response.success) {
        return successResponse(res, response.message, response.data);
      } else {
        return errorResponse(res, response.message, 500);
      }
    } catch (error) {
      next(error);
    }
  }

  async bookNameCheckController(req, res, next) {
    try {
      const dto = req.query;
      if (!dto.bookName) {
        const errorMessage = "Book name is required!";
        return errorResponse(res, errorMessage, 400);
      }
      const response = await bookService.bookNameCheckService(dto);
      if (response && response.success) {
        return successResponse(res, response.message, response.data);
      } else {
        return errorResponse(res, response.message, 500);
      }
    } catch (error) {
      next(error);
    }
  }

  async getAllBookPaginatedController(req, res, next) {
    const { page, limit, sort, search, bookId } = req.query;
    try {
      const parsedPage = parseInt(page, 10) || 1;
      const parsedLimit = parseInt(limit, 10) || 10;
      const response = await bookService.allBookService({
        page: parsedPage,
        limit: parsedLimit,
        sort,
        search,
        bookId,
      });
      if (response && response.success) {
        return successResponse(res, response.message, response.data);
      } else {
        return errorResponse(res, response.message, 500);
      }
    } catch (error) {
      next(error);
    }
  }

  async statusChangeController(req, res, next) {
    const { bookId, bookStatus } = req.body;
    try {
      // Check if email is provided
      if (!bookId) {
        const errorMessage = "Book ID required!";
        return errorResponse(res, errorMessage, 400);
      }
      const response = await bookService.statusChangeService(
        {
          _id: bookId,
          isActive: true,
        },
        {
          bookStatus: bookStatus,
        }
      );
      // Check if response is successful
      if (response && response.success) {
        return successResponse(res, response.message, response.data);
      } else {
        return errorResponse(res, response.message, 500);
      }
    } catch (error) {
      next(error);
    }
  }
}

export default BookController;
