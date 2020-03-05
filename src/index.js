function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(str) {
    let reg = /(\d+|\*|\+|\-|\/|\(|\))/g, 
    operators =[],
    output=[];

const operation = {
        '+': (x, y) => x + y,
        '-': (x, y) => x - y,
        '*': (x, y) => x * y,
        '/': (x, y) => x / y
        },
    priority = {
        '+': 10,
        '-':10,
        '*':20,
        '/':20
    };

str = str.match(reg);

function polishNotation(str) {
    for (let i=0;i<str.length;i++) {
        if (!isNaN(parseFloat(str[i])) && isFinite(parseFloat(str[i]))) {
            output.push(str[i]);
        }
    
        if (str[i] in priority) {
            if (operators.length==0 || priority[operators.slice(-1)]<priority[str[i]]) {
                operators.push(str[i])
            } else {
                while (priority[operators.slice(-1)]>=priority[str[i]]) {
                    output.push(operators.pop());
                }
    
                operators.push(str[i]);
            }
        }
    
        if (str[i] == '(') {
            operators.push(str[i]);
        } else if (str[i]== ')') {
            if (!operators.includes('(')) {throw Error ('ExpressionError: Brackets must be paired')};
    
            while (operators.slice(-1) != '(') {
                output.push(operators.pop());
            }
            operators.pop();
        }
    }
    if (operators.includes('(' || ')')) {throw Error ('ExpressionError: Brackets must be paired')};
    while (operators.length!=0) {
        output.push(operators.pop())
    }
}

polishNotation(str);

console.log(str)

str = output;
output =[];

for (let i=0;i<str.length;i++) {
    if (!isNaN(parseFloat(str[i])) && isFinite(parseFloat(str[i]))) {
        output.push(str[i])
    } else {
        let [y,x] = [Number(output.pop()), Number(output.pop())];
        if (operation[str[i]](x,y) == Infinity) {throw Error ('TypeError: Division by zero.')}
        output.push(operation[str[i]](x,y)) 
    }
}
output = Number(output[0]);
return output;
    
}

module.exports = {
    expressionCalculator
}