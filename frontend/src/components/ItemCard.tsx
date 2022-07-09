import React, { useRef } from 'react';
import { MdAdd } from "react-icons/md";
import { useDispatch } from "react-redux";
import { increase } from "../features/cart/cartSlice";

type Prop = {
  id: string,
  name: string,
  setItemDetailsViewMode: React.Dispatch<React.SetStateAction<boolean>>,
  setItemDetailsId: React.Dispatch<React.SetStateAction<string>>,
  setItemDetailsEditMode: React.Dispatch<React.SetStateAction<boolean>>
}

const ItemCard = ({ id, name, setItemDetailsViewMode, setItemDetailsId, setItemDetailsEditMode }: Prop): JSX.Element => {
    const dispatch = useDispatch();

    const itemCardRef = useRef<HTMLDivElement>(null);
    const addToListBtn = useRef<HTMLDivElement>(null);

    document.addEventListener('click', (e: MouseEvent) => {
        if (itemCardRef.current && addToListBtn.current) {
            if (itemCardRef.current.contains(e.target as Node)) {
                if (!addToListBtn.current.contains(e.target as Node)) {
                    setItemDetailsViewMode(true);
                    setItemDetailsId(id);
                    setItemDetailsEditMode(false);
                }
            }
        }
    });

    return (
      <div className="item-card-container" ref={itemCardRef}>
          <p className='item-name'>{name}</p>
          <div className="add-to-list-btn" ref={addToListBtn} onClick={() => {
            dispatch(increase(id));
            setItemDetailsViewMode(false);
        }}><MdAdd size='20px' color='#C1C1C4' /></div>
      </div>
    );
};

export default ItemCard;