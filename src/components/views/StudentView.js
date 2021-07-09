import { Link } from "react-router-dom";
import axios from "axios";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const StudentsView = (props) => {
    const { student } = props;

    const deleteStudent = async (id) => {
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
                                <Button color="primary" style={{ marginRight: '10px' }}>
                                    All Campuses
                                </Button>
                            </Link>
                            <Link to={'/students'} style={{ textDecoration: 'none' }} >
                                <Button color="primary">
                                    All Students
                                </Button>
                            </Link>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
            <div>
                <div>
                    <h1>{student.firstname} {student.lastname}</h1>
                    <Button onClick={() => deleteStudent(student.id)}>
                        Delete Student
                    </Button>
                </div>
                <img src={student.imageUrl} width="150" height="150" />
                <p>Email: {student.email}</p>
                <p>GPA: {student.gpa === null || student.gpa === undefined ? ("No GPA provided") : (student.gpa)}</p>
                <div>
                    <h2>Campus</h2>
                    {student.campus === null || student.campus === undefined ? ("This student does not belong to any campus") : (<Link to={`/campus/${student.campusId}`}>{student.campus.name}</Link>)}
                </div>
            </div>
        </div>
    );
};


export default StudentsView;