import React from 'react';
import { Input, Button } from 'antd';
import './Content.css';
import {equation_func, fixed_fx} from './Equation_Function'

class Secant extends React.Component{

    state = {
        f_x:'',
        x:null,
        x0:null,
        x1:null,
        er:null,
        ifer:null
    };

    myChangeHandler_f_x = (e) => {
        this.setState({f_x: e.target.value});
    }
    myChangeHandler_x0 = (e) => {
        this.setState({x0: e.target.value});
    }
    myChangeHandler_x1 = (e) => {
        this.setState({x1: e.target.value});
    }
    myChangeHandler_er = (e) => {
        this.setState({er: e.target.value});
    }

    find_x = e =>{

        if(this.state.f_x==''){
            this.setState({ifer:(<div style={{color:'red'}}>โปรดใส่ฟังก์ชั่น</div>)})
            return;
        }

        try {
            
        this.setState({ifer:null})
        let f_x = this.state.f_x;
        //console.log(f_x);

        f_x = fixed_fx(f_x);

        let x0 = parseFloat(this.state.x0);
        let x1 = parseFloat(this.state.x1);
        let er = parseFloat(this.state.er);

        let x_new;

        let tmp_er = 9999999;

        let arr = [];
        let i =1;

        while(tmp_er > er){

            x_new = x1 - ((equation_func(x1,f_x)*(x1-x0))/(equation_func(x1,f_x)-equation_func(x0,f_x)))

            tmp_er = Math.abs((x_new-x1)/x_new);
            
            x0 = x1;
            x1 = x_new;

            arr.push(<div style={{fontSize:'25px'}}>
                <span style={{display:'inline-block',width:'40%'}}>Iteration {i}: x is {x_new}</span>
                <span>Error : {tmp_er.toFixed(15)}</span>
                </div>);
            i++;

        }
        arr.push(<div style={{fontSize:'40px',fontWeight:'bold'}}>Result of x is {x_new}</div>);
        this.setState({x:arr});

        } catch (error) {
            this.setState({ifer:(<div style={{color:'red'}}>ใส่ฟังก์ชั่นไม่ถูกต้อง</div>)})
        }
    };


    render(){
        return(
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }}>
                <h1 className="header-content">Secant Method</h1>
                <div> 
                    <span><Input placeholder="x^2 - 7" style={{width:'364px'}} onChange={this.myChangeHandler_f_x}/></span>
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.find_x}>Calculation</Button></span>
                    {this.state.ifer}
                </div>
                <div style={{marginTop:'5px'}}>
                    <span>x0 =</span>
                    <span style={{marginLeft:'5px', marginRight:'5px'}}><Input placeholder="2.0" style={{width:'57px'}} onChange={this.myChangeHandler_x0}/></span>
                    <span>x1 =</span>
                    <span style={{marginLeft:'5px', marginRight:'5px'}}><Input placeholder="3.0" style={{width:'57px'}} onChange={this.myChangeHandler_x1}/></span>
                    <span>Error =</span>
                    <span style={{marginLeft:'5px', marginRight:'5px'}}><Input placeholder="0.00001" style={{width:'100px'}} onChange={this.myChangeHandler_er}/></span>
                </div>
                <div style={{marginTop:'20px'}}>
                    {this.state.x}
                </div>
            </div>
        );
    }

}

export default  Secant;