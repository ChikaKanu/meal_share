import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Inventory from './Inventory';
import Pos from './Pos'
import Transaction from './Transaction';
import LiveCart from './LiveCart';

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