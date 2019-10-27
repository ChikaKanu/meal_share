import React, {Component} from 'react';
// import './App.css';
import './../../App.css'
import Header from "./Header";
import Meal from "./Meal";
import Axios from "axios";

const HOST = "http://localhost:80";

class Inventory extends Component {
    constructor(props){
        super(props);
        this.state={
            meals: []
        }
    }

    componentWillMount(){
        const url = HOST + '/api/inventory/meals';
        Axios.get(url).then(response =>{
            this.setState({meals: response.data});
            console.log(response.data);
            
        });
    }

    render(){
        const {meals} = this.state;

        console.log(meals);
        

        // const renderMeals = (meals.length === 0)?
        //         <p>{meals}</p> :
        //         meals.map((meal) => {<Meal {...meal}/>
        // });

        return(
            <div> 
            <Header />

            <div class="container">
                <a href="#/inventory/create-meal" class="btn btn-success pull-right">
                    <i class="glyphicon glyphicon=plus" /> Add New Item
                </a>

                <br />
                <br />

                <table class="table">
                    <thead>
                        <tr>
                            <th scope="cole">Name</th>
                            <th scope="col"> Price</th>
                            <th scope="col">Quantity on Hand</th>
                        </tr>
                    </thead>
                    {/* <tbody>{renderMeals}</tbody> */}
                </table>
            </div>
            </div>
        );
    }

}

export default Inventory;
