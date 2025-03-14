# Instruções
- Faça uma cópia deste arquivo .md para um repositório próprio
- Resolva as 8 questões objetivas assinalando a alternativa correta e **justificando sua resposta.**
- Resolva as 2 questões dissertativas escrevendo no próprio arquivo .md
- Lembre-se de utilizar as estruturas de código como ``esta aqui com ` `` ou
```javascript
//esta aqui com ```
let a = "olá"
let b = 10
print(a)
```
- Resolva as questões com uso do Visual Studio Code ou ambiente similar.
- Teste seus códigos antes de trazer a resposta para cá.
- Cuidado com o uso de ChatGPT (e similares), pois entregar algo só para ganhar nota não fará você aprender. Não seja dependente da máquina!
- Ao final, publique seu arquivo lista_01.md com as respostas em seu repositório, e envie o link pela Adalove. 

# Questões objetivas
**1) Considerando a execução do código abaixo, indique a alternativa correta e justifique sua resposta.**
```javascript
console.log(x);
var x = 5;
console.log(y);
let y = 10;
```
❌ A saída será undefined seguido de erro 

b) A saída será 5 seguido de 10

c) A saída será undefined seguido de undefined

d) A saída será erro em ambas as linhas que utilizam console.log

**Justificativa: A variável x foi declarada depois de ser impressa, o que acarreta em um erro "undefined", pois o JavaScript é lido de cima para baixo. A maneira correta é sempre declarar a variável em primeiro lugar no código, para depois realizar suas devidas funções, como a impressão delas.**

**2) O seguinte código JavaScript tem um erro que impede sua execução correta. Analise e indique a opção que melhor corrige o problema. Justifique sua resposta.**

```javascript
function soma(a, b) {
    if (a || b === 0) {
        return "Erro: número inválido";
    }
    return a + b;
}
console.log(soma(2, 0));
```

❌ Substituir if (a || b === 0) por if (a === 0 || b === 0)

b) Substituir if (a || b === 0) por if (a === 0 && b === 0)

c) Substituir if (a || b === 0) por if (a && b === 0)

d) Remover completamente a verificação if (a || b === 0)

**Justificativa: O principal erro do problema é que com as variáveis "a" e "b" estarem juntas, da forma "a || b", a leitura do código é feita de forma incorreta como foi proposta. A maneira correta é de fazer de forma separada, primeiro "a === 0", o parâmetro "||" e "b === 0", para que a leitura seja limpa e clara.**
______
**3) Ao executar esse código, qual será a saída no console? Indique a alternativa correta e justifique sua resposta.**
```javascript
function calcularPreco(tipo) {
    let preco;

    switch(tipo) {
        case "eletrônico":
            preco = 1000;
        case "vestuário":
            preco = 200;
            break;
        case "alimento":
            preco = 50;
            break;
        default:
            preco = 0;
    }

    return preco;
}

console.log(calcularPreco("eletrônico"));
```

a) O código imprime 1000.

❌ O código imprime 200.

c) O código imprime 50.

d) O código gera um erro.

**Justificativa: Acredito que a ideia inicial era de que o valor de "eletrônico" seja de 1000, porém, como não há o código "break", ele segue os cases e para no próximo, cujo preço altera para 200. Como há um break logo em seguida, esse valor fica fixo e vai para o return, ficando como resultado final o valor de 200.**
______
**4) Ao executar esse código, qual será a saída no console? Indique a alternativa correta e justifique sua resposta.**
```javascript
let numeros = [1, 2, 3, 4, 5];

let resultado = numeros.map(x => x * 2).filter(x => x > 5).reduce((a, b) => a + b, 0);

