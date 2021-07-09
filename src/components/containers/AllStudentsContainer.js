import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchAllStudentsThunk} from "../../store/thunks";
import {AllStudentsView} from "../views";

class AllStudentsContainer extends Component {
  componentDidMount() {
    this.props.fetchAllStudents();
  }
  render(){
    return(
      <AllStudentsView 
        allStudents={this.props.allStudents}
      />
    );
  }
}

// State to Props
const mapState = (state) => {
  return {
    allStudents: state.allStudents,
  };
};

// Dipatch to Prop
const mapDispatch = (dispatch) => {
  return {
    fetchAllStudents: () =>dispatch(fetchAllStudentsThunk()),
  };
};

// Checks for type (if regular object, do nothing)
AllStudentsContainer.propTypes = {
  allStudents: PropTypes.array.isRequired,
  fetchAllStudentsThunk: PropTypes.func.isRequired,
};

export default connect(mapState, mapDispatch)(AllStudentsContainer);
