import React from "react";
import { CartItems } from "../features/cart/cartSlice";
import ItemCard from "./ItemCard";

type Prop = {
    category: string,
    items: CartItems,
    setItemDetailsViewMode: React.Dispatch<React.SetStateAction<boolean>>,
    setItemDetailsId: React.Dispatch<React.SetStateAction<string>>,
    setItemDetailsEditMode: React.Dispatch<React.SetStateAction<boolean>>,
}

const ItemGroup = ({ category, items, setItemDetailsViewMode, setItemDetailsId, setItemDetailsEditMode }: Prop): JSX.Element => {

    return (
        <div className="item-group">
            <h3 className="item-category">{category}</h3>
            <div className="item-list">
                {items.map(item => <ItemCard key={item.id} id={item.id} name={item.name} setItemDetailsViewMode={setItemDetailsViewMode} setItemDetailsId={setItemDetailsId} setItemDetailsEditMode={setItemDetailsEditMode} />)}
            </div>
        </div>
    );
};

export default ItemGroup;