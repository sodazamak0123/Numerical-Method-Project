const {create, all} = require('mathjs')
const math = create(all);
math.config({number: 'BigNumber', precision: 64});

export function calBisection(initEquation, initXL, initXR, initError){

    let equation = math.parse(initEquation).compile()
    let xl = math.bignumber(initXL)
    let xr = math.bignumber(initXR)
    let error = math.bignumber(initError)
    let xm = math.divide(math.add(xl, xr), 2)
    let checkValue = math.multiply(equation.evaluate({ x: xm }), equation.evaluate({ x: xr }))
    let checkError = math.bignumber(Number.MAX_VALUE)
    let newXM = 0
    let data = []
    let pointXL = [xl.toString()]
    let pointXR = [xr.toString()]

    if (checkValue > 0) {
        xr = xm
        pointXR.push(xr.toString())

    }
    else if (checkValue < 0) {
        xl = xm
        pointXL.push(xl.toString())
    }

    data.push({x: math.round(xm,15).toString(), error: 1})

    while (math.larger(checkError, error)) {
        newXM = math.divide(math.add(xl, xr), 2)
        checkValue = math.multiply(equation.evaluate({ x: newXM }), equation.evaluate({ x: xr }))
        if (checkValue > 0) {
            xr = newXM
            pointXR.push(xr.toString())
        }
        else if (checkValue < 0) {
            xl = newXM
            pointXL.push(xl.toString())
        }
        checkError = math.abs(math.divide(math.subtract(newXM, xm), newXM))
        xm = newXM
        data.push({x: math.round(xm,15).toString(), error: math.round(checkError,15).toString()})
    }
    return {data, pointXL, pointXR}

}

export function calFalsePosition(initEquation, initXL, initXR, initError){
    
    let equation = math.parse(initEquation).compile()
    let xl = math.bignumber(initXL)
    let xr = math.bignumber(initXR)
    let error = math.bignumber(initError)
    let equationL = equation.evaluate({x:xl})
    let equationR = equation.evaluate({x:xr})
    let x = math.divide(math.subtract(math.multiply(xl, equationR), math.multiply(xr, equationL)), math.subtract(equationR, equationL))
    let checkValue = math.multiply(equation.evaluate({x:x}), equation.evaluate({x:xr}))
    let checkError = math.bignumber(Number.MAX_VALUE)
    let newX = 0
    let data = []
    let pointXL = [xl.toString()]
    let pointXR = [xr.toString()]

    if (checkValue > 0) {
        xr = x
        pointXR.push(xr.toString())
    }
    else if (checkValue < 0) {
        xl = x
        pointXL.push(xl.toString())
    }

    data.push({x: math.round(x,15).toString(), error: 1})

    while (math.larger(checkError, error)) {
        equationL = equation.evaluate({x:xl})
        equationR = equation.evaluate({x:xr})

        newX = math.divide(math.subtract(math.multiply(xl, equationR), math.multiply(xr, equationL)), math.subtract(equationR, equationL))
        
        checkValue = math.multiply(equation.evaluate({x:newX}), equationR)

        if(checkValue > 0){
            xr = newX
            pointXR.push(xr.toString())
        }
        else if (checkValue < 0) {
            xl = newX
            pointXL.push(xl.toString())
        }

        checkError = math.abs(math.divide(math.subtract(newX, x), newX))
        x = newX
        data.push({x: math.round(x,15).toString(), error: math.round(checkError,15).toString()})
    }
    return {data, pointXL, pointXR}
}

