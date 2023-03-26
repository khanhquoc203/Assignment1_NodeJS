import joi from 'joi';
import Product from '../models/product'
import dotenv from 'dotenv'

dotenv.config();

const productSchema = joi.object({
    name: joi.string().required("Khong duoc de trong ten"),
    price: joi.number().required("Khong duoc de trong gia"),
    description: joi.string()
})

export const getAll = async function (req, res) {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            return res.json({
                message: "Khong co san pham nao"
            })
        }
        res.json(products)
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}

export const get = async function (req, res) {
    try {
        const products = await findById({ _id: req.params.id })
        if (!products) {
            return res.json({
                message: "Khong co san pham"
            })
        }
        res.json(products)
    } catch (error) {
        res.status(400).json({
            message: error
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
        return res.json({
            message: "Them thanh cong",
            data: product
        })
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}

export const update = async function (req, res) {
    try {
        const product = await Product.updateOne({ _id: req.params.id }, req.body);
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
        res.status(400).json({
            message: error
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
        res.status(400).json({
            message: error
        })
    }
}