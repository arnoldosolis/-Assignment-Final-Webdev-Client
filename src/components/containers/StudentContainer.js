import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchStudentThunk} from "../../store/thunks";
import {StudentsView} from "../views";

class StudentContainer extends Component {
  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.id);
  }

  render() {
    return ( 
      <StudentsView
        student={this.props.student}
      />
    );
  }
}

// State to Props 
const mapState = (state) => {
  return {
    student: state.student,
  };
};

// Dispatch to Props 
const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
  };
};


export default connect(mapState, mapDispatch)(StudentContainer);
