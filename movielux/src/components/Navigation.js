import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";

import svg from "../svg";

export default function Navigation({ orientation }) {
    const [isBurgerClicked, setIsBurgerClicked] = useState(false);

    return (
        <div>
            <ul className="nav">
                {orientation === 'portrait' &&
                    <li>
                        <div className="nav__burger" onClick={() => setIsBurgerClicked(!isBurgerClicked)}>
                            <div className={isBurgerClicked ? "nav__burger-bar clicked" : "nav__burger-bar"}></div>
                            <div className={isBurgerClicked ? "nav__burger-bar clicked" : "nav__burger-bar"}></div>
                            <div className={isBurgerClicked ? "nav__burger-bar clicked" : "nav__burger-bar"}></div>
                        </div>
                    </li>
                }

                <li onClick={() => setIsBurgerClicked(false)}>
                    {svg.home}
                    <NavLink to='/' className='nav__link'>Home</NavLink>
                </li>

                {orientation === 'landscape' && 
                    <li onClick={() => setIsBurgerClicked(false)}>
                        {svg.movie}
                        <NavLink to='/movies' className='nav__link'>Movies</NavLink>
                    </li>
                }
                {orientation === 'landscape' && 
                    <li onClick={() => setIsBurgerClicked(false)}>
                        {svg.tv}
                        <NavLink to='/tvs' className='nav__link'>TV Shows</NavLink>
                    </li>
                }
                {orientation === 'landscape' && 
                    <li onClick={() => setIsBurgerClicked(false)}>
                        {svg.later}
                        <NavLink to='/watch-later' className='nav__link'>Watch Later</NavLink>
                    </li>
                }

                <li onClick={() => setIsBurgerClicked(false)}>
                    {svg.random}
                    <NavLink to='/random' className='nav__link'>Random</NavLink>
                </li>
                <li onClick={() => setIsBurgerClicked(false)}>
                    {svg.search}
                   <NavLink to='/search' className='nav__link'>Search</NavLink>
                </li>
            </ul>

            {orientation === 'portrait' &&
                <div onClick={() => setIsBurgerClicked(false)} className={isBurgerClicked ? "nav__menu" : "nav__menu hidden"}>
                    <NavLink to='/movies' className='nav__link'>
                        {svg.movie}
                        Movies
                    </NavLink>
                    <NavLink to='/tvs' className='nav__link'>
                        {svg.tv}
                        TV Shows
                    </NavLink>
                    <NavLink to='/watch-later' className='nav__link'>
                        {svg.later}
                        Watch Later
                    </NavLink>
                </div>
            }

            <Outlet />
        </div>
    )
}