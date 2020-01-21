

export let getPin = (): string [] => {
    let pin: string[] = [];
    
    while (pin.length < 5){
        pin = generatePin(pin, (pin.length * Math.random() * 10).toFixed(0));
    }
    return pin;
}

let generatePin = (pin: string [], i: string): string [] => {
    //console.log('inside getpin');
    let tsMilli = (new Date().getTime() + parseInt(i)).toString();
    //console.log(tsMilli);
    tsMilli = tsMilli.substring(9);
    let bool = acceptorRejectPin(tsMilli); 
    if ( bool && !pin.find(x => x === tsMilli)){
        pin.push(tsMilli);
    }
    return pin;

}
// return false for invalid pin and true for vice-versa
let acceptorRejectPin = (pin: string) : boolean => {
    let strArr: number [] = [];
    for(let i=0; i < pin.length; i++) {
        strArr.push(parseInt(pin.substr(i, 1)));
    }
    for (let i=0; i < 2 ; i++){
        // check consecutive incremental digits like 123
        if(strArr[i] + 1 === strArr[i+1]){
            if (strArr[i+1]+1 === strArr[i+2]){
                //console.log('consecutive incremental digits');
                return false;
            }
        }
        // check consecutive decremental digits like 321
        if(strArr[i] - 1 === strArr[i+1]){
            if (strArr[i+1] - 1 === strArr[i+2]){
                //console.log('consecutive decremental digits');
                return false;
            }
        }
        // check two consecutive same digit
        if (strArr[i] === strArr[i+1] || strArr[i+1] === strArr[i+2]){
            //console.log('consecutive same digits');
            return false;
        }
    }
    return true;
}

//console.log(getPin());

