const math = require('mathjs')

export function calNewtonDivide(matrix, x, selectedPoint){
    let n = selectedPoint.length
    let arr_x = []
    let arr_fx = [[]]
    selectedPoint.map(x => {
        arr_x.push(matrix[x][0])
        arr_fx[0].push(matrix[x][1])
    })

    for(let i=0;i<n-1;i++){
        let dynamic = []
        for(let j=0;j<n-i-1;j++){
            let value = math.bignumber(arr_fx[i][j+1])
            value = math.subtract(value,arr_fx[i][j])
            let temp = math.bignumber(arr_x[i+j+1])
            temp = math.subtract(temp,arr_x[j])
            value = math.divide(value,temp)
            dynamic.push(value)
        }
        arr_fx.push(dynamic)
    }
    let sum = math.bignumber(arr_fx[0][0]);
    let C = math.bignumber(1);
    for(let i=0;i<n-1;i++){
        let temp = math.bignumber(x)
        temp = math.subtract(temp,arr_x[i])
        C = math.multiply(C,temp)
        temp = math.multiply(C,arr_fx[i+1][0])
        sum = math.add(sum,temp)
    }
    return sum.toString()
}

