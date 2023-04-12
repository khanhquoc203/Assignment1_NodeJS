import joi from 'joi';
import Category from '../models/category'
import dotenv from 'dotenv'
import Product from '../models/product';

dotenv.config();

const categorySchema = joi.object({
    name: joi.string().required(),
})

export const getAll = async function (req, res) {
    try {
        const categories = await Category.find();
        if (categories.length === 0) {
            return res.json({
                message: "Không có danh mục nào"
            })
        }
        res.json(categories)
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const get = async function (req, res) {
    try {
        const category = await Category.findById({ _id: req.params.id }).populate("products")
        if (!category) {
            return res.json({
                message: "Không có danh mục"
            })
        }
        const products = await Product.find({ categoryId: req.params.id })
        // return res.json({ ...category.toObject(), products });
        return res.json(category)
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const create = async function (req, res) {
    try {
        const { error } = categorySchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details.map((err) => err.message),
            })
        }
        const product = await Category.create(req.body);
        if (!product) {
            return res.json({
                message: "Không thêm được danh mục"
            })
        }
        return res.json({
            message: "Thêm danh mục thành công",
            data: product
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const update = async function (req, res) {
    try {
        const category = await Category.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (!category) {
            return res.json({
                message: "Cập nhật danh mục không thành công",
                category,
            })
        }
        res.json({
            message: "Cập nhật thành công"
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const remove = async function (req, res) {
    try {
        await Category.findByIdAndDelete({ _id: req.params.id });
        return res.json({
            message: 'Xóa thành công'
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}