


import React from 'react';
import Button from 'react-bootstrap/Button';
import './intro.css'; 
import { useNavigate } from 'react-router-dom';

const Intro = () => {
    const navigate=useNavigate()
    const clickHandler=()=>{
        navigate("/home")
    }
    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#EDF4F2"
            }}
        >
            <div className="animated-text">
                Welcome to Country Finder
            </div>
            <Button variant="outline-success" size="lg" onClick={clickHandler}>
                Explore
            </Button>
        </div>
    );
};

export default Intro;

