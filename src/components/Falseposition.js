import React from 'react';
import { Input, Button } from 'antd';
import './Content.css';
import {equation_func, fixed_fx} from './Equation_Function'



class Falseposition extends React.Component{

    state = {
        f_x:'',
        x:null,
        xl:null,
        xr:null,
        er:null,
        ifer:null
    };

    myChangeHandler_f_x = (e) => {
        this.setState({f_x: e.target.value});
    }
    myChangeHandler_xl = (e) => {
        this.setState({xl: e.target.value});
    }
    myChangeHandler_xr = (e) => {
        this.setState({xr: e.target.value});
    }
    myChangeHandler_er = (e) => {
        this.setState({er: e.target.value});
    }

    find_x = e =>{

        if(this.state.f_x==''){
            this.setState({ifer:(<div style={{color:'red'}}>โปรดใส่ฟังก์ชั่น</div>)})
            return;
        }

        try{
        this.setState({ifer:null})
        let f_x = this.state.f_x;
        //console.log(f_x);

        f_x = fixed_fx(f_x);

        let xl = parseFloat(this.state.xl);
        let xr = parseFloat(this.state.xr);
        let er = parseFloat(this.state.er);

        let fxr = equation_func(xr,f_x);
        let fxl = equation_func(xl,f_x);
        let x = (xl*fxr-xr*fxl)/(fxr-fxl);
        let num = equation_func(x,f_x)*fxr;

        let tmp_er = 9999999;
        let new_x = 0;

        let arr = [];
        let i =1;

        if(num>0){
            xr = x;
        }
        else if(num<0){
            xl = x;
        }

        while(tmp_er > er){

            fxr = equation_func(xr,f_x);
            fxl = equation_func(xl,f_x);
            new_x = (xl*fxr-xr*fxl)/(fxr-fxl);
            num = equation_func(new_x,f_x)*fxr;

            if(num>0){
                xr = new_x;
            }
            else if(num<0){
                xl = new_x;
            }

            tmp_er = Math.abs(new_x-x)/new_x;
            x = new_x;

            arr.push(<div style={{fontSize:'25px'}}>
                        <span style={{display:'inline-block',width:'40%'}}>Iteration {i}: x is {x}</span>
                        <span>Error : {tmp_er.toFixed(15)}</span>
                    </div>);
            i++;

        }
        arr.push(<div style={{fontSize:'40px',fontWeight:'bold'}}>Result of x is {x}</div>);
        this.setState({x:arr});
        } catch(error){
            this.setState({ifer:(<div style={{color:'red'}}>ใส่ฟังก์ชั่นไม่ถูกต้อง</div>)})
        }
    };


    render(){
        return(
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }}>
                <h1 className="header-content">False-position Method</h1>
                <div> 
                    <span><Input placeholder="43x-1" style={{width:'364px'}} onChange={this.myChangeHandler_f_x}/></span>
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.find_x}>Calculation</Button></span>
                    {this.state.ifer}
                </div>
                <div style={{marginTop:'5px'}}>
                    <span>XL =</span>
                    <span style={{marginLeft:'5px', marginRight:'5px'}}><Input placeholder="0.2" style={{width:'57px'}} onChange={this.myChangeHandler_xl}/></span>
                    <span>XR =</span>
                    <span style={{marginLeft:'5px', marginRight:'5px'}}><Input placeholder="0.3" style={{width:'57px'}} onChange={this.myChangeHandler_xr}/></span>
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

export default  Falseposition;