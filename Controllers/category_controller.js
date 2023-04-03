import Category from "../Models/category_model.js";
import {
  getStandardError,
  getStandardResponse,
} from "../Utils/standard_response.js";

export const createCategory = async (req, res, next) => {
  try {
    if (req.role !== 0) {
      const category = new Category(req.body);
      category.save();
      return res
        .send(
          getStandardResponse(
            201,
            "Category created successfully",
            category,
            req
          )
        )
        .status(201);
    }
    return res
      .status(401)
      .send(getStandardError("Only Admin can create Category", 401, req));
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    return res
      .send(getStandardResponse(201, "All Categories", categories, req))
      .status(201);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    if (req.role !== 0) {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category)
        return res
          .status(404)
          .send(getStandardError("There is no such category", 404, req));
      return res
        .status(201)
        .send(getStandardResponse(201, "Category deleted", [], req));
    }
    return res
      .status(401)
      .send(getStandardError("Only Admin can delete Category", 401, req));
  } catch (error) {
    next(error);
  }
};
