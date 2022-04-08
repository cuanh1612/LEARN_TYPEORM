import express from "express";
import { Category } from "../entities/Category";

const router = express.Router();

router.post("/api/category", async (req, res) => {
  const { name, parentCategory } = req.body;

  //Create new Category
  const newCategory = Category.create({
    name,
  });

  //Check exist parent
  if (parentCategory) {
    const existingParent: Category = await Category.findOne(parentCategory);

    if (!existingParent)
      return res.status(400).json({
        status: "error",
        msg: "Parent category not found",
      });

    newCategory.parent = existingParent;
  }

  //Save new category
  const createdCategory = await newCategory.save();

  return res.status(200).json({
    status: "success",
    msg: "Create new category successfully",
    category: createdCategory,
  });
});

export { router as createCategoryRouter };
