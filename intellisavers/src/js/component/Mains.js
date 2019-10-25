import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Meals from './Meals';
import Pos from './Pos'
import Transactions from './Transactions';
import LiveCart from './LiveCart';

const Main = () => {
    <main>
        <Switch>
            <Route exact path='/' component={Pos} />
            <Route path='/transactions' component={Transactions} />
            <Route path='/meals' component={Meals} />
            <Route path='/livecart' component={LiveCart} />
        </Switch>
    </main>
}

export default Main;