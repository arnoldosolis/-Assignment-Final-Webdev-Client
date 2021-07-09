import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

import axios from "axios";

const onDelete = async (id) => {
    await axios
        .delete(`/api/students/${id}`)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    window.location.replace(`/students`);
};

class AllStudentsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newStudent: false,
            newStudentFirstName: "",
            newStudentLastName: "",
            newStudentEmail: "",
            newStudentGpa: 4.0,
            newStudentImg: "https://img.icons8.com/small/452/error.png",
            registerError: ""
        }
    }

    handleFirstName = (e) => {
        this.setState({ newStudentFirstName: e.target.value })
    }
    handleLastName = (e) => {
        this.setState({ newStudentLastName: e.target.value })
    }
    handleEmail = (e) => {
        this.setState({ newStudentEmail: e.target.value })
    }
    handleGpa = (e) => {
        this.setState({ newStudentGpa: e.target.value })
    }
    handleImg = (e) => {
        this.setState({ newStudentImg: e.target.value })
    }

    startSAdd = () => {
        this.setState({
            newStudent: true,
            newStudentFirstName: "",
            newStudentLastName: "",
            newStudentEmail: "",
            newStudentGpa: null,
            newStudentImg: "https://img.icons8.com/small/452/error.png"
        })
        console.log("Starting Add Student")
    }

    endSAdd = () => {
        console.log("Closing Add Student Form")
        this.setState({ newStudent: false })
    }

    addStudent = async (e) => {
        if (this.state.newStudentFirstName === "") {
            this.setState({ registerError: "Please enter the student's name" });
        }
        if (this.state.newStudentLastName === "") {
            this.setState({ registerError: "Please enter the student's name" });
        }
        else if (this.state.newStudentEmail === "") {
            this.setState({ registerError: "Please enter the student's email" });
        }
        else {
            console.log("Adding Student: ", this.state.newStudentFirstName, this.state.newStudentLastName, this.state.newStudentEmail, this.state.newStudentGpa, this.state.newStudentImg)
            e.preventDefault();
            let data = {
                firstname: this.state.newStudentFirstName,
                lastname: this.state.newStudentLastName,
                email: this.state.newStudentEmail,
                gpa: this.state.newStudentGpa,
                imageUrl: this.state.newStudentImg
            }
            await axios
                .post(`/api/students/`, data)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
            window.location.replace(`/students/`);
            this.setState({ newStudent: false })
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
                                    <Button style={{ marginRight: '10px' }}>
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
                    <h1 style={{ marginLeft: '20px', fontFamily: 'Courier, sans-serif' }}>All Students</h1>
                    <Button onClick={this.startSAdd}>
                        Add Student
                    </Button>
                </div>
                <div>
                    {this.props.allStudents.map((student) => (
                        <div key={student.id}>
                            <div>
                                <Link to={`/student/${student.id}`}>
                                    <h2>{student.firstname} {student.lastname}</h2>
                                </Link>
                                <Button onClick={() => onDelete(student.id)}>
                                    X
                                </Button>
                            </div>
                            <Link to={`/student/${student.id}`}>
                                <img src={student.imageUrl} width="150" height="150" />
                            </Link>
                        </div>
                    ))}
                </div>

                <div>
                    <Dialog fullWidth maxWidth="md" open={this.state.newStudent} aria-labelledby="title">
                        <DialogTitle id="title">Adding Student</DialogTitle>
                        <DialogContent>
                            <TextField autoFocus margin="normal" id="newStudentFirstName" label="First Name" type="string" fullWidth onChange={this.handleFirstName} />
                            <TextField autoFocus margin="normal" id="newStudentLastName" label="Last Name" type="string" fullWidth onChange={this.handleLastName} />
                            <TextField autoFocus margin="normal" id="newStudentEmail" label="Email" type="string" fullWidth onChange={this.handleEmail} />
                            <TextField autoFocus margin="normal" id="newStudentGpa" label="GPA" type="decimal" fullWidth onChange={this.handleGpa} />
                            <TextField autoFocus margin="normal" id="newStudentImg" label="Image Link" type="string" fullWidthonChange={this.handleImg} />
                            <div>
                                {this.state.registerError}
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.endSAdd}>
                                Close
                            </Button>
                            <Button onClick={this.addStudent}>
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        )
    };
};

AllStudentsView.propTypes = {
    allStudents: PropTypes.array.isRequired,
};

export default AllStudentsView;
