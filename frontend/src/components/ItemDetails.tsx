import React, { useState, useRef, useEffect } from 'react';
import { MdArrowRightAlt, MdCreate, MdClear } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { increase, deleteItem, setCartItems } from '../features/cart/cartSlice';
import { toast } from 'react-toastify';
import axios, { AxiosResponse, AxiosError } from 'axios';
 
type Prop = {
    id: string,
    setItemDetailsViewMode: React.Dispatch<React.SetStateAction<boolean>>,
    itemDetailsEditMode: boolean,
    setItemDetailsEditMode: React.Dispatch<React.SetStateAction<boolean>>
}

const ItemDetails = ({ id, setItemDetailsViewMode, itemDetailsEditMode, setItemDetailsEditMode }: Prop): JSX.Element => {

    const item = useSelector((state: RootState) => state.cart.cartItems.find(item => item.id === id));
    
    const { cartItems } = useSelector((state: RootState) => state.cart);

    const user = useSelector((state: RootState) => state.user);

    const dispatch = useDispatch();

    const [formData, setFormData] = useState<{ name: string, category: string, image?: string, note?: string }>({ name: '', category: '', image: '', note: '' });

    const { name, category, image, note } = formData;

    const [isUserItem, setIsUserItem] = useState<boolean>(false);

    const categoryInputRef = useRef<HTMLDivElement>(null);
    const categoryOptionsRef = useRef<HTMLDivElement>(null);
    const clearBtnRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        
        setIsUserItem(false);

        setFormData({ name: item!.name, category: item!.category, image: item!.image, note: item!.note });
        
        user.items.forEach(itemId => {
            if (itemId === id) setIsUserItem(true);
        });

    }, [item]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prevFormData => ({ ...prevFormData, [e.target.name]: e.target.value }));
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (name === '' || category === '') {
            toast.error('Please fill in the name and category', { autoClose: 2000 });
            return;
        }

        try {
            const response: AxiosResponse = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/items/${user.id}/${id}`, { name, category, image: image !== '' ? image : undefined, note: note !== '' ? note : undefined }, { withCredentials: true });
            toast.success(response.data.message, { autoClose: 2000 });
            setFormData({ name: response.data.item.name, category: response.data.item.category, image: response.data.item.image ? response.data.item.image : undefined, note: response.data.item.note ? response.data.item.note : undefined });
            setItemDetailsEditMode(false);
            const newCartItems = cartItems.map(item => item.id === id ? { id: item.id, name: response.data.item.name, category: response.data.item.category, image: response.data.item.image ? response.data.item.image : undefined , note: response.data.item.note ? response.data.item.note : undefined, amount: item.amount } : item);
            dispatch(setCartItems(newCartItems));
        } catch (error: AxiosError | any) {
            toast.error(error.response.data.error, { autoClose: 2000 });
        }

    };

    document.addEventListener('click', (e: MouseEvent) => {
        if (categoryInputRef.current && categoryOptionsRef.current && clearBtnRef.current) {

            if (!categoryInputRef.current.contains(e.target as Node) && !categoryOptionsRef.current.contains(e.target as Node)) {
                categoryOptionsRef.current.style.visibility = 'hidden';
                clearBtnRef.current.style.visibility = 'hidden';
            } else {
                categoryOptionsRef.current.style.visibility = 'visible';
                clearBtnRef.current.style.visibility = 'visible';
            }

        }
    });

    return (
        <div className="item-details-session">
            {!itemDetailsEditMode ? (
                <div className='view-item-details-container'>
                    <div className="go-back-btn-container" onClick={() => setItemDetailsViewMode(false)}>
                        <div className="go-back-btn"><MdArrowRightAlt color='#F9A109' size='20px' style={{transform: 'rotate(180deg)'}} /></div>
                        <p>back</p>
                    </div>
                    <div className="item-details-content-container">
                        <img src={item?.image ? item?.image : 'https://via.placeholder.com/300'} alt='Item Image' />
                        <div className="name-container">
                            <h3>name</h3>
                            <p>{item?.name}</p>
                            {isUserItem ? <div className='edit-item-details-btn' key={id} onClick={() => setItemDetailsEditMode(true)}><MdCreate size='20px' color='#34333A' /></div> : null}
                        </div>
                        <div className="category-container">
                            <h3>category</h3>
                            <p>{item?.category}</p>
                        </div>
                        <div className="note-container">
                            <h3>note</h3>
                            <p>{item?.note}</p>
                        </div>
                    </div>
                    <div className="button-container">
                        {isUserItem ? (
                            <button className='delete-btn' onClick={() => {
                                dispatch(deleteItem(id));
                                setItemDetailsViewMode(false);
                            }}>delete</button>
                        ) : (
                            <button className='cancel-btn' onClick={() => {
                                setItemDetailsViewMode(false);
                            }}>cancel</button>
                        )}
                        <button className='add-to-list-btn' onClick={() => {
                            dispatch(increase(id));
                            setItemDetailsViewMode(false);
                        }} >Add to list</button>
                    </div>
                </div>
            ) : (
                <div className='edit-item-details-container'>
                    <h3>Edit item</h3>
                    <form onSubmit={onSubmit}>
                        <div className="inputs-container">
                            <div className="input-container name">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" id="name" placeholder='Enter a name' autoComplete='off' value={name} onChange={onChange} />
                            </div>
                            <div className="input-container note">
                                <label htmlFor="note">Note (optional)</label>
                                <textarea name="note" id="note" autoComplete='off' placeholder='Enter a note' value={note} onChange={onChange} ></textarea>
                            </div>
                            <div className="input-container image">
                                <label htmlFor="image">Image (optional)</label>
                                <input type="text" name="image" id="image" placeholder='Enter a url' autoComplete='off' value={image} onChange={onChange} />
                            </div>
                            <div className="input-container category">
                                <label htmlFor="category">Category</label>
                                <div className="category-input-box" ref={categoryInputRef} >
                                    <input type="text" name="category" id="category" placeholder='Enter a category' autoComplete='off' value={category} onChange={onChange} readOnly/>
                                    <div className="clear-btn" ref={clearBtnRef} onClick={() => setFormData(prevFormData => ({...prevFormData, category: ''}))} ><MdClear color='#828282' size='20px' /></div>
                                </div>
                                <div className="category-options-container" ref={categoryOptionsRef} >
                                    <div className="option-one" onClick={() => setFormData(prevFormData => ({...prevFormData, category: 'Fruit and Vegetables'}))}><p>Fruit and Vegetables</p></div>
                                    <div className="option-two" onClick={() => setFormData(prevFormData => ({...prevFormData, category: 'Meat'}))}><p>Meat</p></div>
                                    <div className="option-three" onClick={() => setFormData(prevFormData => ({...prevFormData, category: 'Fish and Seafood'}))}><p>Fish and Seafood</p></div>
                                    <div className="option-four" onClick={() => setFormData(prevFormData => ({...prevFormData, category: 'Dairy'}))}><p>Dairy</p></div>
                                    <div className="option-five" onClick={() => setFormData(prevFormData => ({...prevFormData, category: 'Bread and Bakery'}))}><p>Bread and Bakery</p></div>
                                    <div className="option-six" onClick={() => setFormData(prevFormData => ({...prevFormData, category: 'Frozen Foods'}))}><p>Frozen Foods</p></div>
                                    <div className="option-seven" onClick={() => setFormData(prevFormData => ({...prevFormData, category: 'Pasta, Rice and Cereal'}))}><p>Pasta, Rice and Cereal</p></div>
                                    <div className="option-eight" onClick={() => setFormData(prevFormData => ({...prevFormData, category: 'Cans and Jars'}))}><p>Cans and Jars</p></div>
                                    <div className="option-nine" onClick={() => setFormData(prevFormData => ({...prevFormData, category: 'Sauces'}))}><p>Sauces</p></div>
                                    <div className="option-ten" onClick={() => setFormData(prevFormData => ({...prevFormData, category: 'Snacks'}))}><p>Snacks</p></div>
                                    <div className="option-eleven" onClick={() => setFormData(prevFormData => ({...prevFormData, category: 'Beverages'}))}><p>Beverages</p></div>
                                    <div className="option-twenth" onClick={() => setFormData(prevFormData => ({...prevFormData, category: 'Household and Cleaning'}))}><p>Household and Cleaning</p></div>
                                    <div className="option-thirteen" onClick={() => setFormData(prevFormData => ({...prevFormData, category: 'Personal Care'}))}><p>Personal Care</p></div>
                                </div>
                            </div>
                        </div>
                        <div className="button-container">
                            <button className='cancel-btn' onClick={() => setItemDetailsEditMode(false)}>cancel</button>
                            <button className='save-btn' type='submit'>Save</button>
                        </div>
                    </form>
                </div>
            )}
            
        </div>
    );
};

export default ItemDetails;