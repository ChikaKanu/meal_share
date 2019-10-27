import React from 'react';
// import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import {makeRoutes} from '';

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);


// ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();