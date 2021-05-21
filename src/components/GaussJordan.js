import React from 'react';
import { Input, Button, Table } from 'antd';
import './Content.css';
import apis from "../containers/API"
import { create, all } from 'mathjs'
import { calGaussJordan } from '../containers/calculator';

const config = { }
const math = create(all, config)


class GaussJordan extends React.Component{

    state = {
        n:2,
        matrixA:[[],[]],
        matrixB:[null,null],
        x : null,
        ifer:null,
        isCal:false,
        columns: [
            {
                title: 'X',
                dataIndex: 'x',
                key: 'x',
              },
              {
                title: 'Value',
                dataIndex: 'value',
                key: 'value',
              }
        ],
        dataSource:[]
    }

    async getData(){
        let tempData = null
        await apis.getAllMatrix().then(res => {tempData = res.data})
        this.setState({apiData:tempData})
        this.setState({
            n: this.state.apiData[0]["n"],
            matrixA : this.state.apiData[0]["matrixA"],
            matrixB : this.state.apiData[0]["matrixB"],
        })
    }

    onClickExample = e =>{
        this.getData()
    }

    onChangeMatrixA = (e) =>{
        let name = e.target.name.split(" ");
        let arr = this.state.matrixA;
        let index0 = parseInt(name[0]);
        let index1 = parseInt(name[1]);
        arr[index0][index1] = e.target.value;
        this.setState({matrixA:arr});
    }

    onChangeMatrixB = (e) =>{
        let name = e.target.name;
        let arr = this.state.matrixB;
        let index = parseInt(name);
        arr[index] = e.target.value;
        this.setState({matrixB:arr});
    }

    showMatrixA =()=>{
        let arr = []
        let number = this.state.matrixA;
        for(let i=0;i<this.state.n;i++){
            for(let j=0;j<this.state.n;j++){
                arr.push(<span className="content-matrix-input-column"><Input name={(i).toString()+" "+(j).toString()} onChange={this.onChangeMatrixA} autocomplete="off" value={number[i][j]}/></span>)
            }
            arr.push(<div className="content-matrix-input-row"></div>)
        }
        return(arr);
    }

    showMatrixX =()=>{
        let arr = []
        for(let i=0;i<this.state.n;i++){
            arr.push(<span className="content-matrix-input-column"><Input value={"x"+(i+1)} disabled/></span>)
            arr.push(<div className="content-matrix-input-row"></div>)
        }
        return(arr);
    }

    showMatrixB =()=>{
        let arr = []
        let number = this.state.matrixB
        for(let i=0;i<this.state.n;i++){
            arr.push(<span className="content-matrix-input-column"><Input name={(i).toString()} onChange={this.onChangeMatrixB} autocomplete="off" value={number[i]}/></span>)
            arr.push(<div className="content-matrix-input-row"></div>)
        }
        return(arr);
    }


    onClickPlus = (e) =>{
        let n = this.state.n
        if(n<8){
            let arrA = this.state.matrixA
            let arrB = this.state.matrixB
            arrA.push([])
            arrA.map(x => {x.push(null)})
            arrB.push(null)
            this.setState({
                n:n+1,
                matrixA: arrA,
                matrixB: arrB,
            })
        }
    }

    onClickMinus = (e) =>{
        let n = this.state.n;
        if(n>2){
            let arrA = this.state.matrixA
            let arrB = this.state.matrixB
            arrA.pop()
            arrA.map(x => {x.pop()})
            arrB.pop()
            this.setState({
                n:n-1,
                matrixA: arrA,
                matrixB: arrB,
            })
        }
    }


    onClickCalculate = (e) =>{

        try{
            this.setState({ifer:null})
            let { data } = calGaussJordan(this.state.n, this.state.matrixA, this.state.matrixB)
            let arr = []
            data.map((x, i) => {
                arr.push({
                    key: i+1,
                    x: 'X'+(i+1),
                    value: x['value']
                })
            })
            this.setState({
                dataSource: arr,
                isCal: true
            })
        }
        catch (error){
            this.setState({ifer:(<div className="content-equation-error">โปรดใส่ข้อมูลให้ถูกต้อง</div>)})
        }
    }

    componentDidMount() {
        this.props.setKeys(['9'])
    }

    render(){
        return(
            <div className="content-layout-background">
                <h1 className="content-header">Gauss Jordan Method</h1>
                <div className="content-plus-minus-line"> 
                    <span className="content-plus-minus-button"><Button type="primary" onClick={this.onClickMinus}>-</Button></span>
                    <span className="content-n-text">{this.state.n} x {this.state.n}</span>
                    <span className="content-plus-minus-button"><Button type="primary" onClick={this.onClickPlus}>+</Button></span>
                </div>
                <div className="content-matrix-area">
                    <div className="content-matrix-text-start">A =</div>
                    <div className="content-matrix-input-area">{this.showMatrixA()}</div>
                    <div className="content-matrix-text">X =</div>
                    <div className="content-matrix-input-area">{this.showMatrixX()}</div>
                    <div className="content-matrix-text">B =</div>
                    <div className="content-matrix-input-area">{this.showMatrixB()}</div>
                </div>
                <div>
                    {this.state.ifer}
                </div>
                <div className="content-example-button">
                    <span><Button type="primary" onClick={this.onClickExample}>Example</Button></span>
                </div>

                <div className="content-matrix-calculate-button">
                    <span><Button type="primary" onClick={this.onClickCalculate}>Calculation</Button></span>
                </div>
                {this.state.isCal ?
                    <div>
                        <Table className="content-table" dataSource={this.state.dataSource} columns={this.state.columns} />
                    </div>
                    : null
                }
            </div>
        );
    }

}

export default  GaussJordan;