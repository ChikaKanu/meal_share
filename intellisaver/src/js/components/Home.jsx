import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Inventory from './js/component/Inventory';
import Pos from './js/component/Pos'
import Transaction from './js/component/Transaction';
import LiveCart from './js/component/LiveCart';

const Main = () => {
    return(
    <main>
        <Switch>
            <Route exact path='/' component={Pos} />
            <Route path='/transactions' component={Transaction} />
            <Route path='/inventory' component={Inventory} />
            <Route path='/livecart' component={LiveCart} />
        </Switch>
    </main>
    )
}

export default Main;