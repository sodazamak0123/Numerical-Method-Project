import React from 'react';
import { Input, Button } from 'antd';
import './Content.css';



class BisectionMethod extends React.Component{

    state = {
        f_x:'',
        x:null,
        xl:null,
        xr:null,
        er:null,
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

    equation_func = (x,f_x) => {
        let temp = eval(f_x)
        //console.log(this.state.f_x);
        return temp;
    }

    find_x = e =>{
        this.setState({f_x:equa_input.target.value})
        let f_x = this.state.f_x;
        f_x = f_x.replace("^","**");
        //f_x = f_x.replace(/X/g, '$&x');
        f_x = f_x.replace("sin","Math.sin");
        f_x = f_x.replace("cos","Math.cos");
        f_x = f_x.replace("tan","Math.tan");
        f_x = f_x.replace(/\d(?=x)/g, '$&*');

        while (f_x.indexOf("xx") >= 0)
        {
            f_x = f_x.replace("xx", "x*x");
        }

        this.setState({f_x:f_x})

        let xl = parseFloat(this.state.xl);
        let xr = parseFloat(this.state.xr);
        let er = parseFloat(this.state.er);

        let xm = (xl+xr)/2;
        let num = this.equation_func(xm,f_x)*this.equation_func(xr,f_x);

        let tmp_er = 9999999;
        let new_xm = 0;

        if(num>0){
            xr = xm;
        }
        else if(num<0){
            xl = xm;
        }

        while(tmp_er > er){

            new_xm = (xl+xr)/2;
            num = this.equation_func(new_xm,f_x)*this.equation_func(xr,f_x);

            if(num>0){
                xr = new_xm;
            }
            else if(num<0){
                xl = new_xm;
            }

            tmp_er = Math.abs(new_xm-xm)/new_xm;
            xm = new_xm;
        }
        this.setState({x:xm});
    };

    render(){
        return(
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }}>
                <h1 className="header-content">Bisection Method</h1>
                <div> 
                    <span><Input ref={equa_input} placeholder="x^4-13" style={{width:'364px'}} onChange={this.myChangeHandler_f_x}/></span>
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.find_x}>Calculation</Button></span>
                </div>
                <div style={{marginTop:'5px'}}>
                    <span>XL =</span>
                    <span style={{marginLeft:'5px', marginRight:'5px'}}><Input placeholder="1.5" style={{width:'57px'}} onChange={this.myChangeHandler_xl}/></span>
                    <span>XR =</span>
                    <span style={{marginLeft:'5px', marginRight:'5px'}}><Input placeholder="2" style={{width:'57px'}} onChange={this.myChangeHandler_xr}/></span>
                    <span>Error =</span>
                    <span style={{marginLeft:'5px', marginRight:'5px'}}><Input placeholder="0.00001" style={{width:'100px'}} onChange={this.myChangeHandler_er}/></span>
                </div>
                <div style={{marginTop:'20px'}}>
                    Result of x is {this.state.x}
                </div>
            </div>
        );
    }

}

export default  BisectionMethod;