import joi from 'joi';
import Product from '../models/product'
import dotenv from 'dotenv'
import Category from '../models/category';

dotenv.config();

const productSchema = joi.object({
    name: joi.string().required("Khong duoc de trong ten"),
    price: joi.number().required("Khong duoc de trong gia"),
    description: joi.string(),
    categoryId: joi.string().required()
})

export const getAll = async function (req, res) {
    const { _sort = "createAt", _order = 'asc', _limit = 10, _page = 1 } = req.query;
    const options = {
        page: _page,
        limit: _limit,
        sort: {
            [_sort]: _order === "desc" ? -1 : 1,
        }
    }
    try {
        // const products = await Product.find();
        const products = await Product.paginate({}, options);
        if (products.length === 0) {
            return res.json({
                message: "Khong co san pham nao"
            })
        }
        res.json(products)
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const get = async function (req, res) {
    try {
        const products = await findById({ _id: req.params.id }).populate("categoryId")
        if (!products) {
            return res.json({
                message: "Khong co san pham"
            })
        }
        res.json(products)
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const create = async function (req, res) {
    try {
        const { error } = productSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            })
        }
        const product = await Product.create(req.body);
        if (!product) {
            return res.json({
                message: "Khong them san pham"
            })
        }
        await Category.findByIdAndUpdate(product.categoryId, {
            $addToSet: {
                products: product._id
            }
        })
        return res.json({
            message: "Them thanh cong",
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
        const product = await Product.findByIdAndUpdate({ _id: req.params.id }, req.body);
        if (!product) {
            return res.json({
                message: "Khong cap nhap san pham",
                data: product
            })
        }
        res.json({
            message: "Cap nhat thanh cong"
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const remove = async function (req, res) {
    try {
        await Product.findByIdAndDelete({ _id: req.params.id });
        return res.json({
            message: 'Xoa thanh cong'
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}