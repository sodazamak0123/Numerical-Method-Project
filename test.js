let k = 2
let m = 3
let d = k*m+1

let xy = [[1, 2, 3, 5],
    [4, 5, 6, 10],
    [7, 8, 9, 13]]

function sum_multi(arr,x,n,y,m,size){
    let sum = 0
    for(let i = 0;i<size;i++){
        sum = sum + ((arr[i][x]**n)*(arr[i][y]**m))
    }
    return sum
}

function sum_single(arr,x,n,size){
    let sum = 0
    for(let i = 0;i<size;i++){
        sum = sum + (arr[i][x]**n)
    }
    return sum
}

patternM = []

for(let i=0;i<d;i++){
    patternM.push([])
    for(let j=0;j<d+1;j++){
        if(i==0&&j==0){
            patternM[i][j] = m
        }
        else if(i==0&&j==d){
            patternM[i][j] = sum_single(xy, m, 1, m)
        }
        else if(i==0){
            let degreex = parseInt((j/(m+1))+1)
            patternM[i][j] = sum_single(xy, (j-1)%m, degreex, m)
        }
        else if(i>j){
            patternM[i][j] = patternM[j][i]
        }
        else if(j==d){
            let degreex = parseInt((i/(m+1))+1)
            patternM[i][j] = sum_multi(xy, (i-1)%m, degreex, m, 1, m)
        }
        else{
            let degreex = parseInt((i/(m+1))+1)
            let degreey = parseInt((j/(m+1))+1)
            patternM[i][j] = sum_multi(xy, (i-1)%m, degreex, (j-1)%m, degreey, m)
        }
    }

}

console.log(patternM)