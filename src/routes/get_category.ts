import express from "express";
import { Category } from "../entities/Category";
import { getManager } from "typeorm";

const router = express.Router();

router.get("/api/category/:categoryId", async (req, res) => {
  const { categoryId } = req.params;

  //Check exist category
  const existingCategory = await Category.findOne(categoryId);

  if(!existingCategory) return res.status(400).json({
      status: "error",
      msg: "Category does not exist"
  })

  //Get category tree

  const categoryTree = await getManager()
    .getTreeRepository(Category)
    .findDescendantsTree(existingCategory);

  return res.status(200).json({
    status: "success",
    msg: "Get category tree successfully",
    categoryTree
  });
});

export { router as getCategoryRouter };
