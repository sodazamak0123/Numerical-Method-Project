import React from 'react';
import {Input, Button} from 'antd';
import './Content.css';
import {Decimal} from 'decimal.js';
import apis from "../containers/API"
import { create, all } from 'mathjs'

const config = { }
const math = create(all, config)

class GaussSeidel extends React.Component{

    state = {
        n:2,
        matrix_a:[[],[]],
        matrix_b:[null,null],
        x : null,
        error: null,
        ifer:null,
    }

    async getData(){
        let tempData = null
        await apis.getAllMatrix().then(res => {tempData = res.data})
        this.setState({apiData:tempData})
        this.setState({
            n: this.state.apiData[1]["n"],
            matrix_a : this.state.apiData[1]["matrixA"],
            matrix_b : this.state.apiData[1]["matrixB"],
            error : this.state.apiData[1]["error"]
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

    input_error = (e) =>{
        this.setState({error:e.target.value});
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
        let error = parseFloat(this.state.error)
        let x = []
        let tmpX = []
        let ans_x = []
        let checkError = true
        let n = this.state.n
        let iteration = 1

        for(let i=0;i<n;i++){
            x.push(1)
            tmpX.push(1)
        }

        while(checkError){

            if(iteration > 500){
                x.map((x, i) => ans_x.push({key:i+1, x:"x"+(i+1), value:"ไม่สามารถหาค่าได้"}))
                return
            }

            checkError = false

            for(let i=0;i<n;i++){

                let sum = 0
                for(let j=0;j<n;j++){
                    if(i!==j){
                        sum = sum + MatrixA[i][j]*x[j]
                    }
                }
                tmpX[i] = (MatrixB[i]-sum)/MatrixA[i][i]
                
                let tmpErr = Math.abs((tmpX[i]-x[i])/tmpX[i])
                if(tmpErr > error){
                    checkError = true
                }
            }

            x = tmpX.map(x => x)
            iteration = iteration + 1
        }
    
        for(let i=0;i<n;i++){
            ans_x.push(<div style={{fontSize:'40px',fontWeight:'bold'}}>Result of x{i+1} is {parseFloat(x[i])}</div>);
        }
        this.setState({x:ans_x})
    }


    render(){
        return(
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }}>
                <h1 className="header-content">Gauss Seidel Method</h1>
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

                <div style={{display:'flex', alignItems:'center', fontSize:'25px'}}>
                    Error
                    <Input style={{width:'100px',textAlign:'center', marginLeft:'10px'}} onChange={this.input_error} value = {this.state.error} autoComplete="off" />
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

export default  GaussSeidel;