console.log(resultado);
```
a) 0

b) 6

c) 18

❌ 24

**Justificativa: A variável resultado realiza várias alterações no let números, sendo elas: a duplicagem de cada elemento (resultando os números [2, 4, 6, 8, 10]), depois ele é filtrado no .filter, selecionando apenas os números maiores que 5 (sendo eles [6, 8, 10]) e por último, no reduce, é realizado a soma dos elementos presentes na lista (sendo eles 6+8+10) junto com o valor inicial de zero. Assim, a soma final é de 6 + 8 + 10 = 24.**
______
**5) Qual será o conteúdo do array lista após a execução do código? Indique a alternativa correta e justifique sua resposta.**

```javascript
let lista = ["banana", "maçã", "uva", "laranja"];
lista.splice(1, 2, "abacaxi", "manga");
console.log(lista);
```

a) ["banana", "maçã", "uva", "abacaxi", "manga", "laranja"]

b) ["banana", "abacaxi", "manga"]

❌ ["banana", "abacaxi", "manga", "laranja"]

d) ["banana", "maçã", "uva", "abacaxi", "manga"]

**Justificativa: É utilizado o comando .splice na lista, que realiza a seguinte ação: é indicado a posição do índice que será substituído, e logo depois o nome da nova String a ser adicionada. Assim, como foi feito, foram selecionados as posições 1 e 2, na qual foram substituídas por "abacaxi" e "manga".**
______
**6) Abaixo há duas afirmações sobre herança em JavaScript. Indique a alternativa correta e justifique sua resposta**

I. A herança é utilizada para compartilhar métodos e propriedades entre classes em JavaScript, permitindo que uma classe herde os métodos de outra sem a necessidade de repetir código.  
II. Em JavaScript, a herança é implementada através da palavra-chave `extends`.

a) As duas afirmações são verdadeiras, e a segunda justifica a primeira.

❌ As duas afirmações são verdadeiras, mas a segunda não justifica a primeira.

c) A primeira afirmação é verdadeira, e a segunda é falsa.

d) A primeira afirmação é falsa, e a segunda é verdadeira.

**Justificativa: A afirmativa número I está correta pois indica da forma certa o conceito de herança, que compartilha métodos e propriedades para economizar linhas no código. A afirmativa de número II também está correta, indicando a palavra chave utilizada que indica que é uma herança sendo realizada, porém, não há demonstração alguma de justificativa, pois ela só mostra o termo técnico.**
______
**7) Dado o seguinte código. Indique a alternativa correta e justifique sua resposta.**

```javascript
class Pessoa {
  constructor(nome, idade) {
    this.nome = nome;
    this.idade = idade;
  }

  apresentar() {
    console.log(`Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.`);
  }
}

class Funcionario extends Pessoa {
  constructor(nome, idade, salario) {
    super(nome, idade);
    this.salario = salario;
  }

  apresentar() {
    super.apresentar();
    console.log(`Meu salário é R$ ${this.salario}.`);
  }
}
```


I) A classe Funcionario herda de Pessoa e pode acessar os atributos nome e idade diretamente.  
II) O método `apresentar()` da classe Funcionario sobrepõe o método `apresentar()` da classe Pessoa, mas chama o método da classe pai usando `super`.  
III) O código não funciona corretamente, pois Funcionario não pode herdar de Pessoa como uma classe, já que o JavaScript não suporta herança de classes.

Quais das seguintes afirmações são verdadeiras sobre o código acima?

❌ I e II são verdadeiras.

b) I, II e III são verdadeiras.

c) Apenas II é verdadeira.

d) Apenas I é verdadeira.

**Justificativa: As afirmativas de número I e II estão certas pois a classe Funcionário realmente herda de "Pessoa" com o "extends" presente, e o método apresentar sobrepõe utilizando super da forma correta em que se faz em JavaScript. Porém, a afirmativa de número III não está correta pois a sua frase está errada, o JavaScript sim suporta herança de classes.**
______

**8) Analise as afirmações a seguir. Indique a alternativa correta e justifique sua resposta.**

**Asserção:** O conceito de polimorfismo em Programação Orientada a Objetos permite que objetos de diferentes tipos respondam à mesma mensagem de maneiras diferentes.  
**Razão:** Em JavaScript, o polimorfismo pode ser implementado utilizando o método de sobrecarga de métodos em uma classe.

a) A asserção é falsa e a razão é verdadeira.

❌ A asserção é verdadeira e a razão é falsa.

c) A asserção é verdadeira e a razão é verdadeira, mas a razão não explica a asserção.

d) A asserção é verdadeira e a razão é verdadeira, e a razão explica a asserção.

**Justificativa: A asserção se torna verdadeira pois o assunto de polimorfismo realmente é um dos conceitos de POO, porém a razão não é verdadeira pois o JavaScript não suporta sobrecarga de métodos, mas ele os sobrescreve no lugar.**
______

# Questões dissertativas
9) O seguinte código deve retornar a soma do dobro dos números de um array, mas contém erros. Identifique os problema e corrija o código para que funcione corretamente. Adicione comentários ao código explicado sua solução para cada problema.

```javascript
function somaArray(numeros) {

    for (i = 0; i < numeros.size; i++) {
        soma = 2*numeros[i];
    }
    return soma;
}
console.log(somaArray([1, 2, 3, 4]));
```

**Resposta:***

```javascript
function somaArray(numeros) {

  var soma = 0; // #Erro 1: Criação da variável que antes não estava declarada

  for (i = 0; i < numeros.length; i++) { // #Erro 2: numeros.size não é definido em JavaScript. o correto é .length
    soma += 2 * numeros[i]; // #Erro 3: O valor de soma não estava sendo acumulado
  }
  return soma;
}
console.log(somaArray([1, 2, 3, 4]));
```
______
10) Crie um exemplo prático no qual você tenha duas classes:

- Uma classe `Produto` com atributos `nome` e `preco`, e um método `calcularDesconto()` que aplica um desconto fixo de 10% no preço do produto.
- Uma classe `Livro` que herda de `Produto` e modifica o método `calcularDesconto()`, aplicando um desconto de 20% no preço dos livros.

Explique como funciona a herança nesse contexto e como você implementaria a modificação do método na classe `Livro`.
