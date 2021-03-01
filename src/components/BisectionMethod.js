import React from 'react';
import { Input, Button } from 'antd';
import './Content.css';



class BisectionMethod extends React.Component{

    render(){
        return(
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }}>
                <h1 className="header-content">Bisection Method</h1>
                <div> 
                    <span><Input placeholder="2x^2*5x+3" style={{width:'20%'}}/></span>
                    <span style={{marginLeft:'10px'}}><Button type="primary">Calculation</Button></span>
                </div>
            </div>
        );
    }

}

export default  BisectionMethod;