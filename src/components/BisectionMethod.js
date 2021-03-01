import React from 'react';
import { Input, Button } from 'antd';
import './Content.css';



class BisectionMethod extends React.Component{

    state = {
        f_x:'',
        x:5,
        ans:null,
    };

    myChangeHandler = (e) => {
        this.setState({f_x: e.target.value});
    }

    find_x = e =>{
        let f_x = this.state.f_x;
        f_x = f_x.replace("^","**");
        f_x = f_x.replace("sin","Math.sin");
        f_x = f_x.replace("cos","Math.cos");
        f_x = f_x.replace(/\d(?=x)/g, '$&*')
        let x = this.state.x;
        let ans = eval(f_x);
        this.setState({ans:ans});
    };

    render(){
        return(
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }}>
                <h1 className="header-content">Bisection Method</h1>
                <div> 
                    <span><Input placeholder="2*x^2*5*x+3" style={{width:'20%'}} onChange={this.myChangeHandler}/></span>
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.find_x}>Calculation</Button></span>
                </div>
                <div>
                    {this.state.ans}
                </div>
            </div>
        );
    }

}

export default  BisectionMethod;