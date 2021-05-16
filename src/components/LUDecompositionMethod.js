import React from 'react';
import {Input, Button} from 'antd';
import './Content.css';
import {Decimal} from 'decimal.js';
import apis from "../containers/API"
import { create, all } from 'mathjs'

const config = { }
const math = create(all, config)

class LUDecompositionMethod extends React.Component{

    state = {
        n:2,
        matrix_a:[[],[]],
        matrix_b:[null,null],
        x : null,
        ifer:null,
    }

    async getData(){
        let tempData = null
        await apis.getAllMatrix().then(res => {tempData = res.data})
        this.setState({apiData:tempData})
        this.setState({
            n: this.state.apiData[0]["n"],
            matrix_a : this.state.apiData[0]["matrixA"],
            matrix_b : this.state.apiData[0]["matrixB"],
        })
    }

    onClickExample = e =>{
        this.getData()
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

    cloneArray(initArry){
        let Arr = initArry.map( x => [...x])
        return Arr
    }

    find_x = (e) =>{

        let MatrixA = this.cloneArray(this.state.matrix_a)
        let MatrixB = [...this.state.matrix_b]
        let MatrixL = []
        let MatrixU = []
        let x = []
        let y = []
        let ans_x = []
        let n = this.state.n
        
        for(let i=0;i<n;i++){
            MatrixL.push([])
            MatrixU.push([])
            x.push(1)
            y.push(1)
            for(let j=0;j<n;j++){
                MatrixL[i][j] = 0
                if(i===j){
                    MatrixU[i][j] = 1
                }
                else{
                    MatrixU[i][j] = 0
                }
            }
        }

        for(let i=0;i<n;i++){
            for(let j=0;j<n;j++){
                let sum = 0
                for(let k=0;k<n;k++){
                    if(k!==j || i<j){
                        sum = sum + (MatrixL[i][k]*MatrixU[k][j])
                    }
                }
                if(i>=j){
                    sum = MatrixA[i][j] - sum
                    MatrixL[i][j] = sum
                }
                else{
                    sum = MatrixA[i][j] - sum
                    MatrixU[i][j] = sum/MatrixL[i][i]
                }
            }
        }

        for(let i=0;i<n;i++){
            let sum = 0
            for(let j=0;j<n;j++){
                if(i!==j){
                    sum = sum + (MatrixL[i][j]*y[j])
                }
            }
            y[i] = ((MatrixB[i] - sum) / MatrixL[i][i])
        }

        for(let i=n-1;i>=0;i--){
            let sum = 0
            for(let j=0;j<n;j++){
                if(i!==j){
                    sum = sum + (MatrixU[i][j]*x[j])
                }
            }
            x[i] = ((y[i] - sum) / MatrixU[i][i])
            // data[i] = {key:i+1, x:"x"+(i+1), value:x[i].toPrecision(10)}
        }

            
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
                <h1 className="header-content">LU Decomposition Method</h1>
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
                    <span><Button type="primary" onClick={this.onClickExample}>Example</Button></span>
                </div>

                <div style={{marginTop:'10px', marginBottom:'10px'}}>
                    <span><Button type="primary" onClick={this.find_x}>Calculation</Button></span>
                </div>
                <div style={{marginTop:'20px'}}>
                    {this.state.x}
                </div>
            </div>
        );
    }

}

export default  LUDecompositionMethod;