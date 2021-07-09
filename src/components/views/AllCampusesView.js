import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

const deleteCampus = async (id) => {
  await axios
    .delete(`/api/campuses/${id}`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  window.location.replace(`/campuses`);
};

class AllCampusesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCampus: false,
      newName: "",
      newImg: "",
      newAddress: "",
      newDescription: ""
    }
  }

  componentDidMount = async () => {
    if (!this.props.allCampuses.length) {
      return <div>There are no campuses.</div>;
    }
  }

  handleNewName = (e) => {
    this.setState({ newName: e.target.value })
  }
  handleNewImg = (e) => {
    this.setState({ newImg: e.target.value })
  }
  handleNewAddress = (e) => {
    this.setState({ newAddress: e.target.value })
  }
  handleNewDescription = (e) => {
    this.setState({ newDescription: e.target.value })
  }

  startAdd = () => {
    this.setState({
      newCampus: true,
      newName: "",
      newImg: "https://ualr.edu/elearning/files/2020/10/No-Photo-Available.jpg",
      newAddress: "",
      newDescription: "",
      registerError: ""
    })
    console.log("Starting Add")
  }

  endAdd = () => {
    console.log("Closing Add Form")
    this.setState({ newCampus: false })
  }

  addCampus = async (e) => {
    if (this.state.newName === "") {
      this.setState({ registerError: "Please enter the campus name" });
    }
    else if (this.state.newAddress === "") {
      this.setState({ registerError: "Please enter the campus' address" });
    }
    else {
      console.log("Adding Campus: ", this.state.newName, this.state.newImg, this.state.newAddress, this.state.newDescription)
      e.preventDefault();
      let data = {
        name: this.state.newName,
        address: this.state.newAddress,
        description: this.state.newDescription
      }
      if (this.state.newImg !== "") {
        let data = {
          name: this.state.newName,
          imageUrl: this.state.newImg,
          address: this.state.newAddress,
          description: this.state.newDescription
        };
      }
      await axios
        .post(`/api/campuses/`, data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      window.location.replace(`/campuses/`);
      this.setState({ newCampus: false })
    }
  }

  render() {
    return (
      <div>
        <div>
          <AppBar position="static" elevation={0} style={{ backgroundColor: '#11153e', shadows: 'none' }}>
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link to={'/'} style={{ textDecoration: 'none' }} >
                <Typography variant="h6" style={{ textAlign: 'left', fontType: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '35px', color: "#CDDC39" }}>
                  Home
                </Typography>
              </Link>
              <div>
                <Link to={'/campuses'} style={{ textDecoration: 'none' }} >
                  <Button>
                    All Campuses
                  </Button>
                </Link>
                <Link to={'/students'} style={{ textDecoration: 'none' }} >
                  <Button>
                    All Students
                  </Button>
                </Link>
              </div>
            </Toolbar>
          </AppBar>
        </div>

        <div>
          <h1 style={{ marginLeft: '20px', fontFamily: 'Courier, sans-serif' }}>All Campuses</h1>
          <Button onClick={this.startAdd}>
            Add Campus
          </Button>
        </div>

        <div>
          {this.props.allCampuses.map((campus) => (
            <div key={campus.id}>
              <div>
                <Link to={`/campus/${campus.id}`}>
                  <h2>{campus.name}</h2>
                </Link>
                <Button onClick={()=>deleteCampus(campus.id)}>
                  X
                </Button>
              </div>
              <Link to={`/campus/${campus.id}`}>
                <img src={campus.imageUrl} width="150" height="150" />
              </Link>
            </div>
          ))}
        </div>

        <div>
          <Dialog fullWidth maxWidth="md" open={this.state.newCampus} aria-labelledby="title">
            <DialogTitle id="title">Adding Campus</DialogTitle>
            <DialogContent>
              <TextField autoFocus margin="normal" id="newName" label="Name" type="string" fullWidth onChange={this.handleNewName} />
              <TextField autoFocus margin="normal" id="newImg" label="Image Link" type="string" fullWidth onChange={this.handleNewImg} />
              <TextField autoFocus margin="normal" id="newAddress" label="Address" type="string" fullWidth onChange={this.handleNewAddress} />
              <TextField autoFocus margin="normal" id="newDescription" label="Description" type="string" fullWidth onChange={this.handleNewDescription} />
              <div>
                {this.state.registerError}
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.endAdd}>
                Close
              </Button>
              <Button onClick={this.addCampus}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    )
  };
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;
