import book from './image/book1.jpg';
import work from './image/work.jpg';
import classroom from './image/classroom.jpg';
import meat from './image/meat.jpg'
import banner1 from './image/banner1.png'
import banner2 from './image/banner2.png'
import banner3 from './image/banner3.png'
import React, { useState, useEffect } from 'react';
import globalVars from './globalVar';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';

import './App.css';
import { Link } from 'react-router-dom';

function Promotion(prop) {

    const [top3, setTop3] = useState([]);

    useEffect(() => {
        const url = globalVars.hostUrl + '/top3'
        fetch(url)
            .then(response => { return response.json() })
            .then(data => {
                setTop3([...data.result])
            })
            .catch(error => { console.error('There was an error!', error); });
    }, [])

    return (
        <Container className="w-100 mw-100">
            
            <div className="text-center mt-4">
                <img src={banner1} alt="Example" style={{ width: '1500px', height: 'auto' }} />
            </div>
            <div className="text-center mt-4">
                <img src={banner2} alt="Example" style={{ width: '1500px', height: 'auto' }} />
            </div>
            <div className="text-center mt-4">
                <img src={banner3} alt="Example" style={{ width: '1500px', height: 'auto' }} />
            </div>
            <Row className="pt-4 me-5">
                <Col className="text-center"><Link className="myLink" to="/bill"><h2>Click here to check the bill</h2> </Link></Col>
            </Row>
        </Container>
    );
}

export default Promotion;