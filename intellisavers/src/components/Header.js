import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
    <div className='text-center'>
        <h1>
            <a href="/#/">Intellisavers</a>
        </h1>

        <ul className="nav-menu">
            <li className="lead">
                <Link to="/meals">Meals</Link>
            </li>
            <li className="lead">
                <Link to="/transactions">Transactions</Link>
            </li>
            <li className="lead">
                <Link to="/livecart">Cart</Link>
            </li>
        </ul>
    </div>
}

export default Header;