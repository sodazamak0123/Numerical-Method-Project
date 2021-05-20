import React from "react"
import { Button, Input } from "antd"
import { calRegression } from "../containers/calculator"
import apis from "../containers/API"
import Desmos from "../containers/Desmos"

class Regression extends React.Component{

    state = {
        n : 2,
        m: 1,
        k: 1,
        matrix : [[],[]],
        x : null,
        ans : null,
        apiData: null,
        isCalculate: false,
        desmosInstance: null
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

        let tmpMatrixX = this.state.x.split(',')

        for(let i=0;i<this.state.m;i++){
            tmpMatrixX[i] = +tmpMatrixX[i]
        }


        let tmpAns = calRegression(tmpMatrix, tmpMatrixX, +this.state.k, +this.state.m)

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
            desmosInstance : tmpDesmosInstance
        })

    }

    showMatrix(){
        let arr = []
        let tmpMatrix = this.state.matrix;
        for(let i=0;i<this.state.n;i++){
            for(let j=0;j<2;j++){
                arr.push(<span style={{margin:'2.5px'}}><Input name={(i).toString()+" "+(j).toString()} style={{width:'100px',textAlign:'center'}} onChange={this.onChangeMatrix} autoComplete="off" value={tmpMatrix[i][j]}/></span>)
            }
            arr.push(<div style={{margin:'5px'}}></div>)
        }
        return(arr);
    }

    componentDidMount() {
        const calculator = Desmos.getDesmosInstance();
        
        this.setState({ desmosInstance: calculator });

    }
    

    render(){
        return(
            <div className="site-layout-background">
                <h1 className="header-content">Regression Equation</h1>

                {/* ปุ่ม - + */}
                <div style={{marginBottom:'10px'}}> 
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.onClickMinusN}>-</Button></span>
                    <span style={{marginLeft:'10px', fontSize:'20px'}}>จำนวนข้อมูล {this.state.n}</span>
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.onClickPlusN}>+</Button></span>
                </div>

                <div style={{marginBottom:'10px'}}> 
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.onClickMinusK}>-</Button></span>
                    <span style={{marginLeft:'10px', fontSize:'20px'}}>ยกกำลัง {this.state.k}</span>
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.onClickPlusK}>+</Button></span>
                </div>

                <div style={{marginBottom:'10px'}}> 
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.onClickMinus}>-</Button></span>
                    <span style={{marginLeft:'10px', fontSize:'20px'}}>จำนวนของ x {this.state.m}</span>
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.onClickPlus}>+</Button></span>
                </div>

                {/* เมตริกซ์ใส่ค่าข้อมูล */}
                <div style={{display:'flex',flexFlow:'row'}}>
                    <div style={{marginRight:'100px'}}>X</div>
                    <div>Y</div>
                </div>
                <div style={{display:'flex',flexFlow:'row'}}>
                    <div style={{alignItems:'center'}}>{this.showMatrix()}</div>
                    {/* <div style={{display:'flex', alignItems:'center', fontSize:'25px',marginLeft:'10px', marginRight:'10px'}}>X =</div>
                    <div style={{alignItems:'center'}}>{this.matrix_X_show()}</div>
                    <div style={{display:'flex', alignItems:'center', fontSize:'25px',marginLeft:'10px', marginRight:'10px'}}>b =</div>
                    <div style={{alignItems:'center'}}>{this.matrix_B_show()}</div> */}
                </div>

                <div>
                    จุด x ที่ต้องการหาผลลัพธ์
                    <Input style={{width:'100px',textAlign:'center', marginLeft:'10px'}} onChange={this.onChangeX} value = {this.state.x} autoComplete="off" />
                </div>

                <div style={{marginTop:'10px'}}>
                    <span><Button type="primary" onClick={this.onClickExample}>Example</Button></span>
                </div>

                <div style={{marginTop:'10px', marginBottom:'10px'}}>
                    <span><Button type="primary" onClick={this.onClickCalculation}>Calculation</Button></span>
                </div>

                {this.state.isCalculate ?
                    <div style={{marginTop:'10px'}}>f({this.state.x}) = {this.state.ans['ans']}</div>
                    : null
                }

                <div id="desmos-calculator" style={{ height: "600px" }} />

            </div>
        );
    }

}

export default Regression