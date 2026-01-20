import {upload} from '../middlewares/multer.middleware.js'
import { Router } from 'express'
import { addCategory , deleteCategory, getAllCategories, getCategoryBySlug, updateCategory, updateCategoryImage} from '../controllers/category.controllers.js';
const router = Router();

// all  routes are private

//those routes can access by admin only
router.route("/add-category").post(upload.single("image"),addCategory);
router.route("/get-all-categories").get(getAllCategories);
router.route("/:slug").get(getCategoryBySlug);
router.route("/:id").delete(deleteCategory);
router.route("/:id").patch(updateCategory);
router.route("/:id").put(upload.single("image"),updateCategoryImage);
export default router;