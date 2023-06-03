import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import glovalVars from './globalVar';
import Alert from 'react-bootstrap/Alert';


import './App.css';

function BillConfirm(prop) {
    const { setTokenFn } = prop;
    const [errorMessage, setErrorMessage] = useState('');
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [showAlert, setShowAlert] = useState(false); // State variable for controlling the visibility of the Alert
    const navigate = useNavigate(); // Hook for navigation

    function submittest() {
        navigate('/bill'); // Change route to '/'
    }
    function visibletest() {
        setShowAlert(true); // Show the Alert
    }

    function submitButton(e) {
        e.preventDefault();
        console.log(form);
        const bodyData = JSON.stringify({ user: { email: form.email, password: form.password } });
        const headerInfo = {
            method: 'POST',
            body: bodyData,
            headers: { 'Content-Type': 'application/json' },
        };
        const url = glovalVars.hostUrl + '/login';
        fetch(url, headerInfo)
            .then((response) => {
                console.log(response);
                if (response.status === 401) {
                    throw new Error('Login Fail.');
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                console.log(data.token);
                setTokenFn({ token: data.token, email: form.email });
                setErrorMessage('');
                resetButton();
                setShowAlert(true); // Show the Alert
                navigate('/mycourses'); // Change route to '/mycourses'
            })
            .catch((err) => {
                console.log(err.message);
                setTokenFn(null);
                setErrorMessage(err.message);
            });
    }

    function resetButton() {
        setForm({
            email: '',
            password: '',
        });
    }

    return (
        <Container className="w-100 mw-100">
            <Row className="justify-content-center pt-2">
                <Col className="" xs={12} md={8}>
                    <Card>
                        <Card.Header className="text-center">
                            <h1>**Please check clearly before press SUBMIT ORDER button.**</h1>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title className="text-danger">
                                <h1>BILL STATUS: UNPAID</h1>
                            </Card.Title>
                            <Card.Text>Nightmare Restaurant</Card.Text>

                            <Card.Text>
                                <h5>------ORDER LIST------</h5>
                                x1 MEAT 400.00<br />
                                x1 MEAT 400.00<br />
                                x1 MEAT 400.00<br />
                                x1 MEAT 400.00<br />
                                -<br />
                                -<br />
                                <h5>-------------------------</h5>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <>
                        <h1></h1>
                    </>
                    <div className="d-flex justify-content-end">
                        {showAlert && ( // Show the Alert only when showAlert is true
                            <Alert variant="success" onClose={() => setShowAlert(false)} dismissible style={{ width: '200px', height: 'auto' }}>
                                Submit successful!
                            </Alert>
                        )}
                    </div>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" onClick={submittest}>
                            CONFIRM BILL
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default BillConfirm;
