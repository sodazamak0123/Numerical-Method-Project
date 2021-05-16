import React from 'react';
import { Input, Button } from 'antd';
import './Content.css';
import {equation_func, fixed_fx} from './Equation_Function'
import apis from "../containers/API"

class Onepoint extends React.Component{

    state = {
        f_x:'',
        init_x:null,
        x:null,
        er:null,
        ifer:null
    };

    async getData(){
        let tempData = null
        await apis.getAllRootOfEquation().then(res => {tempData = res.data})
        this.setState({apiData:tempData})
        this.setState({
            f_x: this.state.apiData[2]["equation"],
            init_x : this.state.apiData[2]["initial_x"],
            er : this.state.apiData[2]["error"],
        })
    }

    onClickExample = e =>{
        this.getData()
    }

    myChangeHandler_f_x = (e) => {
        this.setState({f_x: e.target.value});
    }

    myChangeHandler_init_x = (e) => {
        this.setState({init_x: e.target.value});
    }

    myChangeHandler_er = (e) => {
        this.setState({er: e.target.value});
    }

    find_x = e =>{
        
        const math = require('mathjs')
        let fx = math.parse(this.state.f_x).compile()
        let x = math.bignumber(this.state.init_x)
        let error = math.bignumber(this.state.er)
        let checkError = math.bignumber(Number.MAX_VALUE)
        let newX = x
        let arr = []
        let iteration = 1

        while (math.larger(checkError, error)) {

            newX = fx.evaluate({x:x})
            let newCheckError = math.abs(math.divide(math.subtract(newX, x), newX))
            if(iteration > 500 || (iteration > 5 && math.equal(checkError, 1))){
                arr = []
                arr.push(<div style={{fontSize:'40px',fontWeight:'bold'}}>สมการนี้เป็น ลู่ออก</div>)
                this.setState({x:arr})
                return;
            }
            checkError = newCheckError
            console.log(checkError.toString())
            x = newX
            arr.push(<div style={{fontSize:'25px'}}>
                        <span style={{display:'inline-block',width:'40%'}}>Iteration {iteration}: x is {parseFloat(x)}</span>
                        <span>Error : {checkError.toFixed(15)}</span>
                    </div>);
            iteration = iteration + 1
        }
        arr.push(<div style={{fontSize:'40px',fontWeight:'bold'}}>Result of x is {parseFloat(x)}</div>);
        this.setState({x:arr});

    }

    render(){
        return(
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }}>
                <h1 className="header-content">Onepoint Method</h1>
                <div> 
                    <span><Input placeholder="x = x/2 + 1/4" style={{width:'364px'}} onChange={this.myChangeHandler_f_x} value = {this.state.f_x} /></span>
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.find_x}>Calculation</Button></span>
                    {this.state.ifer}
                </div>
                <div style={{marginTop:'5px'}}>
                    <span>Initial x =</span>
                    <span style={{marginLeft:'5px', marginRight:'5px'}}><Input placeholder="0.00" style={{width:'100px'}} onChange={this.myChangeHandler_init_x} value = {this.state.init_x}/></span>
                    <span>Error =</span>
                    <span style={{marginLeft:'5px', marginRight:'5px'}}><Input placeholder="0.00001" style={{width:'100px'}} onChange={this.myChangeHandler_er} value = {this.state.er}/></span>
                </div>
                <div style={{marginTop:'10px'}}>
                    <span><Button type="primary" onClick={this.onClickExample}>Example</Button></span>
                </div>
                <div style={{marginTop:'20px'}}>
                    {this.state.x}
                </div>
            </div>
        );
    }

}

export default  Onepoint;