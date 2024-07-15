import BookRepo from "../repository/BookRepo.js";

class BookService {
  constructor() {
    this.repository = new BookRepo();
  }

  async createBookService(dto) {
    try {
      const existingEntity = await this.repository.getBookByName(dto);
      if (existingEntity) {
        return {
          success: false,
          message: "Book already exists.",
          data: null,
        };
      }
      const response = await this.repository.createBookRepo(dto);
      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  async bookNameCheckService(dto) {
    try {
      const existingEntity = await this.repository.getBookByName(dto);
      if (existingEntity) {
        return {
          success: true,
          message: "Book exists.",
          data: existingEntity,
        };
      }
      return {
        success: true,
        message: "Book does not exist.",
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

  async allBookService(dto) {
    try {
      const response = await this.repository.allBooksRepo(dto);
      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  async updateBookService(dto) {
    try {
      const response = await this.repository.updateBooksRepo(dto);
      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  async statusChangeService(id) {
    try {
      const response = await this.repository.statusChangeRepo(id);
      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }
}

export default BookService;
