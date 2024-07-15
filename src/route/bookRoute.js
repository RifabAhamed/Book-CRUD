import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validationMiddleware.js";
import { bookValidationSchema ,updatebookValidationSchema} from "../validation/validationSchema.js";
import BookController from "../controller/BookController.js";

const router = express.Router();

const bookController = new BookController();

router.post("/create-book", validate(bookValidationSchema), bookController.createBookController);
router.patch("/update-book",validate(updatebookValidationSchema), bookController.updateBookController);
router.put("/update-book",validate(updatebookValidationSchema), bookController.updateBookController);
router.get("/get-all-books", bookController.getAllBookPaginatedController);
router.patch("/status-change-book", bookController.statusChangeController);
router.get("/book-name-check", bookController.bookNameCheckController);

export default router;

// HTTP Methods and Status Codes Reference

// GET --> Retrieve data
// POST --> Save data
// PUT --> Update entire entity
// PATCH --> Update partial entity
// DELETE --> Delete data

// Status Codes
// 201 - Created
// 200 - Success
// 400 - Bad Request
// 401 - Unauthorized
// 403 - Forbidden
// 404 - Not Found
// 500 - Internal Server Error
