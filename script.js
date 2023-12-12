const buttons = document.querySelectorAll(".button");
const current = document.querySelector('#current');
const prev = document.querySelector('#previous');

let op_count = 0;
let iscurrentop = false;
let iscurrentnum = false;

function evaluate(exp){
    const comps = exp.split(' ');
    if (comps.length() === 1){
        return exp;
    }
    const op = comps[1];
    const num1 = Number(comps[0])
    const num2 = Number(comps[2])
    let result = 0;

    if (op === "+"){
        result =  num1 + num2;
    } else if (op === "-") {
        result = num1 - num2;
    } else if (op === "*") {
        result = num1 * num2;
    } else {
        result = (num1/num2);
    }

    return result.toString();

}

function buttonClicked(){

    const num = this.textContent;
    const id = this.getAttribute('id')
    if (id === "clear"){
        current.textContent = "";
        prev.textContent = "";
        iscurrentop = false;
        iscurrentnum = false;
        op_count = 0;
    } else if (id === "delete"){
        current.textContent = (current.textContent).slice(0,-1);
        if (current.textContent == ""){
            iscurrentnum = false;
        }
    } else if ((id === 'add' || id === 'subtract' || id === 'multiply' || id === 'divide')) {
        if (iscurrentnum){
            prev.textContent = prev.textContent + " " + current.textContent + " " + num;
            current.textContent = "";
            op_count += 1;
            iscurrentop = true;
            iscurrentnum = false;
            if (op_count > 1){
                const exp = (prev.textContent.slice(1)).slice(0,-2);
                const result = evaluate(exp);
                prev.textContent = " " + result + " " + num;
                op_count = 1;
            }
        } else if (iscurrentop) {
            prev.textContent = (prev.textContent).slice(0,-1) + num;
        }
    } else if (id === "equal"){
        if (iscurrentnum){
            const exp = prev.textContent.slice(1) + " " + current.textContent;
            prev.textContent = "";
            current.textContent = evaluate(exp);
            op_count = 0;
            iscurrentnum = true;
            iscurrentop = false;
        }

    } else {
        current.textContent += num;
        iscurrentnum = true;
        iscurrentop = false;
    }

    

    
}

buttons.forEach(bt => {
    bt.addEventListener('click', buttonClicked);
});