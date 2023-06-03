import React, { useState, useEffect } from 'react';
import globalVars from './globalVar';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import glovalVars from './globalVar';
import Alert from 'react-bootstrap/Alert';

import './App.css';

function Bill(prop) {
    const { setTokenFn } = prop;
    const [bill, setBill] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [showAlert, setShowAlert] = useState(false); // State variable for controlling the visibility of the Alert
    const navigate = useNavigate(); // Hook for navigation

    function submittest() {
        navigate('/'); // Change route to '/'
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

    function multiplyObjectByInteger(obj, multiplier) {
        const multipliedObj = {};
        if (typeof obj === 'number') {
            multipliedObj = obj * multiplier;
        }
        return multipliedObj;
    }

    useEffect(() => {
        const url = globalVars.hostUrl + '/bill'
        fetch(url)
            .then(response => { return response.json() })
            .then(data => {
                //console.log(data);
                setBill([...data.result])
            })
            .catch(error => { console.error('There was an error!', error); });
    }, [])

    function resetButton() {
        setForm({
            email: '',
            password: '',
        });
    }
    let totalPrice = 0;
    let tableNo = 0;
    return (
        <Container className="w-100 mw-100">
            <Row className="justify-content-center pt-2">
                <Col className="" xs={12} md={8}>
                    <Card>
                        <Card.Header className="text-center">
                            **Please check the order list clearly.**
                        </Card.Header>
                        <Card.Body>
                            <Card.Title className="text-danger">
                                <h1>BILL STATUS: UNPAID</h1>
                            </Card.Title>
                            <Card.Text>Nightmare Restaurant</Card.Text>
                            <Card.Text>
                                Address: KMUTT<br />
                                TEL: 1669<br />
                                WEBSITE: this.WEBSITE<br />
                                DATE: Someday
                            </Card.Text>
                            <Card.Text>
                                <h5>------ORDER LIST------</h5>
                                <Row>
                                    {
                                        bill.map(item => {
                                            const multipliedValue = item.price * item.amount;
                                            totalPrice += multipliedValue;
                                            tableNo = item.tableid
                                            return (
                                                <Row key={item.id}>
                                                    <Col>x{item.amount} {item.name}</Col>
                                                    <Col className="justify-content-start" style={{ marginRight: 'auto' }}>
                                                        {multipliedValue}.00
                                                    </Col>
                                                    <Col></Col><Col></Col><Col></Col>
                                                </Row>
                                            )
                                        })
                                    }
                                </Row>
                                <h5>--------------------------</h5>
                                Table no. {tableNo}<br />
                                Promotion: N/A.<br />
                                VAT 0%<br />
                                Service Charge: N/A<br />
                                <Row>
                                    <Col><h6>Total Prices:</h6></Col>
                                    <Col>{totalPrice}.00</Col><Col></Col><Col></Col><Col></Col>
                                </Row>
                                AJ.AO GIVE 'A' GRADE RECEIVE 90% OFF COUPON
                                <h5>THANK YOU VISIT AGAIN</h5>

                                <h5 className="d-flex justify-content-center">PLEASE CHECK THE BILL BEFORE MANAGE THE PAYMENT</h5>
                                <h5 className="d-flex justify-content-center">NO COMPLAINT WILL BE ENTERTAIN THEREAFTER</h5>
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
                </Col>
            </Row>
        </Container>
    );
}

export default Bill;
