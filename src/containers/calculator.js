const math = require('mathjs')

// export function calBisection(initialEquation, )

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

