import Desmos from 'desmos'

// const math2latex = require('asciimath-to-latex')

function getDesmosInstance() {
  var elt = document.getElementById("desmos-calculator");
  const calculator = Desmos.GraphingCalculator(elt);

  // let fx = "y = x/2+1/4"

  // calculator.setExpression({ id: 'test', latex: math2latex(fx) })

  calculator.updateSettings({
    invertedColors: false,
    fontSize: 20,
    backgroundColor: "#FFFFFF",
    expressionsCollapsed: "false"
  });

  return calculator;
}

export default { getDesmosInstance }