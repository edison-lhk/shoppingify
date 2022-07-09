import mongoose from "mongoose";

type ItemType = {
    name: string,
    category: string,
    image?: string,
    note?: string,
    default: boolean
};

const ItemSchema = new mongoose.Schema<ItemType>({
    name: {
        type: String,
        required: [true, 'Please provide an item name'],
        unique: true
    },
    category: {
        type: String,
        required: [true, 'Please provide an item category'],
        enum: ['Fruit and Vegetables', 'Meat', 'Fish and Seafood', 'Dairy', 'Bread and Bakery', 'Frozen Foods', 'Pasta, Rice and Cereal', 'Cans and Jars', 'Sauces', 'Snacks', 'Beverages', 'Household and Cleaning', 'Personal Care']
    },
    image: {
        type: String,
        unique: true
    },
    note: {
        type: String
    },
    default: {
        type: Boolean,
        required: [true, 'Please provide whether the item is default or not']
    }
});

const Item = mongoose.model<ItemType>('Item', ItemSchema);

export default Item;