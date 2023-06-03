import { useState } from 'react';
import { useEffect } from 'react';
import globalVars from './globalVar';
import { Route, Routes, Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';

import HomePage from './HomePage';
import CourseList from './CourseList';
import MyCourses from './MyCourses';
import Login from './Login';
import Menu from './menu';
import Promotion from './Promotion';
import TableInput from './TableInput';
import Bill from './Bill';
import Edit from './EditFood';


import bearIcon from './image/bear.png';
import member from './image/member.png';
import bgblack from './image/blackwall1.jpg'; // Import the background image
import BillConfirm from './BillConfirm';
import EditFood from './EditFood';

function App() {
  const [content, setContent] = useState(-1);
  const [tokenData, setToken] = useState(null);
  const [foodtypeData, setFoodTypeData] = useState(null);
  const { id } = useParams();
  //console.log(id);

  useEffect(() => {
    const url = globalVars.hostUrl + '/foodtype';

    fetch(url)
      .then(response => { return response.json() })
      .then(data => {
        //console.log(data);
        setFoodTypeData([...data.result])

      })
      .catch(error => { console.error('There was an error!', error); });
  }, [])

  function handleClick(contentId) {
    setContent(contentId);
  }



  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="dark" className="custom-navbar" bg="dark">
        <Container>
          <Col>
            <Navbar.Text>
              <h1> Nightmare Restaurant </h1>
            </Navbar.Text>
            <Navbar.Text>
              "Chef Select" is mean custumer CAN'T select
            </Navbar.Text>
          </Col>
          <Row className="text-center">
            <Col className="mx-2">
              <Navbar.Brand href="">
                <img
                  alt=""
                  src={member}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{' '}
                <Link className="myNavLink" to="/">Account</Link>
              </Navbar.Brand>
            </Col>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">
              <Nav className="justify-content-center">
                <Nav.Link as={Link} eventKey={0} to="/homepage" onClick={() => handleClick(0)}>
                  Home
                </Nav.Link>
                <Navbar.Text className="mx-2">|</Navbar.Text>
                <Nav.Link as={Link} eventKey={1} to="/menu" onClick={() => handleClick(1)}>
                  Menu
                </Nav.Link>
                <Navbar.Text className="mx-2">|</Navbar.Text>
                <Nav.Link as={Link} eventKey={2} to="/promotion" onClick={() => handleClick(2)}>
                  Promotion
                </Nav.Link>
                <Navbar.Text className="mx-2">|</Navbar.Text>
                <Nav.Link as={Link} eventKey={3} to="/bill" onClick={() => handleClick(3)}>
                  Bill
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Row>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/home" element={<CourseList />} />
        <Route path="/mycourses" element={<MyCourses token={tokenData} />} />
        <Route path="/login" element={<Login token={tokenData} setTokenFn={setToken} />} />
        <Route path="/" element={<Login />} />
        <Route path="/bill" element={<Bill />} />
        <Route path="/promotion" element={<Promotion />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/billcon" element={<BillConfirm />} />
        <Route path="/edit/:id" element={<EditFood foodtype={foodtypeData}/>} />
      </Routes>
    </>
  );
}

export default App;
