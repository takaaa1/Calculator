const keys = document.querySelectorAll(".key");
const display_input = document.querySelector(".display .input");
const display_output = document.querySelector(".display .output");

let input = "";

for (let key of keys) {
  const value = key.dataset.key;

  key.addEventListener("click", () => {
    if (value == "clear") {
      input = "";
      display_input.innerHTML = "";
      display_output.innerHTML = "";
    } else if (value == "backspace") {
      // Apagar o último dígito
      input = input.slice(0, -1);
      display_input.innerHTML = operatorInput(input);
    } else if (value == "=") {
      // Mostrar resultado
      let result = eval(prepareInput(input));
      display_output.innerHTML = decimalOutput(result);
    } else if (value == "brackets") {
      if (
        // Colocar a abertura dos parênteses
        input.indexOf("(") == -1 ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") < input.lastIndexOf(")"))
      ) {
        input += "(";
      } else if (
        // Colocar fechamento dos parênteses
        (input.indexOf("(") != -1 && input.indexOf(")") == -1) ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") > input.lastIndexOf(")"))
      ) {
        input += ")";
      }

      display_input.innerHTML = operatorInput(input);
    } else {
      if (validateInput(value)) {
        input += value;
        display_input.innerHTML = operatorInput(input);
      }
    }
  });
}

// Adicionar span com classe 'operator' para mudar estilo dos operadores
function operatorInput(input) {
  let input_array = input.split("");
  let inpArrLen = input_array.length;

  for (let i = 0; i < inpArrLen; i++) {
    // passar por todas as condições (todos os operadores, parênteses e porcentagem)
    if (input_array[i] == "*") {
      input_array[i] = ` <span class="operator">x</span> `;
    } else if (input_array[i] == "/") {
      input_array[i] = ` <span class="operator">÷</span> `;
    } else if (input_array[i] == "+") {
      input_array[i] = ` <span class="operator">+</span> `;
    } else if (input_array[i] == "-") {
      input_array[i] = ` <span class="operator">-</span> `;
    } else if (input_array[i] == "(") {
      input_array[i] = ` <span class="brackets">(</span> `;
    } else if (input_array[i] == ")") {
      input_array[i] = ` <span class="brackets">)</span> `;
    } else if (input_array[i] == "%") {
      input_array[i] = ` <span class="percent">%</span> `;
    }
  }

  return input_array.join("");
}

// Colocar vírgula ou ponto (estilo BR -> milhares (.) / decimais (,))
function decimalOutput(output) {
  let output_string = output.toString();
  let decimal = output_string.split(",")[1];
  output_string = output_string.split(",")[0];

  let output_array = output_string.split("");

  if (output_array.length > 3) {
    for (let i = output_array.length - 3; i > 0; i -= 3) {
      output_array.splice(i, 0, ".");
    }
  }

  if (decimal) {
    output_array.push(",");
    output_array.push(decimal);
  }

  return output_array.join("");
}

// Proíbe o usuário de colocar dois operadores seguidos
function validateInput(value) {
  let last_input = input.slice(-1);
  let operators = ["+", "-", "*", "/"];

  if (value == "," && last_input == ",") {
    return false;
  }

  if (operators.includes(value)) {
    if (operators.includes(last_input)) {
      return false;
    } else {
      return true;
    }
  }

  return true;
}

// Símbolo de porcentagem com número válido
function prepareInput(input) {
  let input_array = input.split("");

  for (let i = 0; i < input_array.length; i++) {
    if (input_array[i] == "%") {
      input_array[i] = "/100";
    }
  }

  return input_array.join("");
}
