import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            minLength: 3,
        },
        price: {
            type: Number,
        },
        image: {
            type: String,
        },
        categoryId: {
            type: mongoose.Types.ObjectId,
            ref: "Category",
        },
    },
    { timestamps: true, versionKey: false }
);
productSchema.plugin(mongoosePaginate)

export default mongoose.model('Product', productSchema)