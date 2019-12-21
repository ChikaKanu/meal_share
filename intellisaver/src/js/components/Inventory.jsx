import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import Meal from "./Meal";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const HOST = "http://localhost:80";

class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      meals: [],
      mealFormModal: false,
      name: "",
      snackMessage: "",
      quantity: "",
      price: ""
    };
    this.handleNewMeal = this.handleNewMeal.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleSnackbar = this.handleSnackbar.bind(this);
  }
  componentWillMount() {
    var url = HOST + `/api/inventory/meals`;
    axios.get(url).then(response => {
      this.setState({ meals: response.data });
    });
  }
  handleNewMeal = e => {
    e.preventDefault();
    this.setState({ mealFormModal: false }); 
    const newMeal = {
      name: this.state.name,
      quantity: this.state.quantity,
      price: this.state.price
    };

    axios
      .post(HOST + `/api/inventory/meal`, newMeal)
      .then(
        response =>
          this.setState({ snackMessage: "New Meal Is Now Added To Your Meal Stock!" }),
        this.handleSnackbar()
      )
      .catch(err => {
        console.log(err),
          this.setState({ snackMessage: "Failed to add new Meal. Do try again" }),
          this.handleSnackbar();
      });
  };
  handleEditMeal = (editMeal) => {
    axios
      .put(HOST + `/api/inventory/meal`, editMeal)
      .then(response => {
        this.setState({ snackMessage: "Meal Update Successful!" });
        this.handleSnackbar();
        return true;
      })
      .catch(err => {
        console.log(err);
        this.setState({ snackMessage: "Meal Update Failed! Check Meal & Try Again" }),
          this.handleSnackbar();
        return false;
      });
  };

  handleName = e => {
    this.setState({ name: e.target.value });
  };
  handlePrice = e => {
    this.setState({ price: e.target.value });
  };
  handleQuantity = e => {
    this.setState({ quantity: e.target.value });
  };
  handleSnackbar = () => {
    const bar = document.getElementById("snackbar");
    bar.className = "show";
    setTimeout(function() {
      bar.className = bar.className.replace("show", "");
    }, 3000);
  };

  render() {
    let { meals, snackMessage } = this.state;

    const renderMeals = () => {
      if (meals.length === 0) {
        return <p>{meals}</p>;
      } else {
        return meals.map(meal => (
          <Meal {...meal} onEditMeal={this.handleEditMeal} />
        ));
      }
    };

    return (
      <div>
        <Header />

        <div class="container">
          <a
            class="btn btn-success pull-right"
            onClick={() => this.setState({ mealFormModal: true })}
          >
            <i class="glyphicon glyphicon-plus" /> Add New Meal
          </a>
          <br />
          <br />

          <table class="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th />
              </tr>
            </thead>
            <tbody>{renderMeals()}</tbody>
          </table>
        </div>

        <Modal show={this.state.mealFormModal}>
          <Modal.Header>
            <Modal.Title>Add Meal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form class="form-horizontal" name="newProductForm">
              <div class="form-group">
                <label class="col-md-4 control-label" for="barcode">
                  Barcode
                </label>
                <div class="col-md-4">
                  <input
                    id="barcode"
                    name="barcode"
                    placeholder="Barcode"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="col-md-4 control-label" for="name">
                  Name
                </label>
                <div class="col-md-4">
                  <input
                    name="name"
                    placeholder="Name"
                    class="form-control"
                    onChange={this.handleName}
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="col-md-4 control-label" for="price">
                  Price
                </label>
                <div class="col-md-4">
                  <input
                    name="price"
                    placeholder="Price"
                    class="form-control"
                    onChange={this.handlePrice}
                    type="number"
                    step="any"
                    min="0"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="col-md-4 control-label" for="quantity">
                  Quantity
                </label>
                <div class="col-md-4">
                  <input
                    name="quantity"
                    placeholder="Quantity"
                    onChange={this.handleQuantity}
                    class="form-control"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="col-md-4 control-label" for="image">
                  Upload Image
                </label>
                <div class="col-md-4">
                  <input type="file" name="image" />
                </div>
              </div>
              <br /> <br /> <br />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ mealFormModal: false })}>
              Close
            </Button>
            <Button onClick={this.handleNewMeal}>Submit</Button>
          </Modal.Footer>
        </Modal>
        <div id="snackbar">{snackMessage}</div>
      </div>
    );
  }
}

export default Inventory;