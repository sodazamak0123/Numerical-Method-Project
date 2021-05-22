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

    if (math.larger(checkValue, 0)) {
        xr = xm
        pointXR.push(xr.toString())
        console.log('XR')

    }
    else if (math.larger(0, checkValue)) {
        xl = xm
        pointXL.push(xl.toString())
        console.log('XL')
    }

    data.push({x: math.round(xm,15).toString(), error: 1})

    while (math.larger(checkError, error)) {
        newXM = math.divide(math.add(xl, xr), 2)
        checkValue = math.multiply(equation.evaluate({ x: newXM }), equation.evaluate({ x: xr }))
        if (math.larger(checkValue, 0)) {
            xr = newXM
            pointXR.push(xr.toString())
            console.log('XR')
        }
        else if(math.larger(0, checkValue)) {
            xl = newXM
            pointXL.push(xl.toString())
            console.log('XL')
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

    if (math.larger(checkValue, 0)) {
        xr = x
        pointXR.push(xr.toString())
    }
    else if (math.larger(0, checkValue)) {
        xl = x
        pointXL.push(xl.toString())
    }

    data.push({x: math.round(x,15).toString(), error: 1})

    while (math.larger(checkError, error)) {
        equationL = equation.evaluate({x:xl})
        equationR = equation.evaluate({x:xr})

        newX = math.divide(math.subtract(math.multiply(xl, equationR), math.multiply(xr, equationL)), math.subtract(equationR, equationL))
        
        checkValue = math.multiply(equation.evaluate({x:newX}), equationR)

        if(math.larger(checkValue, 0)){
            xr = newX
            pointXR.push(xr.toString())
        }
        else if(math.larger(0, checkValue)) {
            xl = newX
            pointXL.push(xl.toString())
        }

        checkError = math.abs(math.divide(math.subtract(newX, x), newX))
        x = newX
        data.push({x: math.round(x,15).toString(), error: math.round(checkError,15).toString()})
    }
    return {data, pointXL, pointXR}
}

export function checkEinText(text){
    if(text.includes('e')){
        let tmpText = text.split('e')
        return tmpText[0] + "*10^{" + tmpText[1] + "}"
    }else{
        return text
    }
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
        pointX.push(checkEinText(x.toString()))
        pointY.push(checkEinText(newX.toString()))
        pointX.push(checkEinText(newX.toString()))
        pointY.push(checkEinText(newX.toString()))
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
    return { data, pointX, pointY }
}

export function cloneMatrix(intitMatrix){
    let arr = intitMatrix.map(x => [...x])
    return arr
}

export function calCramerRule(n, initMatrixA, initMatrixB){

    let matrixA = cloneMatrix(initMatrixA)
    let matrixB = [...initMatrixB]
    let detA = math.bignumber(math.det(matrixA))
    let x
    let data = []
    for(let i=0;i<n;i++){
        for(let j=0;j<n;j++){
            matrixA[j][i] = matrixB[j]
        }

        x = math.divide(math.bignumber(math.det(matrixA)), detA)
        data.push({value: math.round(x,15).toString()})

        for(let j=0;j<n;j++){
            matrixA[j][i] = math.bignumber(initMatrixA[j][i])
        }
    }
    return { data }
}

export function calGaussElimination(n, initMatrixA, initMatrixB){

    let matrixA = cloneMatrix(initMatrixA)
    let matrixB = [...initMatrixB]
    let data = []
    let x = []
    for(let i=1;i<n;i++){
        for(let j=i;j<n;j++){

            let divide = math.bignumber(matrixA[i-1][i-1])
            let multi = math.bignumber(matrixA[j][i-1])

            for(let k =i-1;k<n;k++){
                matrixA[j][k] = math.subtract(matrixA[j][k], math.multiply(math.divide(matrixA[i-1][k], divide), multi))
            }
            matrixB[j] = math.subtract(matrixB[j], math.multiply(math.divide(matrixB[i-1], divide), multi))
        }
    }

    for(let i=0;i<n;i++){
        x.push(math.bignumber(1))
    }

    for(let i=n-1;i>=0;i--){

        let sum = math.bignumber(0)
        for(let j=0;j<n;j++){

            if(i!==j){
                sum = math.add(sum, math.multiply(matrixA[i][j], x[j]))
            } 

        }
        x[i] = math.divide(math.subtract(matrixB[i], sum), matrixA[i][i])
        data[i] = {value: math.round(x[i],15).toString()}
    }

    return { data }
}

export function calGaussJordan(n, initMatrixA, initMatrixB){

    let matrixA = cloneMatrix(initMatrixA)
    let matrixB = [...initMatrixB]
    let data = []
    let x = []

    for(let i=1;i<n;i++){
        for(let j=i;j<n;j++){

            let divide = math.bignumber(matrixA[i-1][i-1])
            let multi = math.bignumber(matrixA[j][i-1])

            for(let k =i-1;k<n;k++){
                matrixA[j][k] = math.subtract(matrixA[j][k], math.multiply(math.divide(matrixA[i-1][k], divide), multi))
            }

            matrixB[j] = math.subtract(matrixB[j], math.multiply(math.divide(matrixB[i-1], divide), multi))
        }
    }

    for(let i=n-2;i>=0;i--){

        for(let j=i;j>=0;j--){

            let divide = math.bignumber(matrixA[i+1][i+1])
            let multi = math.bignumber(matrixA[j][i+1])

            for(let k=n-1;k>=i;k--){
                matrixA[j][k] = math.subtract(matrixA[j][k], math.multiply(math.divide(matrixA[i+1][k], divide), multi))
            }
            matrixB[j] = math.subtract(matrixB[j], math.multiply(math.divide(matrixB[i+1], divide), multi))
        }
    }

    for(let i=0;i<n;i++){
        x.push(math.divide(matrixB[i], matrixA[i][i]))
        data.push({value: math.round(x[i],15).toString()})
    }

    return { data }
}

export function calLUDecomposition(n, initMatrixA, initMatrixB){
    
    let matrixA = cloneMatrix(initMatrixA)
    let matrixB = [...initMatrixB]
    let matrixL = []
    let matrixU = []
    let x = []
    let y = []
    let data = []
    
    for(let i=0;i<n;i++){
        matrixL.push([])
        matrixU.push([])
        x.push(math.bignumber(1))
        y.push(math.bignumber(1))
        for(let j=0;j<n;j++){
            matrixL[i][j] = math.bignumber(0)
            if(i===j){
                matrixU[i][j] = math.bignumber(1)
            }
            else{
                matrixU[i][j] = math.bignumber(0)
            }
        }
    }

    for(let i=0;i<n;i++){
        for(let j=0;j<n;j++){
            let sum = math.bignumber(0)
            for(let k=0;k<n;k++){
                if(k!==j || i<j){
                    sum = math.add(sum, math.multiply(matrixL[i][k], matrixU[k][j]))
                }
            }
            if(i>=j){
                sum = math.subtract(matrixA[i][j], sum)
                matrixL[i][j] = sum
            }
            else{
                sum = math.subtract(matrixA[i][j], sum)
                matrixU[i][j] = math.divide(sum, matrixL[i][i])
            }
        }
    }

    for(let i=0;i<n;i++){
        let sum = math.bignumber(0)
        for(let j=0;j<n;j++){
            if(i!==j){
                sum = math.add(sum, math.multiply(matrixL[i][j], y[j]))
            }
        }
        y[i] = math.divide(math.subtract(matrixB[i], sum), matrixL[i][i])
    }

    for(let i=n-1;i>=0;i--){
        let sum = math.bignumber(0)
        for(let j=0;j<n;j++){
            if(i!==j){
                sum = math.add(sum , math.multiply(matrixU[i][j], x[j]))
            }
        }
        x[i] = math.divide(math.subtract(y[i], sum), matrixU[i][i])
        data[i]= {value: math.round(x[i],15).toString()}
    }

    return { data }
}

export function calConjugate(n, initMatrixA, initMatrixB, initError){
    
    let matrixA = cloneMatrix(initMatrixA)
    let matrixB = [...initMatrixB]
    let error = parseFloat(initError)
    let x = []
    let data = []
    let checkError = 999999
    let iteration = 1

    for(let i=0;i<n;i++){
        x.push(0)
    }

    let R = math.multiply(matrixA, x)
    R = math.subtract(R, matrixB)

    let D = math.multiply(R, -1)
    let lambda, alpha, temp

    while(checkError > error){
        
        // if(iteration>500){
        //     x.map((x, i) => data.push({value: 'ลู่ออก'}))
        //     return { data }
        // }
        
        lambda = math.transpose(D)
        temp = lambda
        lambda = math.multiply(lambda, R)
        temp = math.multiply(temp, matrixA)
        temp = math.multiply(temp, D)

        lambda = lambda/temp
        lambda = math.multiply(lambda, -1)

        temp = math.multiply(lambda, D)
        x = math.add(x, temp)
        temp = math.multiply(matrixA, x)
        R = math.subtract(temp, matrixB)

        temp = math.transpose(R)
        temp = math.multiply(temp, R)

        checkError = math.sqrt(temp)
        alpha = math.transpose(R)
        alpha = math.multiply(alpha, matrixA)
        alpha = math.multiply(alpha, D)

        temp = math.transpose(D)
        temp = math.multiply(temp, matrixA)
        temp = math.multiply(temp, D)

        alpha = alpha/temp

        temp = math.multiply(alpha, D)
        D = math.multiply(R, -1)
        D = math.add(D, temp)
       
        iteration = iteration + 1

    }
    x.map((x, i) => data.push({value: math.round(x,15).toString()}))
    
    return { data }
}

export function calJacobi(n, initMatrixA, initMatrixB, initError, initMatrixX){
    
    let MatrixA = cloneMatrix(initMatrixA)
    let MatrixB = [...initMatrixB]
    let error = parseFloat(initError)
    let x = [...initMatrixX]
    let tmpX = [...x]
    let data = []
    let checkError = true
    let iteration = 1

    while(checkError){

        // if(iteration > 500){
        //     x.map((x, i) => data.push({value: "ไม่สามารถหาค่าได้"}))
        //     return { data }
        // }

        // if(iteration > 10){
        //     break;
        // }

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
    x.map((x, i) => data.push({value: math.round(x,15).toString()}))
    return { data }
}

export function calGaussSeidel(n, initMatrixA, initMatrixB, initError, initMatrixX){
    
    let MatrixA = cloneMatrix(initMatrixA)
    let MatrixB = [...initMatrixB]
    let error = parseFloat(initError)
    let x = [...initMatrixX]
    let tmpX = [...x]
    let data = []
    let checkError = true
    let iteration = 1

    while(checkError){

        // if(iteration > 500){
        //     x.map((x, i) => data.push({value: "ไม่สามารถหาค่าได้"}))
        //     return { data }
        // }

        // if(iteration > 10){
        //     break;
        // }

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
            x[i] = tmpX[i]
        }

        iteration = iteration + 1
    }
    x.map((x, i) => data.push({value: math.round(x,15).toString()}))
    return { data }
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
    arrC.push(sum.toString()) //
    let C = math.bignumber(1);
    for(let i=0;i<n-1;i++){
        arrC.push(arrFx[i+1][0].toString()) //
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
            if(i!==j){
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

    // console.log(spline.getNaturalKs(5))

    return spline.at(+x)

}


export function calPolynomialRegression(matrix, x, k){

    let d = k+1
    let patternM = []

    for(let i=0;i<d;i++){
        patternM.push([])
        for(let j=0;j<d+1;j++){
            if(i==0&&j==0){
                patternM[i][j] = matrix.length
            }
            else if(i==0&&j==d){
                patternM[i][j] = sumSingle(matrix, 1, 1, matrix.length)
            }
            else if(i==0){
                patternM[i][j] = sumSingle(matrix, 0, j, matrix.length)
            }
            else if(i>j){
                patternM[i][j] = patternM[j][i]
            }
            else if(j==d){
                patternM[i][j] = sumMulti(matrix, 0, i, 1, 1, matrix.length)
            }
            else{
                patternM[i][j] = sumMulti(matrix, 0, i, 0, j, matrix.length)
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
        sum = sum + (matrixC[i]*(x**i))
    }
    
    for(let i=0;i<matrixC.length;i++){
        matrixC[i] = matrixC[i].toString()
    }
 
    console.log(matrixC)
    return {ans: sum.toString(), C: matrixC}

}

