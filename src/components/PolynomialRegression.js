import React from "react"
import { Button, Input } from "antd"
import { calPolynomialRegression } from "../containers/calculator"
import apis from "../containers/API"
import Desmos from "../containers/Desmos"

class PolynomialRegression extends React.Component{

    state = {
        n : 2,
        k: 1,
        matrix : [[],[]],
        x : null,
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
            n: this.state.apiData[0]["n"],
            matrix : this.state.apiData[0]["matrix"],
            selectedPoint : this.state.apiData[0]["selectedPoint"],
            x : ""+this.state.apiData[0]["x"],
        })
    }

    onClickMinusN = e =>{
        let n = this.state.n
        if(n>2){
            let tmpMatrix = this.state.matrix
            tmpMatrix.pop([])
            this.setState({
                n : n-1,
                matrix : tmpMatrix
            })
            n = n-1
            if(this.state.k>=n){
                this.setState({
                    k: n-1
                })
            }
        }
    }

    onClickPlusN = e =>{
        if(this.state.n<9){
            let tmpMatrix = this.state.matrix
            tmpMatrix.push([])
            this.setState({
                n : this.state.n+1,
                matrix : tmpMatrix
            })
        } 
    }

    onClickMinusK = e =>{
        if(this.state.k>1){
            this.setState({
                k : this.state.k-1,  
            })
        }
    }

    onClickPlusK = e =>{
        if(this.state.k<this.state.n-1){
            this.setState({
                k : this.state.k+1,
            })
        } 
    }

    onClickExample = e =>{
        this.getData()
    }

    onChangeMatrix = e =>{
        let index = e.target.name.split(' ') // ['0','0']
        let tmpMatrix = this.state.matrix
        tmpMatrix[parseInt(index[0])][parseInt(index[1])] = e.target.value
        this.setState({
            matrix : tmpMatrix
        })
        console.log(this.state.matrix)
    }

    onChangeX = e =>{
        this.setState({
            x : e.target.value
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
        let tmpMatrix = []
        let tmpDesmosInstance = this.state.desmosInstance
        let equation = "f(x)="

        for(let i=0;i<this.state.n;i++){
            tmpMatrix.push([])
            for(let j=0;j<2;j++){
                tmpMatrix[i][j] = +this.state.matrix[i][j]
            }
        }

        // let tmpMatrixX = this.state.x.split(',')

        // for(let i=0;i<this.state.m;i++){
        //     tmpMatrixX[i] = +tmpMatrixX[i]
        // }


        let tmpAns = calPolynomialRegression(tmpMatrix, +this.state.x, +this.state.k)

        equation = equation + tmpAns['C'][0] + "+" 

        for(let i=1;i<tmpAns['C'].length;i++){
            equation = equation + "(" + this.findE(tmpAns['C'][i]) + ")(x^{" + i + "})"
            if(i < tmpAns['C'].length-1){
                equation = equation + " + "
            }
        }


        let plot = ""

        for(let i=0;i<tmpMatrix.length;i++){
            plot = plot + "(" + tmpMatrix[i][0] + "," + tmpMatrix[i][1] + ")"
            if(i < tmpMatrix.length-1){
                plot = plot + ", "
            }
        }

        let xMin = tmpMatrix[0][0]
        let xMax = tmpMatrix[0][0]
        let yMin = tmpMatrix[0][1]
        let yMax = tmpMatrix[0][1]

        for(let i=1;i<tmpMatrix.length;i++){
            if(tmpMatrix[i][0] < xMin){
                xMin = tmpMatrix[i][0]
            }
            if(tmpMatrix[i][0] > xMax){
                xMax = tmpMatrix[i][0]
            }
            if(tmpMatrix[i][1] < yMin){
                yMin = tmpMatrix[i][1]
            }
            if(tmpMatrix[i][1] > yMax){
                yMax = tmpMatrix[i][1]
            }
        }
        
        tmpDesmosInstance.setExpression({ id: 'graph1', latex: equation })
        tmpDesmosInstance.setExpression({ id: 'graph2', latex: plot , showLabel: true})
        tmpDesmosInstance.setExpression({ id: 'graph3', latex: "(" + this.state.x + ", f("+this.state.x+"))" , showLabel: true})
        tmpDesmosInstance.setMathBounds({ left: xMin,right: xMax, bottom: yMin,top: yMax});
        
        this.setState({
            ans : tmpAns,
            isCalculate : true,
            desmosInstance : tmpDesmosInstance,
            showDesmos: 'desmos-graph-show'
        })

    }

    showMatrix(){
        let arr = []
        let tmpMatrix = this.state.matrix;
        for(let i=0;i<this.state.n;i++){
            for(let j=0;j<2;j++){
                arr.push(<span className="content-point-input-column"><Input name={(i).toString()+" "+(j).toString()} onChange={this.onChangeMatrix} autoComplete="off" value={tmpMatrix[i][j]}/></span>)
            }
            arr.push(<div className="content-point-input-row"></div>)
        }
        return(arr);
    }

    componentDidMount() {
        const calculator = Desmos.getDesmosInstance();
        this.setState({ desmosInstance: calculator });
        this.props.setKeys(['17'])

    }
    

    render(){
        return(
            <div className="content-layout-background">
                <h1 className="content-header">Polynomial Regression Equation</h1>

                {/* ปุ่ม - + */}
                <div className="content-plus-minus-line"> 
                    <span className="content-plus-minus-button"><Button type="primary" onClick={this.onClickMinusN}>-</Button></span>
                    <span className="content-n-text">จำนวนข้อมูล {this.state.n}</span>
                    <span className="content-plus-minus-button"><Button type="primary" onClick={this.onClickPlusN}>+</Button></span>
                </div>

                <div className="content-plus-minus-line"> 
                    <span className="content-plus-minus-button"><Button type="primary" onClick={this.onClickMinusK}>-</Button></span>
                    <span className="content-n-text">ยกกำลัง {this.state.k}</span>
                    <span className="content-plus-minus-button"><Button type="primary" onClick={this.onClickPlusK}>+</Button></span>
                </div>

                {/* <div style={{marginBottom:'10px'}}> 
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.onClickMinus}>-</Button></span>
                    <span style={{marginLeft:'10px', fontSize:'20px'}}>จำนวนของ x {this.state.m}</span>
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.onClickPlus}>+</Button></span>
                </div> */}

                {/* เมตริกซ์ใส่ค่าข้อมูล */}
                <div className="content-matrix-area">
                    <div className="content-point-text-column">X</div>
                    <div className="content-point-text-column">Y</div>
                </div>
                <div className="content-matrix-area">
                    <div className="content-matrix-input-area">{this.showMatrix()}</div>
                </div>

                <div className="content-attribute-input-matrix-line">
                    <span className="content-text">จุด x ที่ต้องการหาผลลัพธ์</span>
                    <span className="content-attribute-input"><Input style={{width:'100px',textAlign:'center', marginLeft:'10px'}} onChange={this.onChangeX} value = {this.state.x} autoComplete="off" /></span>
                </div>

                <div className="content-example-button">
                    <span><Button type="primary" onClick={this.onClickExample}>Example</Button></span>
                </div>

                <div className="content-matrix-calculate-button">
                    <span><Button type="primary" onClick={this.onClickCalculation}>Calculation</Button></span>
                </div>

                {this.state.isCalculate ?
                    <div className="content-text">f({this.state.x}) = {this.state.ans['ans']}</div>
                    : null
                }

                <div id="desmos-calculator" className={this.state.showDesmos} />

            </div>
        );
    }

}

export default PolynomialRegression