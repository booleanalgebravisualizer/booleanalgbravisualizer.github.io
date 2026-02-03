function parseExpression(expr) {
    const variables = [...new Set(expr.match(/[A-Za-z]/g) || [])].sort();
    const truthTable = generateTruthTable(variables, expr);
    
    return {
        expression: expr,
        variables: variables,
        truthTable: truthTable
    };
}

function generateTruthTable(variables, expr) {
    const numVars = variables.length;
    const table = [];
    
    for (let i = 0; i < Math.pow(2, numVars); i++) {
        const row = {};
        let evaluatedExpr = expr;
        
        for (let j = 0; j < numVars; j++) {
            const bit = (i >> (numVars - 1 - j)) & 1;
            row[variables[j]] = bit;
            evaluatedExpr = evaluatedExpr.replaceAll(variables[j], bit);
        }
        
        row.output = evaluateBoolean(evaluatedExpr) ? 1 : 0;
        table.push(row);
    }
    
    return table;
}

function evaluateBoolean(expr) {
    expr = expr.replace(/'/g, '!');
    expr = expr.replace(/·/g, '&');
    expr = expr.replace(/\*/g, '&');
    expr = expr.replace(/\+/g, '|');
    
    try {
        return Function('"use strict"; return (' + expr + ')')();
    } catch (e) {
        throw new Error('Invalid expression: ' + e.message);
    }
}
