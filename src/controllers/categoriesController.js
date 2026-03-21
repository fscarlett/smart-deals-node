import Category from '../models/categoryModel.js'

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { category_display_name, category_slug, category_order, isActive } =
      req.body

    if (!category_display_name || !category_slug) {
      return res.status(400).json({
        success: false,
        message: 'Please provide category_display_name and category_slug',
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
      category_display_name,
      category_slug,
      category_order,
      isActive,
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

    const categories = await Category.find(filter).sort({
      category_display_name: 1,
    })

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
    const { category_display_name, category_slug, category_order, isActive } =
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

    if (category_display_name)
      category.category_display_name = category_display_name
    if (category_slug) category.category_slug = category_slug
    if (category_order !== undefined) category.category_order = category_order
    if (isActive !== undefined) category.isActive = isActive

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
