import React from "react"
import { Button, Input } from "antd"
import { calMultiLinearRegression, calPolynomialRegression } from "../containers/calculator"
import apis from "../containers/API"
import Desmos from "../containers/Desmos"

class MultiLinearRegression extends React.Component{

    state = {
        n : 2,
        m: 3,
        matrixX : [[], []],
        matrixY : [],
        ansX : [],
        ans : null,
        apiData: null,
        isCalculate: false,
        desmosInstance: null,
        showDesmos: 'desmos-graph-hide'
    }

    async getData(){
        let tempData = null
        await apis.getAllRegression().then(res => {tempData = res.data})
        this.setState({apiData:tempData})
        this.setState({
            n: this.state.apiData[1]["n"],
            m: this.state.apiData[1]["m"],
            matrixX : this.state.apiData[1]["matrixX"],
            matrixY : this.state.apiData[1]["matrixY"],
            ansX : this.state.apiData[1]["x"],
        })
    }

    onClickMinusN = e =>{
        let n = this.state.n
        if(n>2){
            let tmpMatrixX = this.state.matrixX
            let tmpMatrixY = this.state.matrixY
            tmpMatrixX.pop()
            tmpMatrixY.pop()
            this.setState({
                n : n-1,
                matrixX : tmpMatrixX,
                matrixY : tmpMatrixY,
            })
        }
    }

    onClickPlusN = e =>{
        if(this.state.n<9){
            let tmpMatrixX = this.state.matrixX
            let tmpMatrixY = this.state.matrixY
            tmpMatrixX.push([])
            tmpMatrixY.push(null)
            this.setState({
                n : this.state.n+1,
                matrixX : tmpMatrixX,
                matrixY : tmpMatrixY,
            })
        } 
    }

    onClickMinusM = e =>{
        if(this.state.m>2){
            let tmpMatrixX = this.state.matrixX
            let tmpAnsX = this.state.ansX
            tmpMatrixX.map(x => {x.pop()})
            tmpAnsX.pop()
            this.setState({
                m : this.state.m-1,  
                matrixX : tmpMatrixX,
                ansX : tmpAnsX
            })
        }
    }

    onClickPlusM = e =>{
        if(this.state.m<6){
            let tmpMatrixX = this.state.matrixX
            let tmpAnsX = this.state.ansX
            tmpMatrixX.map(x => {x.push(null)})
            tmpAnsX.push(null)
            this.setState({
                m : this.state.m+1,
                matrixX : tmpMatrixX,
                ansX : tmpAnsX
            })
        } 
    }

    onClickExample = e =>{
        this.getData()
    }

    onChangeMatrixX = e =>{
        let index = e.target.name.split(' ') // ['0','0']
        let tmpMatrixX = this.state.matrixX
        tmpMatrixX[parseInt(index[0])][parseInt(index[1])] = e.target.value
        this.setState({
            matrixX : tmpMatrixX
        })
    }

    onChangeMatrixY = e =>{
        let index = e.target.name
        let tmpMatrixY = this.state.matrixY
        tmpMatrixY[parseInt(index)] = e.target.value
        this.setState({
            matrixY : tmpMatrixY
        })
    }

    onChangeX = e =>{
        let index = e.target.name
        let tpmAnsX = this.state.ansX
        tpmAnsX[parseInt(index)] = e.target.value
        this.setState({
            ansX : tpmAnsX
        })
    }
    
    findE(text){
        if(text.includes('e')){
            let superScript = text.split('e')
            return superScript[0]+"*10^{"+superScript[1]+"}"
        }
        else{
           return text 
        }
        
    }

    onClickCalculation = e =>{
        let tmpMatrixX = []
        let tmpMatrixY = []
        let tmpAnsX = []

        for(let i=0;i<this.state.n;i++){
            tmpMatrixX.push([])
            for(let j=0;j<this.state.m;j++){
                tmpMatrixX[i][j] = +this.state.matrixX[i][j]
            }
            tmpMatrixY.push(+this.state.matrixY[i])
        }


        for(let i=0;i<this.state.m;i++){
            tmpAnsX.push(+this.state.ansX[i])
        }

        let tmpAns = calMultiLinearRegression(tmpMatrixX, tmpMatrixY, tmpAnsX, +this.state.m)
        
        this.setState({
            ans : tmpAns,
            isCalculate : true,
        })
    }

