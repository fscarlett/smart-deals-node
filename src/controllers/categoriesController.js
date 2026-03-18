import Category from '../models/categoryModel.js'

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { category_name, category_slug, description, isActive, img_url } =
      req.body

    if (!category_name || !category_slug) {
      return res.status(400).json({
        success: false,
        message: 'Please provide category_name and category_slug',
      })
    }

    const existing = await Category.findOne({ category_slug })
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'A category with that slug already exists',
      })
    }

    const newCategory = new Category({
      category_name,
      category_slug,
      description,
      isActive,
      img_url,
    })

    const savedCategory = await newCategory.save()

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: savedCategory,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating category',
      error: error.message,
    })
  }
}

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const { isActive } = req.query

    let filter = {}

    if (isActive !== undefined) {
      filter.isActive = isActive === 'true'
    }

    const categories = await Category.find(filter).sort({ category_name: 1 })

    res.status(200).json({
      success: true,
      data: categories,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message,
    })
  }
}

// Get a single category by ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params

    const category = await Category.findById(id)

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      })
    }

    res.status(200).json({
      success: true,
      data: category,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching category',
      error: error.message,
    })
  }
}

// Update a category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params
    const { category_name, category_slug, description, isActive, img_url } =
      req.body

    const category = await Category.findById(id)

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      })
    }

    if (category_slug && category_slug !== category.category_slug) {
      const existing = await Category.findOne({ category_slug })
      if (existing) {
        return res.status(409).json({
          success: false,
          message: 'A category with that slug already exists',
        })
      }
    }

    if (category_name) category.category_name = category_name
    if (category_slug) category.category_slug = category_slug
    if (description) category.description = description
    if (isActive !== undefined) category.isActive = isActive
    if (img_url) category.img_url = img_url

    const updatedCategory = await category.save()

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: updatedCategory,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating category',
      error: error.message,
    })
  }
}

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params

    const category = await Category.findByIdAndDelete(id)

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
      data: category,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting category',
      error: error.message,
    })
  }
}
