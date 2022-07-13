import React, { useEffect, useRef, useState } from "react";
import { useLocation, Link  } from "react-router-dom";
import Logo from "../icons/logo.svg";
import { MdFormatListBulleted, MdReplay, MdInsertChartOutlined, MdOutlineShoppingCart, MdPowerSettingsNew } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { logoutUser } from "../features/user/userSlice";
import { getCartItems } from "../features/cart/cartSlice";

type Prop = {
    shoppingListRef: React.RefObject<HTMLDivElement>
}

const NavBar = ({ shoppingListRef }: Prop): JSX.Element => {
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();

    const path = location.pathname.split('/')[location.pathname.split('/').length - 1];

    const itemsRef = useRef<HTMLDivElement>(null);
    const historyRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const logoutRef = useRef<HTMLDivElement>(null);

    const { amount } = useSelector((state: RootState) => state.cart);

    const [openShoppingListMode, setOpenShoppingListMode] = useState<boolean>(false);
     
    useEffect(() => {

      switch (path) {
          case 'items':
              itemsRef.current?.classList.add('select');
              historyRef.current?.classList.remove('select');
              statsRef.current?.classList.remove('select');
              break;
          case 'history':
              itemsRef.current?.classList.remove('select');
              historyRef.current?.classList.add('select');
              statsRef.current?.classList.remove('select');
              break;
          case 'statistics':
              itemsRef.current?.classList.remove('select');
              historyRef.current?.classList.remove('select');
              statsRef.current?.classList.add('select');
              break;
          default:
            return;
      }

    }, [path]);

    useEffect(() => {

        if (window.innerWidth <= 735 && shoppingListRef.current) {

            if (openShoppingListMode) {
                shoppingListRef.current.style.transform = 'translateX(0)';
            } else {
                shoppingListRef.current.style.transform = 'translateX(100%)';
            }
            
        }

        if (window.innerWidth > 735 && shoppingListRef.current) {
            if (openShoppingListMode) {
                shoppingListRef.current.style.transform = 'translateX(0)';
            }
        }

    }, [openShoppingListMode]);

    window.addEventListener('resize', () => {
        if (window.innerWidth > 735) {
            setOpenShoppingListMode(true);
        } else {
            setOpenShoppingListMode(false);
        }
    })

    return (
      <nav>
          <img src={Logo} alt="Shoppingify Logo" />
          <div className="nav-btn-section">
              <div className="nav-btn-container items" ref={itemsRef} >
                  <Link to='/dashboard/items'><div className="nav-btn items"><MdFormatListBulleted size="23px" color="#454545" /></div></Link>
                  <div className="tooltip items">items</div>
              </div>
              <div className="nav-btn-container history" ref={historyRef} >
                  <Link to='/dashboard/history'><div className="nav-btn history"><MdReplay size="23px" color="#454545" /></div></Link>
                  <div className="tooltip history">history</div>
                </div>
              <div className="nav-btn-container stats" ref={statsRef} >
                  <Link to='/dashboard/statistics'><div className="nav-btn stats"><MdInsertChartOutlined size="23px" color="#454545" /></div></Link>
                  <div className="tooltip stats">statistics</div>
              </div>
              <div className="nav-btn-container logout" ref={logoutRef} onClick={() => {
                logoutRef.current?.classList.add('select');
                itemsRef.current?.classList.remove('select');
                historyRef.current?.classList.remove('select');
                statsRef.current?.classList.remove('select');
                localStorage.clear();
                dispatch(logoutUser());
                dispatch(getCartItems());
              }} >
                  <div className="nav-btn logout"><MdPowerSettingsNew size="23px" color="#454545" /></div>
                  <div className="tooltip logout">logout</div>
              </div>
          </div>
          <div className="shopping-list-btn" onClick={() => {
              if (openShoppingListMode) {
                setOpenShoppingListMode(false);
              } else {
                setOpenShoppingListMode(true);
              }
          }}>
            <MdOutlineShoppingCart size="23px" color="#FFFFFF" />
            <div className="item-amount">{amount}</div>
          </div>
      </nav>
    );
};

export default NavBar;