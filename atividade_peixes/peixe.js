var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,

  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);

var peixinho;

function preload() {
  // carregar o background
  this.load.image("mar", "assets/bg_azul-claro.png");
  // carregar o logo
  this.load.image("logo", "assets/logo-inteli_azul.png");
  // carregar o peixe
  this.load.image("peixe", "assets/peixes/peixinho_azul.png");
  // carregar algas
  this.load.image("algas", "assets/algas.png");
}
function create() {
  // adicionar o background
  this.add.image(400, 300, "mar");
  // guarda o peixe em uma variável
  peixinho = this.add
    .image(400, 300, "peixe")
    .setOrigin(0.5, 0.5)
    .setFlip(true, false);
  // adicionar algas
  this.add.image(600, 600, "algas").setScale(0.25);
  // adicionar o logo
  this.add.image(400, 525, "logo").setScale(0.5);
}
function update() {
  // adicionando controles no peixe
  peixinho.x = this.input.x;
  peixinho.y = this.input.y;
}
