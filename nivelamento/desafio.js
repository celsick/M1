// Classe Fila (Queue)
class Fila {
  constructor() {
    this.elementos = [];
  }

  adicionarAluno(nomeAluno) {
    this.elementos.push(nomeAluno);
    console.log(`"${nomeAluno}" foi colocado na fila.`);
  }

  atenderAluno() {
    if (this.elementos.length === 0) {
      console.log("Não há alunos aguardando na fila.");
      return;
    }
    const alunoRemovido = this.elementos.shift();
    console.log(`Atendimento realizado para o aluno: ${alunoRemovido}`);
  }

  proximoAluno() {
    if (this.elementos.length === 0) {
      console.log("A fila está vazia no momento.");
    } else {
      console.log(`Aluno na frente da fila: ${this.elementos[0]}`);
    }
  }

  mostrarFila() {
    if (this.elementos.length > 0) {
      console.log("Fila de alunos:", this.elementos.join(", "));
    } else {
      console.log("Nenhum aluno na fila.");
    }
  }
}

// Classe Pilha (Stack)
class Pilha {
  constructor() {
    this.documentos = [];
  }

  adicionarDocumento(novoDoc) {
    this.documentos.push(novoDoc);
    console.log(`Documento "${novoDoc}" inserido na pilha de tarefas.`);
  }

  resolverDocumento() {
    if (this.documentos.length === 0) {
      console.log("Não existem documentos a serem resolvidos.");
      return;
    }
    const docRemovido = this.documentos.pop();
    console.log(`Documento removido e resolvido: ${docRemovido}`);
  }

  documentoTopo() {
    if (this.documentos.length === 0) {
      console.log("A pilha está sem documentos.");
    } else {
      console.log(
        `Documento atual no topo: ${
          this.documentos[this.documentos.length - 1]
        }`
      );
    }
  }

  mostrarPilha() {
    if (this.documentos.length > 0) {
      console.log("Documentos na pilha:", this.documentos.join(", "));
    } else {
      console.log("Nenhum documento pendente.");
    }
  }
}

// Simulação do sistema
const fila = new Fila();
const pilha = new Pilha();

console.log("=== Início da simulação do sistema ===");

// Operações com a fila
fila.adicionarAluno("Ana");
fila.adicionarAluno("Bruno");
fila.adicionarAluno("Carlos");
fila.mostrarFila();
fila.proximoAluno();
fila.atenderAluno();
fila.mostrarFila();

// Operações com a pilha
pilha.adicionarDocumento("Doc1");
pilha.adicionarDocumento("Doc2");
pilha.adicionarDocumento("Doc3");
pilha.mostrarPilha();
pilha.documentoTopo();
pilha.resolverDocumento();
pilha.mostrarPilha();

// Exibição final do sistema
console.log("=== Estado final das estruturas ===");
fila.mostrarFila();
pilha.mostrarPilha();
