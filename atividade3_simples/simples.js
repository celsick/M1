// pedir três notas para o aluno
var nota1 = 3.0;
var nota2 = 7.5;
var nota3 = 9.0;

// valor da média mínima
var mediamin = 7.0;

// cálculo da média das notas
var média = (nota1 + nota2 + nota3) / 3;

// for para ler apenas uma vez
for (var i = 0; i < 1; i++) {
  if (média < 7.0 && média > 0.0) {
    console.log("O aluno foi REPROVADO!"); // verificação da média sendo menor que 7.0
  } else if (média >= 7.0 && média < 10.0) {
    console.log("Parabéns, o aluno foi APROVADO!"); // verificação da média sendo maior que 7.0
  } else {
    console.log(
      "O cálculo da média foi feito de forma errada. Por favor verifique os valores das notas."
    ); // verificação se a média está dentro dos valores adequados (0 a 10)
  }
}

// imprime as notas do aluno
console.log("Nota 1:", nota1)
console.log("Nota 2:", nota2)
console.log("Nota 3:", nota3)

// Informa a média final do aluno para o usuário.
console.log("A média final do aluno foi de:", média);

