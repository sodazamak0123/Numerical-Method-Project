import React from 'react';
import {Input, Button} from 'antd';
import './Content.css';
import {Decimal} from 'decimal.js';

import { create, all } from 'mathjs'

const config = { }
const math = create(all, config)

class GaussJordanMethod extends React.Component{

    state = {
        n:2,
        matrix_a:[[],[]],
        matrix_b:[null,null],
        x : null,
        ifer:null,
    }


    input_matrix_A = (e) =>{
        let name = e.target.name.toString().split(" ");
        let arr = this.state.matrix_a;
        let index0 = parseInt(name[0]);
        let index1 = parseInt(name[1]);
        arr[index0][index1] = e.target.value;
        //console.log(name);
        this.setState({matrix_a:arr});
    }

    input_matrix_B = (e) =>{
        let name = e.target.name.toString();
        let arr = this.state.matrix_b;
        let index = parseInt(name);
        arr[index] = e.target.value;
        //console.log(name);
        this.setState({matrix_b:arr});
    }

    matrix_A_show =()=>{
        let arr = []
        let number = this.state.matrix_a;
        for(let i=0;i<this.state.n;i++){
            for(let j=0;j<this.state.n;j++){
                arr.push(<span style={{margin:'2.5px'}}><Input name={(i).toString()+" "+(j).toString()} style={{width:'50px',textAlign:'center'}} onChange={this.input_matrix_A} autocomplete="off" value={number[i][j]}/></span>)
            }
            arr.push(<div style={{margin:'5px'}}></div>)
        }
        return(arr);
    }

    matrix_X_show =()=>{
        let arr = []
        for(let i=0;i<this.state.n;i++){
            arr.push(<span style={{margin:'2.5px'}}><Input style={{width:'50px',textAlign:'center'}} value={"x"+(i+1)} disabled/></span>)
            arr.push(<div style={{margin:'5px'}}></div>)
        }
        return(arr);
    }

    matrix_B_show =()=>{
        let arr = []
        let number = this.state.matrix_b;
        for(let i=0;i<this.state.n;i++){
            arr.push(<span style={{margin:'2.5px'}}><Input name={(i).toString()} style={{width:'50px',textAlign:'center'}} onChange={this.input_matrix_B} autocomplete="off" value={number[i]}/></span>)
            arr.push(<div style={{margin:'5px'}}></div>)
        }
        return(arr);
    }


    add_dm = (e) =>{
        let n = this.state.n
        if(n<8){
            this.setState({n:n+1})
        }
        else{
            return;
        }
        let arr_a = this.state.matrix_a;
        let arr_b = this.state.matrix_b;
        arr_a.push([]);
        arr_b.push(null);
        for(let i=0;i<n+1;i++){
            arr_a[i].push(null);
        }
        this.setState({matrix_a:arr_a});
        this.setState({matrix_b:arr_b});
        //console.log(arr_a);
    }

    del_dm = (e) =>{
        let n = this.state.n;
        if(n>2){
            this.setState({n:n-1})
        }
        else{
            return;
        }
        let arr_a = this.state.matrix_a;
        let arr_b = this.state.matrix_b;
        arr_a.pop();
        arr_b.pop();
        for(let i=0;i<n-1;i++){
            arr_a[i].pop();
        }
        this.setState({matrix_a:arr_a});
        this.setState({matrix_b:arr_b});
        //console.log(arr_a);
    }

    find_x = (e) =>{

        //try{
        Decimal.precision = 25
        this.setState({ifer:null})
        let n = this.state.n;
        let i_m_a = this.state.matrix_a;
        let i_m_b = this.state.matrix_b;

        let m_a = []
        let m_b = [].concat(i_m_b)

        for(let i=0;i<n;i++){
            m_a[i] = [].concat(i_m_a[i])
        }

        // let det_A = math.det(m_a)
        // det_A = det_A.toFixed(10)
        // let x = []
        /*
        [[[1,2],[1,2]]]
        
        */
        // for(let i=0;i<n;i++){
        //     x.push([])
        //     for(let j=0;j<n;j++){
        //         x[i].push([].concat(m_a[j]))
        //         x[i][j][i] = m_b[j]
        //     }
        // }

        for(let i=1;i<n;i++){

            for(let j=i;j<n;j++){
        
                let divide = m_a[i-1][i-1]
                let multi = m_a[j][i-1]
                let muldiv = Decimal.div(multi,divide)
                //console.log(muldiv)
                for(let k=i-1;k<n;k++){
                    let temp = Decimal.mul(m_a[i-1][k],muldiv)
                    temp = Decimal.sub(m_a[j][k],temp)
                    m_a[j][k] = temp
                    //m_a[j][k] = (m_a[j][k] - Decimal(m_a[i-1][k]*muldiv))

                }
                let temp = Decimal.mul(m_b[i-1],muldiv)
                temp = Decimal.sub(m_b[j],temp)
                m_b[j] = temp
                //m_b[j] = (m_b[j] - (m_b[i-1]*muldiv))
            }
            
        }

        for(let i=n-2;i>=0;i--){

            for(let j=i;j>=0;j--){
        
                let divide = m_a[i+1][i+1]
                let multi = m_a[j][i+1]
                let muldiv = Decimal.div(multi,divide)
                for(let k=n-1;k>=i;k--){
                    let temp = Decimal.mul(m_a[i+1][k],muldiv)
                    temp = Decimal.sub(m_a[j][k],temp)
                    //A[j][k] = A[j][k] - ((A[i+1][k]/divide)*multi)
                }
                let temp = Decimal.mul(m_b[i+1],muldiv)
                temp = Decimal.sub(m_b[j],temp)
                m_b[j] = temp;
            }
        
        }

  
        let x = []

        for(let i=0;i<n;i++){
            x[i] = Decimal.div(m_b[i],m_a[i][i]);
        }

        let ans_x = []
        
        for(let i=0;i<n;i++){
            ans_x.push(<div style={{fontSize:'40px',fontWeight:'bold'}}>Result of x{i+1} is {parseFloat(x[i])}</div>);
        }
        this.setState({x:ans_x})
        /*} catch (error){
            this.setState({ifer:(<div style={{color:'red'}}>โปรดใส่ข้อมูลให้ครบ</div>)})
        }*/
    }


    render(){
        return(
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }}>
                <h1 className="header-content">Gauss Jordan Method</h1>
                <div style={{marginBottom:'10px'}}> 
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.del_dm}>-</Button></span>
                    <span style={{marginLeft:'10px', fontSize:'20px'}}>{this.state.n} x {this.state.n}</span>
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.add_dm}>+</Button></span>
                </div>
                <div style={{display:'flex',flexFlow:'row'}}>
                    <div style={{display:'flex', alignItems:'center', fontSize:'25px'}}>A =</div>
                    <div style={{alignItems:'center'}}>{this.matrix_A_show()}</div>
                    <div style={{display:'flex', alignItems:'center', fontSize:'25px',marginLeft:'10px', marginRight:'10px'}}>X =</div>
                    <div style={{alignItems:'center'}}>{this.matrix_X_show()}</div>
                    <div style={{display:'flex', alignItems:'center', fontSize:'25px',marginLeft:'10px', marginRight:'10px'}}>b =</div>
                    <div style={{alignItems:'center'}}>{this.matrix_B_show()}</div>
                </div>
                <div style={{marginTop:'10px'}}>
                    {this.state.ifer}
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.find_x}>Calculation</Button></span>
                </div>
                <div style={{marginTop:'20px'}}>
                    {this.state.x}
                </div>
            </div>
        );
    }

}

export default  GaussJordanMethod;