    showTitlteMatrix(){
        let arr = []

        for(let i=0;i<this.state.m;i++){
            arr.push(<div className="content-point-text-column">X{i+1}</div>)
        }

        arr.push(<div className="content-point-text-column">Y</div>)

        return arr
    }

    showMatrix(){
        let arr = []
        let tmpMatrixX = this.state.matrixX
        let tmpMatrixY = this.state.matrixY

        for(let i=0;i<this.state.n;i++){
            for(let j=0;j<this.state.m;j++){
                arr.push(<span className="content-point-input-column"><Input name={(i).toString()+" "+(j).toString()} onChange={this.onChangeMatrixX} autoComplete="off" value={tmpMatrixX[i][j]}/></span>)
            }
            arr.push(<span className="content-point-input-column"><Input name={(i).toString()} onChange={this.onChangeMatrixY} autoComplete="off" value={tmpMatrixY[i]}/></span>)
            arr.push(<div className="content-point-input-row"></div>)
        }

        return arr;
    }

    showX(){
        let arr = []
        let tmpAnsX = this.state.ansX

        for(let i=0;i<this.state.m;i++){
            arr.push(<span className="content-attribute-input"><Input style={{marginLeft:'5px', textAlign:'center'}} name={i.toString()} onChange={this.onChangeX} value = {this.state.ansX[i]} placeholder={"X"+(i+1)} autoComplete="off" /></span>)
        }
        return arr
    }

    showX(){
        let arr = []
        let tmpAnsX = this.state.ansX

        for(let i=0;i<this.state.m;i++){
            arr.push(<span className="content-attribute-input"><Input style={{marginLeft:'5px', textAlign:'center'}} name={i.toString()} onChange={this.onChangeX} value = {this.state.ansX[i]} placeholder={"X"+(i+1)} autoComplete="off" /></span>)
        }
        return arr
    }

    showFX(){
        let text = ""
        let tmpAnsX = this.state.ansX

        tmpAnsX.map(x => {text=text+x+","})
        
        text = text.slice(0,text.length-1)

        return text
    }

    componentDidMount() {
        const calculator = Desmos.getDesmosInstance();
        this.setState({ desmosInstance: calculator });
        this.props.setKeys(['18'])
    }
    

    render(){
        return(
            <div className="content-layout-background">
                <h1 className="content-header">Multiple Linear Regression Equation</h1>

                {/* ปุ่ม - + */}
                <div className="content-plus-minus-line"> 
                    <span className="content-plus-minus-button"><Button type="primary" onClick={this.onClickMinusN}>-</Button></span>
                    <span className="content-n-text">จำนวนข้อมูล {this.state.n}</span>
                    <span className="content-plus-minus-button"><Button type="primary" onClick={this.onClickPlusN}>+</Button></span>
                </div>

                <div className="content-plus-minus-line"> 
                    <span className="content-plus-minus-button"><Button type="primary" onClick={this.onClickMinusM}>-</Button></span>
                    <span className="content-n-text">จำนวน x {this.state.k}</span>
                    <span className="content-plus-minus-button"><Button type="primary" onClick={this.onClickPlusM}>+</Button></span>
                </div>

                {/* เมตริกซ์ใส่ค่าข้อมูล */}
                <div className="content-matrix-area">
                    {this.showTitlteMatrix()}
                </div>

                <div className="content-matrix-area">
                    <div className="content-matrix-input-area">{this.showMatrix()}</div>
                </div>

                <div className="content-attribute-input-matrix-line">
                    <span className="content-text">จุด x ที่ต้องการหาผลลัพธ์</span>
                    {/* <span className="content-attribute-input"><Input onChange={this.onChangeX} value = {this.state.x} autoComplete="off" /></span> */}
                    {this.showX()}
                </div>

                <div className="content-example-button">
                    <span><Button type="primary" onClick={this.onClickExample}>Example</Button></span>
                </div>

                <div className="content-matrix-calculate-button">
                    <span><Button type="primary" onClick={this.onClickCalculation}>Calculation</Button></span>
                </div>

                {this.state.isCalculate ?
                    <div className="content-text">f({this.showFX()}) = {this.state.ans}</div>
                    : null
                }

                <div id="desmos-calculator" className={this.state.showDesmos} />

            </div>
        );
    }

}

export default MultiLinearRegression