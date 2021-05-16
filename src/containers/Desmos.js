const Desmos = require('desmos');

function getDesmosInstance() {
  var elt = document.getElementById("desmos-calculator");
  const calculator = Desmos.GraphingCalculator(elt);

  calculator.updateSettings({
    invertedColors: false,
    fontSize: 20,
    backgroundColor: "#FFFFFF",
    expressionsCollapsed: "false"
  });

  return calculator;
}

export default { getDesmosInstance }