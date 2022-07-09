import mongoose from "mongoose";

type HistoryType = {
    name: string,
    items: Array<{ id: string, amount: number }>,
    userId: string,
    status: string,
    createdAt: Date,
};

const HistorySchema = new mongoose.Schema<HistoryType>({
    name: {
        type: String,
        required: [true, 'Please provide a name for the shopping list'],
    },
    items: {
        type: [{
            id: { type: String, required: [true, 'Please provide the itemId'] , ref: 'Item' },
            amount: { type: Number, required: [true, 'Please provide the item amount'] }
        }],
        required: [true, 'Please provide the items for shopping list']
    },
    userId: {
        type: String,
        required: [true, 'Please provide the userId that owns this shopping list'],
        ref: 'User'
    },
    status: {
        type: String,
        required: [true, 'Please provide the status of the shopping list'],
        enum: ['completed', 'cancelled']
    },
    createdAt: {
        type: Date,
        default: new Date(),
        required: [true, 'Please provide a date']
    }
});

const History = mongoose.model<HistoryType>('History', HistorySchema);

export default History;