export function calOnePoint(initEquation, initX, initError){
    let equation = math.parse(initEquation).compile()
    let x = math.bignumber(initX)
    let error = math.bignumber(initError)
    let checkError = math.bignumber(Number.MAX_VALUE)
    let newX = x
    let data = []
    let pointX = []
    let pointY = []
    let iteration = 1

    while (math.larger(checkError, error)) {

        newX = math.bignumber(equation.evaluate({x:math.bignumber(x)}))
        pointX.push(x.toString())
        pointY.push(newX.toString())
        pointX.push(newX.toString())
        pointY.push(newX.toString())
        let newCheckError = math.abs(math.divide(math.subtract(newX, x), newX))
        if(iteration > 500 || (iteration > 5 && math.equal(checkError, 1))){
            data = []
            data.push({x: 'ลู่ออก', error: 'ลู่ออก'})
            break;
        }
        checkError = newCheckError
        x = newX
        data.push({x: math.round(x,15).toString(), error: math.round(checkError,15).toString()})
        iteration = iteration + 1
    }
    return {data, pointX, pointY}
}

export function calNewtonRaphson(initEquation, initX, initError){

    let equation = math.parse(initEquation).compile()
    let diffEquation = math.derivative(initEquation,'x').compile()
    let x = math.bignumber(initX)
    let error = math.bignumber(initError)
    let checkError = math.bignumber(Number.MAX_VALUE)
    let newX = x
    let data = []
    let pointX = []
    let pointY = []
    let iteration = 1

    while(math.larger(checkError, error)){

        newX = math.subtract(x, math.divide(equation.evaluate({x:x}), diffEquation.evaluate({x:x})))
        pointX.push(x.toFixed(20))
        pointY.push(0)
        pointX.push(x.toFixed(20))
        pointY.push(equation.evaluate({x:x}).toFixed(20))
        checkError = math.abs(math.divide(math.subtract(newX, x), newX))
        x = newX
        data.push({x: math.round(x,15).toString(), error: math.round(checkError,15).toString()})
        iteration = iteration + 1
    } 
    return {data, pointX, pointY}
}

export function calSecant(initEquation, initX1, initX2, initError){
    let equation = math.parse(initEquation).compile()
    let x1 = math.bignumber(initX1)
    let x2 = math.bignumber(initX2)
    let error = math.bignumber(initError)
    let checkError = math.bignumber(Number.MAX_VALUE)
    let newX
    let data = []
    let pointX = []
    let pointY = []
    let iteration = 1

    pointX.push(x1.toFixed(20))
    pointY.push(equation.evaluate({x:x1}).toFixed(20))
    pointX.push(x2.toFixed(20))
    pointY.push(equation.evaluate({x:x2}).toFixed(20))

    while(math.larger(checkError, error)){ 
        let  up = math.multiply(equation.evaluate({x:x2}), math.subtract(x2, x1))
        let down = math.subtract(equation.evaluate({x:x2}), equation.evaluate({x:x1}))
        newX = math.subtract(x2, math.divide(up, down))
        checkError = math.abs(math.divide(math.subtract(newX, x2), newX))
        pointX.push(newX.toFixed(20))
        pointY.push(0)
        pointX.push(newX.toFixed(20))
        pointY.push(equation.evaluate({x:newX}).toFixed(20))
        x1 = x2
        x2 = newX
        data.push({x: math.round(newX,15).toString(), error: math.round(checkError,15).toString()})
        iteration = iteration + 1
    }
    return {data, pointX, pointY}
}

export function calNewtonDivide(matrix, x, selectedPoint){
    let n = selectedPoint.length
    let arrX = []
    let arrFx = [[]]
    selectedPoint.map(x => {
        arrX.push(matrix[x][0])
        arrFx[0].push(matrix[x][1])
    })

    for(let i=0;i<n-1;i++){
        let dynamic = []
        for(let j=0;j<n-i-1;j++){
            let value = math.bignumber(arrFx[i][j+1])
            value = math.subtract(value,arrFx[i][j])
            let temp = math.bignumber(arrX[i+j+1])
            temp = math.subtract(temp,arrX[j])
            value = math.divide(value,temp)
            dynamic.push(value)
        }
        arrFx.push(dynamic)
    }
    let arrC = []
    let sum = math.bignumber(arrFx[0][0]);
    arrC.push(sum.toFixed(20))
    let C = math.bignumber(1);
    for(let i=0;i<n-1;i++){
        arrC.push(arrFx[i+1][0].toFixed(20))
        let temp = math.bignumber(x)
        temp = math.subtract(temp,arrX[i])
        C = math.multiply(C,temp)
        temp = math.multiply(C,arrFx[i+1][0])
        sum = math.add(sum,temp)
    }
    return { ans : sum.toString(), C : arrC}
}

