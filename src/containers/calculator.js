const math = require('mathjs')

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
    console.log(arrC)
    return { ans : sum.toString(), C : arrC}
}

