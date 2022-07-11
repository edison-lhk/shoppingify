import React, { useState, useEffect, useRef } from 'react';
import Wine from "../icons/wine.svg";
import { MdCreate, MdClear } from "react-icons/md";
import CartItemGroup from './CartItemGroup';
import ShoppingCart from '../icons/shopping-cart.svg';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { CartItems, getCartItems, setCartItems } from '../features/cart/cartSlice';
import { toast } from 'react-toastify';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { updateHistoryStatus } from '../features/history/historySlice';
import Loading from './Loading';

type Prop = {
    historyDetailsId?: string,
    setHistoryDetailsViewMode?: React.Dispatch<React.SetStateAction<boolean>>,
    historyDetailsEditMode?: boolean,
    setHistoryDetailsEditMode?: React.Dispatch<React.SetStateAction<boolean>>
}

const ShoppingList = ({ historyDetailsId, setHistoryDetailsViewMode, historyDetailsEditMode, setHistoryDetailsEditMode }: Prop) => {
    const { cartItems, amount, isLoading } = useSelector((state: RootState) => state.cart);
    console.log(amount);
    const user = useSelector((state: RootState) => state.user);
    const history = useSelector((state: RootState) => state.history.shoppingLists.find(shoppingList => shoppingList.id === historyDetailsId));

    const dispatch = useDispatch<AppDispatch>();

    const [fruitAndVegetables, setfruitAndVegetables] = useState<CartItems>([]);
    const [meat, setMeat] = useState<CartItems>([]);
    const [fishAndSeafood, setFishAndSeafood] = useState<CartItems>([]);
    const [dairy, setDairy] = useState<CartItems>([]);
    const [breadAndBakery, setBreadAndBakery] = useState<CartItems>([]);
    const [frozenFoods, setFrozenFoods] = useState<CartItems>([]);
    const [pastaAndRiceAndCereal, setPastaAndRiceAndCereal] = useState<CartItems>([]);
    const [cansAndJars, setCansAndJars] = useState<CartItems>([]);
    const [sauces, setSauces] = useState<CartItems>([]);
    const [snacks, setSnacks] = useState<CartItems>([]);
    const [beverages, setBeverages] = useState<CartItems>([]);
    const [householdAndCleaning, setHouseholdAndCleaning] = useState<CartItems>([]);
    const [personalCare, setPersonalCare] = useState<CartItems>([]);

    const [addNewItemMode, setAddNewItemMode] = useState<boolean>(false);

    const [formData, setFormData] = useState<{name: string, note?: string, image?: string, category: string}>({ name: '', note: '', image: '', category: '' });

    const { name, note, image, category } = formData;

    const [shoppingListName, setShoppingListName] = useState<string>('');

    const [historyItemCategories, setHistoryItemCategories] = useState<string[]>([]);

    const [openModalMode, setOpenModalMode] = useState<boolean>(false);

    const shoppingListRef = useRef<HTMLDivElement>(null);
    const categoryInputRef = useRef<HTMLDivElement>(null);
    const clearBtnRef = useRef<HTMLDivElement>(null);
    const categoryOptionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        setfruitAndVegetables(cartItems.filter(item => item.category === 'Fruit and Vegetables' && item.amount > 0));
        setMeat(cartItems.filter(item => item.category === 'Meat' && item.amount > 0));
        setFishAndSeafood(cartItems.filter(item => item.category === 'Fish and Seafood' && item.amount > 0));
        setDairy(cartItems.filter(item => item.category === 'Dairy' && item.amount > 0));
        setBreadAndBakery(cartItems.filter(item => item.category === 'Bread and Bakery' && item.amount > 0));
        setFrozenFoods(cartItems.filter(item => item.category === 'Frozen Foods' && item.amount > 0));
        setPastaAndRiceAndCereal(cartItems.filter(item => item.category === 'Pasta, Rice and Cereal' && item.amount > 0));
        setCansAndJars(cartItems.filter(item => item.category === 'Cans and Jars' && item.amount > 0));
        setSauces(cartItems.filter(item => item.category === 'Sauces' && item.amount > 0));
        setSnacks(cartItems.filter(item => item.category === 'Snacks' && item.amount > 0));
        setBeverages(cartItems.filter(item => item.category === 'Beverages' && item.amount > 0));
        setHouseholdAndCleaning(cartItems.filter(item => item.category === 'Household and Cleaning' && item.amount > 0));
        setPersonalCare(cartItems.filter(item => item.category === 'Personal Care' && item.amount > 0));
    }, [cartItems]);

    useEffect(() => {
        if (addNewItemMode) {
            if (shoppingListRef.current) {
                shoppingListRef.current.style.backgroundColor = '#FAFAFE';
            }
        } else {
            if (shoppingListRef.current) {
                shoppingListRef.current.style.backgroundColor = '#FFF0DE';
            }
        }
    }, [addNewItemMode]);

    useEffect(() => {
        if (amount === 0) {
            setShoppingListName('');
        }
    }, [amount]);

    useEffect(() => {
        if (history) {
            setHistoryItemCategories(Array.from(new Set(history.items.map(item => item.category))));
        }
    }, [history]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prevFormData => ({...prevFormData, [e.target.name]: e.target.value}));
    }

    const onSubmitFormData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (name === '' || category === '') {
            toast.error("Please fill in name and category", { autoClose: 2000 });
            return;
        }
        
        try {
            const response: AxiosResponse = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/items/${user.id}`, { name, category, image: image !== '' ? image : undefined, note: note !== '' ? note : undefined }, { withCredentials: true });
            toast.success(response.data.message, { autoClose: 2000 });
            setFormData({ name: '', note: '', image: '', category: '' });
            setAddNewItemMode(false);
            dispatch(setCartItems([...cartItems, { ...response.data.item, amount: 0 }]));
        } catch (error: AxiosError | any) {
            toast.error(error.response.data.error, { autoClose: 2000 });
        }
    };

    const onSubmitShoppingList = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (shoppingListName === '') {
            toast.error('Please provide a name for the shopping list', { autoClose: 2000 });
            return;
        }

        const shoppingList = cartItems.filter(item => item.amount > 0).map(item => ({ id: item.id, amount: item.amount }));

        console.log(shoppingList);
        
        try {
            const response: AxiosResponse = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/history`, { name: shoppingListName, items: shoppingList, userId: user.id }, { withCredentials: true });
            toast.success(response.data.message, { autoClose: 2000 });
            setShoppingListName('');
            dispatch(getCartItems()); 
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
        <div className='shopping-list-section' ref={shoppingListRef} >
            {!addNewItemMode ? (
                <>
                    <div className="shopping-list-container" style={amount > 0? {overflowY: 'scroll', marginBottom: '40px', height: '80vh'} : {overflowY: 'hidden', marginBottom: '0', height: '85vh'}}>
                        <div className="add-item-box">
                            <div className="add-item-logo">
                                <img src={Wine} alt="Wine"/>
                            </div>
                            <div className="add-item-description">
                                <p>Didn’t find what you need?</p>
                                <button onClick={() => setAddNewItemMode(true)}>Add item</button>
                            </div>
                        </div>
                        {!historyDetailsEditMode ? amount > 0 ? (
                            <div className="cart-item-groups-container">
                                <header>
                                    <h2>Shopping List</h2>
                                    <div className='edit-list-btn'><MdCreate size="20px" color='#C1C1C4' /></div>
                                </header>
                                <div className="cart-item-groups">
                                    {isLoading ? <Loading border='5px' size='40px' color='#C1C1C4' /> : (
                                        <>
                                            {fruitAndVegetables.length > 0 ? <CartItemGroup category='Fruit and Vegetables' items={fruitAndVegetables} historyDetailsEditMode={historyDetailsEditMode || false} /> : null}
                                            {meat.length > 0 ? <CartItemGroup category="Meat" items={meat} historyDetailsEditMode={historyDetailsEditMode || false} /> : null}
                                            {fishAndSeafood.length > 0 ? <CartItemGroup category="Fish and Seafood" items={fishAndSeafood} historyDetailsEditMode={historyDetailsEditMode || false} /> : null}
                                            {dairy.length > 0 ? <CartItemGroup category="Dairy" items={dairy} historyDetailsEditMode={historyDetailsEditMode || false} /> : null}
                                            {breadAndBakery.length > 0 ? <CartItemGroup category='Bread and Bakery' items={breadAndBakery} historyDetailsEditMode={historyDetailsEditMode || false} /> : null}
                                            {frozenFoods.length > 0 ? <CartItemGroup category='Frozen Foods' items={frozenFoods} historyDetailsEditMode={historyDetailsEditMode || false} /> : null}
                                            {pastaAndRiceAndCereal.length > 0 ? <CartItemGroup category='Pasta, Rice and Cereal' items={pastaAndRiceAndCereal} historyDetailsEditMode={historyDetailsEditMode || false} /> : null}
                                            {cansAndJars.length > 0 ? <CartItemGroup category='Cans and Jars' items={cansAndJars} historyDetailsEditMode={historyDetailsEditMode || false} /> : null}
                                            {sauces.length > 0 ? <CartItemGroup category="Sauces" items={sauces} historyDetailsEditMode={historyDetailsEditMode || false} /> : null}
                                            {snacks.length > 0 ? <CartItemGroup category='Snacks' items={snacks} historyDetailsEditMode={historyDetailsEditMode || false} /> : null}
                                            {beverages.length > 0 ? <CartItemGroup category="Beverages" items={beverages} historyDetailsEditMode={historyDetailsEditMode || false} /> : null}
                                            {householdAndCleaning.length > 0 ? <CartItemGroup category='Household and Cleaning' items={householdAndCleaning} historyDetailsEditMode={historyDetailsEditMode || false} /> : null}
                                            {personalCare.length > 0 ? <CartItemGroup category='Personal Care' items={personalCare} historyDetailsEditMode={historyDetailsEditMode || false} /> : null}
                                        </>
                                    ) }
                                </div>
                            </div>
                        ) : (
                            <div className='no-cart-item-container'>
                                {isLoading ? <Loading border='5px' size='40px' color='#C1C1C4' /> : (
                                    <>
                                        <h3>No items</h3>
                                        <img src={ShoppingCart} alt="Shopping Cart" />
                                    </>
                                ) }
                            </div>
                        ) : (
                            <div className="cart-item-groups-container">
                                <header>
                                    <h2>{history?.name}</h2>
                                    <div className='edit-list-btn'><MdCreate size="20px" color='#C1C1C4' /></div>
                                </header>
                                <div className="cart-item-groups">
                                    {historyItemCategories.map(historyItemCategory => <CartItemGroup key={historyItemCategory} category={historyItemCategory} items={history?.items.filter(item => item.category === historyItemCategory) || []} historyDetailsEditMode={historyDetailsEditMode || false} />)}
                                </div>
                            </div>
                        )}
                    </div>
                    {!historyDetailsEditMode ? (
                        <div className="save-list-form-container">
                            <form onSubmit={onSubmitShoppingList}>
                                {amount > 0 ? (
                                    <div className="enter-list-name-bar">
                                        <input type="text" name="name" id="name" placeholder='Enter a name' autoComplete='off' value={shoppingListName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShoppingListName(e.target.value)} />
                                        <button type='submit'>Save</button>
                                    </div>
                                ) : (
                                    <div className="enter-list-name-bar disabled">
                                        <input type="text" name="name" id="name" placeholder='Enter a name' autoComplete='off' value={shoppingListName} disabled />
                                        <button type='submit' disabled >Save</button>
                                    </div>
                                )}
                            </form>
                        </div>
                    ): (
                        <>
                            <div className="button-container">
                                <button className='cancel-btn' onClick={() => setOpenModalMode(true)}>cancel</button>
                                <button className='complete-btn' type='submit' onClick={() => {
                                    dispatch(updateHistoryStatus({ historyId: historyDetailsId || '', status: 'completed' }));
                                    if (setHistoryDetailsViewMode) setHistoryDetailsViewMode(false);
                                    if (setHistoryDetailsEditMode) setHistoryDetailsEditMode(false);
                                }}>Complete</button>
                            </div>
                            {openModalMode ? (
                                <div className="modal-container">
                                    <div className="modal-box">
                                        <p className='description'>Are you sure that you want to cancel this list?</p>
                                        <div className="cancel-btn"><MdClear color='#828282' size='20px' onClick={() => setOpenModalMode(false)} /></div>
                                        <div className="button-container">
                                            <button className='cancel-btn' onClick={() => setOpenModalMode(false)} >cancel</button>
                                            <button className="confirm-btn" onClick={() => {
                                                setOpenModalMode(false);
                                                dispatch(updateHistoryStatus({ historyId: historyDetailsId || '', status: 'cancelled' }));
                                                if (setHistoryDetailsViewMode) setHistoryDetailsViewMode(false);
                                                if (setHistoryDetailsEditMode) setHistoryDetailsEditMode(false);
                                            }} >Yes</button>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </>
                    )}
                </>
            ) : (
                <div className="add-item-form-container">
                    <h3>Add a new item</h3>
                    <form onSubmit={onSubmitFormData}>
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
                            <button className='cancel-btn' onClick={() => setAddNewItemMode(false)}>cancel</button>
                            <button className='save-btn' type='submit'>Save</button>
                        </div>
                    </form>
                </div>
            ) }
        </div>
    );
};

export default ShoppingList;