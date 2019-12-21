import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
    return(
    <div className='text-center'>
        <h1>
            <a href="/#/">Intellisavers</a>
        </h1>

        <ul className="nav-menu">
            <li className="lead">
                <Link to="/inventory">Meals</Link>
            </li>
            <li className="lead">
                <Link to="/transactions">Transactions</Link>
            </li>
            <li className="lead">
                <Link to="/livecart">Cart</Link>
            </li>
            <li className="lead">
                <Link to="/account">Account</Link>

            </li>
        </ul>
    </div>
    )
}

export default Header;