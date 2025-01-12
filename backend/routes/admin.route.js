import express from "express";
import {
  deleteABook,
  getAllBooks,
  getAllUsers,
} from "../controller/admin.controller.js";

import {
  authentication,
  authorization,
} from "../controller/auth.controller.js";

const router = express.Router();

router
  .route("/getAllUsers")
  .get(authentication, authorization("admin"), getAllUsers);
router
  .route("/getAllBooks")
  .get(authentication, authorization("admin"), getAllBooks);
router
  .route("/deleteABook/:bookId")
  .delete(authentication, authorization("admin"), deleteABook);

export default router;
