import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Inventory from './Inventory';

import "./App.css";

const Main = () => {
    return(
    <main>
        <Switch>
            {/* <Route path='/meals' component={Reservation}/>
            <Route path='/listings' component={FoodListing}/> */}
            <Route path='/inventory' component={Inventory} />
        </Switch>
    </main>
    )
}

export default Main;