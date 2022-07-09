import React, { useEffect, useState } from 'react';
import ItemGroup from './ItemGroup';
import { MdSearch } from "react-icons/md";
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { CartItems } from '../features/cart/cartSlice';
import ItemDetails from './ItemDetails';
import Loading from './Loading';

type Prop = {
  itemDetailsViewMode: boolean,
  setItemDetailsViewMode: React.Dispatch<React.SetStateAction<boolean>>
}

const ItemSection = ({ itemDetailsViewMode, setItemDetailsViewMode }: Prop): JSX.Element => {
  const { cartItems, isLoading } = useSelector((state: RootState) => state.cart);

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

  const [itemDetailsId, setItemDetailsId] = useState<string>('');
  const [itemDetailsEditMode, setItemDetailsEditMode] = useState<boolean>(false);

  useEffect(() => {
      setfruitAndVegetables(cartItems.filter(item => item.category === 'Fruit and Vegetables'));
      setMeat(cartItems.filter(item => item.category === 'Meat'));
      setFishAndSeafood(cartItems.filter(item => item.category === 'Fish and Seafood'));
      setDairy(cartItems.filter(item => item.category === 'Dairy'));
      setBreadAndBakery(cartItems.filter(item => item.category === 'Bread and Bakery'));
      setFrozenFoods(cartItems.filter(item => item.category === 'Frozen Foods'));
      setPastaAndRiceAndCereal(cartItems.filter(item => item.category === 'Pasta, Rice and Cereal'));
      setCansAndJars(cartItems.filter(item => item.category === 'Cans and Jars'));
      setSauces(cartItems.filter(item => item.category === 'Sauces'));
      setSnacks(cartItems.filter(item => item.category === 'Snacks'));
      setBeverages(cartItems.filter(item => item.category === 'Beverages'));
      setHouseholdAndCleaning(cartItems.filter(item => item.category === 'Household and Cleaning'));
      setPersonalCare(cartItems.filter(item => item.category === 'Personal Care'));
  }, [cartItems]);

  return (
      <div className="item-section">
          <div className="item-list-container">
              <header>
                  <h1><span>Shoppingify</span> allows you take your shopping list wherever you go</h1>
                  <div className="search-item-bar">
                      <div className="search-item-btn"><MdSearch size="22px" color='#34333A' /></div>
                      <input type="search" name="item_search" id="item_search" placeholder='search item' autoComplete='off' />
                  </div>
              </header>
              <section className='item-groups-container'>
                    {isLoading ? <Loading border='6px' size='50px' color='#C1C1C4' /> : (
                        <>
                            {fruitAndVegetables.length > 0 ? <ItemGroup category='Fruit and Vegetables' items={fruitAndVegetables} setItemDetailsViewMode={setItemDetailsViewMode} setItemDetailsId={setItemDetailsId} setItemDetailsEditMode={setItemDetailsEditMode} /> : null}
                            {meat.length > 0 ? <ItemGroup category='Meat' items={meat} setItemDetailsViewMode={setItemDetailsViewMode} setItemDetailsId={setItemDetailsId} setItemDetailsEditMode={setItemDetailsEditMode} /> : null}
                            {fishAndSeafood.length > 0 ? <ItemGroup category='Fish and Seafood' items={fishAndSeafood} setItemDetailsViewMode={setItemDetailsViewMode} setItemDetailsId={setItemDetailsId} setItemDetailsEditMode={setItemDetailsEditMode} /> : null}
                            {dairy.length > 0 ? <ItemGroup category='Dairy' items={dairy} setItemDetailsViewMode={setItemDetailsViewMode} setItemDetailsId={setItemDetailsId} setItemDetailsEditMode={setItemDetailsEditMode} /> : null}
                            {breadAndBakery.length > 0 ? <ItemGroup category='Bread and Bakery' items={breadAndBakery} setItemDetailsViewMode={setItemDetailsViewMode} setItemDetailsId={setItemDetailsId} setItemDetailsEditMode={setItemDetailsEditMode} /> : null}
                            {frozenFoods.length > 0 ? <ItemGroup category='Frozen Foods' items={frozenFoods} setItemDetailsViewMode={setItemDetailsViewMode} setItemDetailsId={setItemDetailsId} setItemDetailsEditMode={setItemDetailsEditMode} /> : null}
                            {pastaAndRiceAndCereal.length > 0 ? <ItemGroup category='Pasta, Rice and Cereal' items={pastaAndRiceAndCereal} setItemDetailsViewMode={setItemDetailsViewMode} setItemDetailsId={setItemDetailsId} setItemDetailsEditMode={setItemDetailsEditMode} /> : null}
                            {cansAndJars.length > 0 ? <ItemGroup category='Can and Jars' items={cansAndJars} setItemDetailsViewMode={setItemDetailsViewMode} setItemDetailsId={setItemDetailsId} setItemDetailsEditMode={setItemDetailsEditMode} /> : null}
                            {sauces.length > 0 ? <ItemGroup category='Sauces' items={sauces} setItemDetailsViewMode={setItemDetailsViewMode} setItemDetailsId={setItemDetailsId} setItemDetailsEditMode={setItemDetailsEditMode} /> : null}
                            {snacks.length > 0 ? <ItemGroup category='Snacks' items={snacks} setItemDetailsViewMode={setItemDetailsViewMode} setItemDetailsId={setItemDetailsId} setItemDetailsEditMode={setItemDetailsEditMode} /> : null}
                            {beverages.length > 0 ? <ItemGroup category='Beverages' items={beverages} setItemDetailsViewMode={setItemDetailsViewMode} setItemDetailsId={setItemDetailsId} setItemDetailsEditMode={setItemDetailsEditMode} /> : null}
                            {householdAndCleaning.length > 0 ? <ItemGroup category='Household and Cleaning' items={householdAndCleaning} setItemDetailsViewMode={setItemDetailsViewMode} setItemDetailsId={setItemDetailsId} setItemDetailsEditMode={setItemDetailsEditMode} /> : null}
                            {personalCare.length > 0 ? <ItemGroup category='Personal Care' items={personalCare} setItemDetailsViewMode={setItemDetailsViewMode} setItemDetailsId={setItemDetailsId} setItemDetailsEditMode={setItemDetailsEditMode} /> : null}
                        </>
                    ) }
              </section>
          </div>
          {itemDetailsViewMode ? <ItemDetails id={itemDetailsId} setItemDetailsViewMode={setItemDetailsViewMode} itemDetailsEditMode={itemDetailsEditMode} setItemDetailsEditMode={setItemDetailsEditMode} /> : null}
      </div>
  );
};

export default ItemSection;