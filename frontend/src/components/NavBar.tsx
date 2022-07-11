import React, { useEffect, useRef } from "react";
import { useLocation, Link  } from "react-router-dom";
import Logo from "../icons/logo.svg";
import { MdFormatListBulleted, MdReplay, MdInsertChartOutlined, MdOutlineShoppingCart, MdPowerSettingsNew } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { logoutUser } from "../features/user/userSlice";

const NavBar = (): JSX.Element => {
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();

    const path = location.pathname.split('/')[location.pathname.split('/').length - 1];

    const itemsRef = useRef<HTMLDivElement>(null);
    const historyRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const logoutRef = useRef<HTMLDivElement>(null);

    const { amount } = useSelector((state: RootState) => state.cart);
     
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

    return (
      <nav>
          <img src={Logo} alt="Shoppingify Logo" />
          <div className="nav-btn-container">
              <div className="nav-btn items" ref={itemsRef} ><Link to='/dashboard/items'><MdFormatListBulleted size="23px" color="#454545" /></Link></div>
              <div className="nav-btn history" ref={historyRef} ><Link to='/dashboard/history'><MdReplay size="23px" color="#454545" /></Link></div>
              <div className="nav-btn stats" ref={statsRef} ><Link to='/dashboard/statistics'><MdInsertChartOutlined size="23px" color="#454545" /></Link></div>
              <div className="nav-btn logout" ref={logoutRef} onClick={() => {
                localStorage.clear();
                logoutRef.current?.classList.add('select');
                itemsRef.current?.classList.remove('select');
                historyRef.current?.classList.remove('select');
                statsRef.current?.classList.remove('select');
                dispatch(logoutUser());
              }} ><MdPowerSettingsNew size="23px" color="#454545" /></div>
          </div>
          <div className="shopping-list-btn">
            <MdOutlineShoppingCart size="23px" color="#FFFFFF" />
            <div className="item-amount">{amount}</div>
          </div>
      </nav>
    );
};

export default NavBar;