export function calLagrange(matrix, x, selectedPoint){
    let n = selectedPoint.length
    let arrX = []
    let arrFx = []
    selectedPoint.map(x => {
        arrX.push(matrix[x][0])
        arrFx.push(matrix[x][1])
    })

    let sum = 0
    let arrL = []
    for(let i=0;i<n;i++){
        let mulUp = 1
        let mulDown = 1
        for(let j=0;j<n;j++){
            if(i!=j){
                mulUp = math.multiply(math.subtract(math.bignumber(x), arrX[j]), mulUp)
                mulDown = math.multiply(math.subtract(math.bignumber(arrX[i]), arrX[j]), mulDown)
            }
        }
        arrL.push(math.divide(mulUp, mulDown).toFixed(20))
        sum = math.add(sum, math.multiply(math.divide(mulUp, mulDown), arrFx[i]))
    }
    return { ans : sum.toString(), L : arrL}
}

function sumMulti(arr,x,n,y,m,size){
    let sum = 0
    for(let i = 0;i<size;i++){
        sum = sum + ((arr[i][x]**n)*(arr[i][y]**m))
    }
    return sum
}

function sumSingle(arr,x,n,size){
    let sum = 0
    for(let i = 0;i<size;i++){
        sum = sum + (arr[i][x]**n)
    }
    return sum
}

export function calSpline(matrix, x){

    let Spline = require('cubic-spline');

    let xs = []
    let ys = []

    matrix.map((x,i) => {
        xs.push(x[0])
        ys.push(x[1])
    })

    let spline = new Spline(xs, ys);

    return spline.at(+x)

}


export function calRegression(matrix, matrixX, k, m){

    let d = (k*m)+1
    let patternM = []

    for(let i=0;i<d;i++){
        patternM.push([])
        for(let j=0;j<d+1;j++){
            if(i==0&&j==0){
                patternM[i][j] = matrix.length
            }
            else if(i==0&&j==d){
                patternM[i][j] = sumSingle(matrix, m, 1, matrix.length)
            }
            else if(i==0){
                let degreex = parseInt(j)
                console.log(degreex)
                patternM[i][j] = sumSingle(matrix, (j-1)%m, degreex, matrix.length)
            }
            else if(i>j){
                patternM[i][j] = patternM[j][i]
            }
            else if(j==d){
                let degreex = parseInt(i)
                patternM[i][j] = sumMulti(matrix, (i-1)%m, degreex, m, 1, matrix.length)
            }
            else{
                let degreex = parseInt(i)
                let degreey = parseInt(j)
                patternM[i][j] = sumMulti(matrix, (i-1)%m, degreex, (j-1)%m, degreey, matrix.length)
            }
        }
    
    }

    let matrixA = []
    let matrixB = []

    for(let i=0;i<patternM.length;i++){
        matrixA.push([])
        matrixA[i] = patternM[i].slice(0,patternM[0].length-1)
        matrixB[i] = patternM[i][patternM[0].length-1]
    }

    console.log(matrixA)
    console.log(patternM)

    let invMatrixA = math.inv(matrixA)
    let matrixC = math.multiply(invMatrixA, matrixB)

    let sum = matrixC[0]

    for(let i=1;i<matrixC.length;i++){
        sum = sum + (matrixC[i]*(matrixX[(i-1)%m]**i))
    }
    
    for(let i=0;i<matrixC.length;i++){
        matrixC[i] = matrixC[i].toString()
    }
 
    console.log(matrixC)
    return {ans: sum.toString(), C: matrixC}

}

