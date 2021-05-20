import React from 'react';
import { Input, Button, Table } from 'antd';
import '../App.css';
import apis from "../containers/API"
import Desmos from "../containers/Desmos"
import DESMOS from 'desmos'
import math2latex from 'asciimath-to-latex'
import { calNewtonRaphson, calSecant } from '../containers/calculator'

class NewtonRaphson extends React.Component{

    state = {
        equation:'',
        initX1:null,
        initX2:null,
        er:null,
        isError:null,
        isCal:false,
        desmosInstance:null,
        columns: [
            {
                title: 'Iteration',
                dataIndex: 'iteration',
                key: 'iteration',
              },
              {
                title: 'X',
                dataIndex: 'x',
                key: 'x',
              },
              {
                title: 'Error',
                dataIndex: 'error',
                key: 'error',
              }
        ],
        dataSource:[],
        showDesmos: 'desmos-graph-hide'
    };

    async getData(){
        let tempData = null
        await apis.getAllRootOfEquation().then(res => {tempData = res.data})
        this.setState({apiData:tempData})
        this.setState({
            equation: this.state.apiData[3]["equation"],
            initX1 : this.state.apiData[3]["xl"],
            initX2 : this.state.apiData[3]["xr"],
            er : this.state.apiData[3]["error"],
        })
    }

    onClickExample = e =>{
        this.getData()
    }

    onChangeEquation = e => {
        this.setState({equation: e.target.value});
    }
    onChangeInitX1 = e => {
        this.setState({initX1: e.target.value});
    }
    onChangeInitX2 = e => {
        this.setState({initX2: e.target.value});
    }
    onChangeER = e => {
        this.setState({er: e.target.value});
    }

    onClickCalculate = e => {

        if (this.state.equation === '') {
            this.setState({ isError: (<div className="content-equation-error">โปรดใส่ฟังก์ชั่น</div>) })
            return;
        }

        try {

            this.setState({ isError: null })
            let {data, pointX, pointY} = calSecant(this.state.equation, this.state.initX1, this.state.initX2, this.state.er)
            let arr = []
            data.map((x, i) => {
                arr.push({
                    key: i+1,
                    iteration: i+1,
                    x: x['x'],
                    error: x['error']
                })
            })

            let tmpInstance = this.state.desmosInstance
            let tmpEquation = "f(x) = "+this.state.equation
            tmpInstance.setExpression({ id: 'graph1', latex: math2latex(tmpEquation) })
            tmpInstance.setExpression({
                id: 'plot1',
                type: 'table',
                columns: [
                  {
                    latex: 'x',
                    values: pointX
                  },
                  {
                    latex: 'y',
                    values: pointY,
                    lines: true,
                    color: DESMOS.Colors.BLACK
                  }
                ]
            });
            this.setState({
                dataSource: arr,
                isCal: true,
                desmosInstance: tmpInstance,
                showDesmos: 'desmos-graph-show'
            });

        } catch (error) {
            this.setState({ isError: (<div className="content-equation-error">ใส่ฟังก์ชั่นไม่ถูกต้อง</div>) })
        }
    };

    componentDidMount() {
        this.props.setKeys(['6'])
        const calculator = Desmos.getDesmosInstance();
        this.setState({ desmosInstance: calculator });
    }

    render(){
        return(
            <div className="content-layout-background">
                <h1 className="content-header">Secant Method</h1>
                <div> 
                    <span><Input className="content-equation-input" placeholder="x^2-7" onChange={this.onChangeEquation} value = {this.state.equation}/></span>
                    <span className="content-calculate-button"><Button className="content-calculate-button" type="primary" onClick={this.onClickCalculate}>Calculation</Button></span>
                    {this.state.isError}
                </div>
                <div className="content-attribute-input-line">
                    <span className="content-text">Initial X1 =</span>
                    <span className="content-attribute-input"><Input placeholder="1.0" onChange={this.onChangeInitX1} value = {this.state.initX1}/></span>
                    <span className="content-text">Initial X2 =</span>
                    <span className="content-attribute-input"><Input placeholder="1.0" onChange={this.onChangeInitX2} value = {this.state.initX2}/></span>
                    <span className="content-text">Error =</span>
                    <span className="content-attribute-input"><Input placeholder="0.00001" onChange={this.onChangeER} value = {this.state.er}/></span>
                </div>
                <div className="content-attribute-input-line">
                    <span className="content-example-button"><Button type="primary" onClick={this.onClickExample}>Example</Button></span>
                </div>
                {this.state.isCal ?
                    <div>
                        <Table className="content-table" dataSource={this.state.dataSource} columns={this.state.columns} />
                    </div>
                    : null
                }
                <div id="desmos-calculator" className={this.state.showDesmos} />
            </div>
        );
    }

}

export default  NewtonRaphson;