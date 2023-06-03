import React, { useState, useEffect } from 'react';
import globalVars from './globalVar';

import banner1 from './image/banner1.png'
import banner2 from './image/banner2.png'
import banner3 from './image/banner3.png'
import pencil from './image/pencil.png'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { ListGroup } from 'react-bootstrap';
import { Container, Placeholder, Modal, Row, Col, Card, Navbar, Nav, Dropdown, DropdownButton, Form } from 'react-bootstrap';

import './App.css';
import { Link } from 'react-router-dom';

function Menu(prop) {
    const [menu, setMenu] = useState([]);
    const [meatMenu, setMeatMenu] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showEditButton, setShowEditButton] = useState(false);
    const navigate = useNavigate(); // Hook for navigations
    const [menuSelect, setMenuSelect] = useState({});
    const [editSelect, setEditSelect] = useState(0);

    const [modalShow, setModalShow] = React.useState(false);

    const [filterId, setFilterId] = useState(0);

    const [form, setForm] = useState({
        name: '',
        price: '',
        image: '',
        fooddescription: '',
        foodtypeid: ''
    });
    const [errorMessage, setErrorMessage] = useState(null);

    function submitbill() {
        saveMenuSelectToDatabase(menuSelect);
        navigate('/bill'); // Change route to '/'
        visibletest()
    }
    function enableEdit(id) {
        setEditSelect(id);
        setShowEditButton(true);
        handleEdit(id);
    }

    useEffect(() => {
        //console.log("Editing: ", editSelect);
    }, [editSelect]);

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    function setEdit(){
        setShowEditButton(!showEditButton);
    }


    function visibletest() {
        setShowAlert(true); // Show the Alert
    }

    const decreaseCount = (id) => {
        if (menuSelect[id] > 0) {
            menuSelect[id] = menuSelect[id] - 1
        }
        setMenuSelect({ ...menuSelect })
    };

    function debugOrderList() {
        console.log(menuConvert(menuSelect));
    }

    const increaseCount = (id) => {
        menuSelect[id] = menuSelect[id] + 1
        setMenuSelect({ ...menuSelect })
    };

    //Display food list
    useEffect(() => {
        const url = globalVars.hostUrl + '/menu?filterID=' + filterId;

        fetch(url)
            .then(response => { return response.json() })
            .then(data => {
                //console.log(data);
                setMenu([...data.result])
                let tmp = {}
                for (let i = 0; i < data.result.length; i++) {
                    tmp[data.result[i].id] = 0
                }
                setMenuSelect(tmp)
                //console.log(tmp)
            })
            .catch(error => { console.error('There was an error!', error); });
    }, [filterId])



    function menuConvert(menuSelect) {
        const menuSelectArray = Object.entries(menuSelect);
        return menuSelectArray;
    }


    function saveMenuSelectToDatabase(menuSelect) {
        const url = globalVars.hostUrl + '/saveMenuSelect';
        console.log(JSON.stringify(Object.entries(menuSelect)));
        const tmpArr = Object.entries(menuSelect);
        const menuSelectTmpArr = tmpArr.filter(item => {
            if (item[1] > 0) {
                return true;
            }
        })
        if (menuSelectTmpArr.length == 0) {
            alert("No food to be order.");
            return;
        }
        const bodyData = { foodArray: menuSelectTmpArr, tableid: 0 }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Menu select saved:', data);
            })
            .catch((error) => {
                console.error('Error saving menu select:', error);
            });
    }

    function ImageButton({ onClick }) {
        return (
            showEditButton && (
            <Button variant="dark" onClick={onClick}>
                <img src={pencil}
                    alt="Button Image"
                    style={{ objectFit: 'cover', height: '20px' }} />
            </Button>
            )
        );
    }


    function BillConfirmation() {
        const [show, setShow] = useState(false);
        const tmpArr = Object.entries(menuSelect);
        const menuSelectTmpArr = tmpArr.filter(item => {
            if (item[1] > 0) {
                return true;
            }
        })
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        function log() {
            console.log("OrConf Display", menuSelectTmpArr);
        }
        return (
            <>
                <Button variant="primary" onClick={() => {
                    handleShow();
                    log();
                }}>
                    SUBMIT ORDER
                </Button>

                <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
                    <Modal.Header closeButton>
                        <Modal.Title>ORDER CONFIRMATION</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        Are you sure and want to submit these orders?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                            handleClose();
                            debugOrderList();
                        }}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={submitbill}>SUBMIT ORDER</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
    /*const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    function EditPanel() {
        return (
            <>
                <Button variant="warning" className="mx-2" onClick={handleShowEdit}>
                    EDIT
                </Button>
                <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static" keyboard={false} size="lg" animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-center">EDIT FOOD CARD</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        <Row className="justify-content-center pt-2">
                            <Col className="" xs={12} md={8}>
                                <Card className="my-2">
                                    <Card.Body>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formName">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" placeholder="Food Name" name="fName" value={form.name}
                                                    onChange={(event) => { setForm({ ...form, name: event.target.value }) }} />
                                            </Form.Group>
    
                                            <Form.Group className="mb-3" controlId="formPrice">
                                                <Form.Label>Price</Form.Label>
                                                <Form.Control type="text" placeholder="Food Price" name="fPrice" value={form.price}
                                                    onChange={(event) => { setForm({ ...form, price: event.target.value }) }} />
                                            </Form.Group>
    
                                            <Form.Group className="mb-3" controlId="formType">
                                                <Form.Label>Type</Form.Label>
                                                <Form.Control type="text" placeholder="Number only" name="cType" value={form.foodtypeid}
                                                    onChange={(event) => { setForm({ ...form, foodtypeid: event.target.value }) }} />
                                            </Form.Group>
    
                                            <Form.Group className="mb-3" controlId="formDesc">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control type="text" placeholder="Food Description" name="cDesc" value={form.fooddescription}
                                                    onChange={(event) => { setForm({ ...form, fooddescription: event.target.value }) }} />
                                            </Form.Group>
    
                                            <Form.Group className="mb-3" controlId="formImage">
                                                <Form.Label>Image</Form.Label>
                                                <Form.Control type="file" name="cImg"
                                                    onChange={(event) => { setForm({ ...form, image: event.target.files[0] }) }} />
                                            </Form.Group>
                                            
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" className="mx-2" onClick={() => { handleCloseEdit(); }}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={submitButton} className="mx-2">SUBMIT ORDER</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }*/

    return (
        <Container className="w-100 mw-100">
            <Row className="justify-content-center pt-2">
                <Col className="text-center"> <h1> Menu </h1></Col>
            </Row>
            <Col className="d-flex justify-content-center mt-2">
                <Button variant="danger" onClick={() => setFilterId(0)} className="mx-2">ALL</Button>
                <Button variant="danger" onClick={() => setFilterId(1)} className="mx-2">MEAT</Button>
                <Button variant="danger" onClick={() => setFilterId(2)} className="mx-2">SPAGHETTI</Button>
                <Button variant="danger" onClick={() => setFilterId(3)} className="mx-2">APPETIZER</Button>
                <Button variant="danger" onClick={() => setFilterId(4)} className="mx-2">DRINKS & DESSERT</Button>
                <Button variant="danger" onClick={() => setFilterId(5)} className="mx-2">OTHER</Button>
                <Button variant="dark" onClick={() => setEdit()} className="mx-2">Edit Mode</Button>
            </Col>
            <Row className="justify-content-center pt-2">
                {
                    menu.map(item => {
                        //console.log(item.id);
                        return (
                            <Col key={item.id} xs={12} md={3}>
                                <Card className="my-2">
                                    <Card.Header as="h5" className="d-flex justify-content-between align-items-center text-center custom-card-header" style={{ backgroundColor: '#272727', color: '#ffffff' }} >
                                        {item.name}
                                        <ImageButton variant="dark" onClick={() => enableEdit(item.id)} />
                                    </Card.Header>
                                    <Card.Body>
                                        <div className="text-center">
                                            <Card.Img
                                                src={item.image}
                                                alt="Card image"
                                                style={{ objectFit: 'cover', height: '200px' }}
                                            />
                                        </div>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item className="text-center" style={{ color: '#ff0000' }}>{item.price}฿</ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        <Button variant="danger" onClick={() => decreaseCount(item.id)} className="float-left">
                                                            -
                                                        </Button>
                                                    </Col>
                                                    <Col className="d-flex align-items-center justify-content-center">
                                                        <Card.Text className="text-center align-self-center"><h3>{menuSelect[item.id]}</h3></Card.Text>
                                                    </Col>
                                                    <Col className="d-flex justify-content-end">
                                                        <Button variant="danger" onClick={() => increaseCount(item.id)}>
                                                            +
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="text-center" >{item.fooddescription}</ListGroup.Item>
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                }

            </Row>
            <div className="d-flex justify-content-end">
                {showAlert && ( // Show the Alert only when showAlert is true
                    <Alert variant="success" onClose={() => setShowAlert(false)} dismissible style={{ width: '200px', height: 'auto' }}>
                        Submit successful!
                    </Alert>
                )}
            </div>
            <div className="d-flex justify-content-end">
                <Col>
                    {showEditButton && ( // Show the Alert only when showAlert is true
                        <Alert variant="dark" onClose={() => setShowEditButton(false)} style={{ width: '200', height: 'auto' }}>
                            EDIT MODE: ON
                        </Alert>
                    )}
                </Col>
                <BillConfirmation />
            </div>


        </Container>
    );
}

export default Menu;