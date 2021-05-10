import React from "react"
import { Button, Input } from "antd"
import { calInterpolation } from "../containers/calculator"
import apis from "../containers/API"

class NewtonDivide extends React.Component{

    state = {
        n : 2,
        matrix : [[],[]],
        selectedPoint : null,
        x : null,
        ans : null,
        apiData: null,
    }

    async getData(){
        let tempData = null
        await apis.getAllInterpolation().then(res => {tempData = res.data})
        this.setState({apiData:tempData})
        this.setState({
            n: this.state.apiData[0]["n"],
            matrix : this.state.apiData[0]["matrix"],
            selectedPoint : this.state.apiData[0]["selectedPoint"],
            x : this.state.apiData[0]["x"],
        })
    }

    onClickMinus = e =>{
        if(this.state.n>2){
            let tmpMatrix = this.state.matrix
            tmpMatrix.pop([])
            this.setState({
                n : this.state.n-1,
                matrix : tmpMatrix
            })
        }
    }

    onClickPlus = e =>{
        if(this.state.n<8){
            let tmpMatrix = this.state.matrix
            tmpMatrix.push([])
            this.setState({
                n : this.state.n+1,
                matrix : tmpMatrix
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

    onChangeSelectedPoint = e =>{
        this.setState({
            selectedPoint : e.target.value
        })
    }

    onChangeX = e =>{
        this.setState({
            x : e.target.value
        })
    }

    onClickCalculation = e =>{
        let tmpMatrix = []
        for(let i=0;i<this.state.n;i++){
            tmpMatrix.push([])
            for(let j=0;j<2;j++){
                tmpMatrix[i][j] = +this.state.matrix[i][j]
            }
        }

        let tmpSelectPoint = this.state.selectedPoint.split(",")
        tmpSelectPoint = tmpSelectPoint.map(x => (+x)-1)

        this.setState({
            ans : calInterpolation(tmpMatrix, +this.state.x, tmpSelectPoint)
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
    

    render(){
        return(
            <div className="site-layout-background">
                <h1 className="header-content">Newton Divide</h1>

                {/* ปุ่ม - + */}
                <div style={{marginBottom:'10px'}}> 
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.onClickMinus}>-</Button></span>
                    <span style={{marginLeft:'10px', fontSize:'20px'}}>{this.state.n}</span>
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.onClickPlus}>+</Button></span>
                </div>

                {/* เมตริกซ์ใส่ค่าข้อมูล */}
                <div style={{display:'flex',flexFlow:'row'}}>
                    <div>X</div>
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
                    จุดที่ต้องการใช้คำนวณ
                    <Input style={{width:'100px',textAlign:'center'}} onChange={this.onChangeSelectedPoint} value = {this.state.selectedPoint} autoComplete="off" />
                </div>

                <div>
                    จุดที่ x ต้องการหาผลลัพธ์
                    <Input style={{width:'100px',textAlign:'center'}} onChange={this.onChangeX} value = {this.state.x} autoComplete="off" />
                </div>

                <div style={{marginTop:'10px'}}>
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.onClickCalculation}>Calculation</Button></span>
                </div>

                <div style={{marginTop:'10px'}}>
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.onClickExample}>Example</Button></span>
                </div>

                <div>
                    {this.state.ans}
                </div>

            </div>
        );
    }

}

export default NewtonDivide