// Definindo a cena principal do jogo usando a biblioteca Phaser
class fashionBoy extends Phaser.Scene {
  // Construtor da cena
  constructor() {
    super({
      key: "fashionBoy",
      physics: {
        arcade: {
          gravity: { y: 0 },
        },
      },
    });
  }

  // Inicialização de variáveis e configurações da cena
  init() {
    // 1) FUNDO
    this.bg = {
      x: 0,
      y: 0,
      obj: null,
    };

    // 2) CAMISAS (roupas)
    this.shirts = {
      speed: 200,
      interval: 1000,
      group: null,
      size: 0.1,
      types: ["roupa1", "roupa2", "roupa3"], // Tipos de camisas
    };

    // 3) JOGADOR
    this.player = {
      width: 50, // Aumentei o tamanho do jogador
      height: 50, // Aumentei o tamanho do jogador
      obj: null,
      lives: 2,
      speed: 300,
      powerUpSpeed: 500,
      powerUpActive: false,
      powerUpTimer: null,
    };

    // 4) CONTROLES DA RODADA
    this.gameControls = {
      over: false,
      score: 0,
      lastPowerUpScore: -1, // Controle do último score que gerou um power-up
      restartBt: null,
      collectedShirts: [], // Lista que armazena informações sobre camisas coletadas
    };

    // 5) POWER-UPS
    this.powerUps = {
      interval: 2000, // Agora o power-up aparecerá a cada 2 segundos
      duration: 12000,
      group: null,
      size: 0.4, // Aumentei o tamanho do power-up
    };
  }

  // Pré-carregamento de recursos
  preload() {
    this.load.image("bg", "img/fundo2.jpeg");
    this.load.image("player", "img/player.png");
    this.load.image("playerPowerUp", "img/player2.png");
    this.load.image("roupa1", "img/roupa1.png");
    this.load.image("roupa2", "img/roupa2.png");
    this.load.image("roupa3", "img/roupa3.png");
    this.load.image("powerUp", "img/powerup.jpeg");
    this.load.image("gameOver", "img/gameover.jpeg");
    this.load.image("restart", "img/restart_bt.png");
  }

  // Criação de elementos e configurações iniciais da cena
  create() {
    // 1) Adiciona a imagem de fundo
    this.bg.obj = this.add.image(this.bg.x, this.bg.y, "bg").setOrigin(0, 0);

    // 2) Adiciona jogador e suas propriedades físicas
    this.player.obj = this.physics.add
      .sprite(
        this.game.config.width / 2,
        this.game.config.height - 50,
        "player"
      )
      .setScale(0.5); // Ajustei o tamanho do jogador
    this.player.obj.setCollideWorldBounds(true);
    this.player.obj.body.allowGravity = false;
    this.player.obj.body.setSize(
      this.player.obj.width,
      this.player.obj.height,
      true
    );

    // 3) Adiciona grupo de camisas
    this.shirts.group = this.physics.add.group({
      defaultKey: "roupa1", // Define o tipo padrão inicialmente
      maxSize: 20,
    });

    // 4) Adiciona grupo de power-ups
    this.powerUps.group = this.physics.add.group({
      defaultKey: "powerUp",
      maxSize: 1,
    });

    // Ajuste no intervalo de criação do power-up para 30 segundos (30000 milissegundos)
    this.powerUps.interval = 30000; // Power-up aparece a cada 30 segundos

    // Ajuste do tamanho do power-up
    this.powerUps.size = 0.2; // Reduzindo o tamanho do power-up

    // Ajuste na criação do power-up para garantir que ele seja criado a cada 30 segundos
    this.powerUpTimer = this.time.addEvent({
      delay: this.powerUps.interval, // O intervalo de criação de power-ups foi ajustado para 30 segundos
      callback: this.dropPowerUp,
      callbackScope: this,
      loop: true,
    });

    // 5) Adiciona evento de colisão entre jogador e camisas
    this.physics.add.overlap(
      this.player.obj,
      this.shirts.group,
      this.catchShirt,
      null,
      this
    );

    // 6) Adiciona evento de colisão entre jogador e power-ups
    this.physics.add.overlap(
      this.player.obj,
      this.powerUps.group,
      this.catchPowerUp,
      null,
      this
    );

    // 7) Adiciona os cursores que movimentarão o jogador
    this.cursors = this.input.keyboard.createCursorKeys();

    // 8) Mostra o placar, vidas e contagem de power-up com nova fonte e estilo
    this.scoreText = this.add.text(20, 20, "Pontos: 0", {
      font: "30px 'Press Start 2P', cursive", // Usando uma fonte de estilo retro
      fill: "#f0f0f0", // Cor clara para contrastar bem com o fundo escuro
      stroke: "#000", // Contorno para melhorar a visibilidade
      strokeThickness: 4,
      shadow: {
        // Adicionando uma sombra para dar mais destaque
        offsetX: 2,
        offsetY: 2,
        color: "#000000",
        blur: 4,
        fill: true,
      },
    });

    this.livesText = this.add.text(20, 55, "Vidas: " + this.player.lives, {
      font: "30px 'Press Start 2P', cursive",
      fill: "#f0f0f0",
      stroke: "#000",
      strokeThickness: 4,
      shadow: {
        offsetX: 2,
        offsetY: 2,
        color: "#000000",
        blur: 4,
        fill: true,
      },
    });

    this.powerUpText = this.add.text(20, 90, "", {
      font: "30px 'Press Start 2P', cursive",
      fill: "#f0f0f0",
      stroke: "#000",
      strokeThickness: 4,
      shadow: {
        offsetX: 2,
        offsetY: 2,
        color: "#000000",
        blur: 4,
        fill: true,
      },
    });

    this.highScoreText = this.add.text(
      this.game.config.width - 20, // Colocando à direita
      20,
      "Recorde: " + this.game.highScore,
      {
        font: "30px 'Press Start 2P', cursive",
        fill: "#f0f0f0",
        stroke: "#000",
        strokeThickness: 4,
        align: "right",
        shadow: {
          offsetX: 2,
          offsetY: 2,
          color: "#000000",
          blur: 4,
          fill: true,
        },
      }
    );

    // Ajustando a posição do "Recorde" para garantir que fique à direita corretamente
    this.highScoreText.setOrigin(1, 0); // Ajuste de origem para alinhar à direita

    this.gameControls.restartBt = this.add
      .image(
        this.game.config.width / 2 - 50,
        (this.game.config.height / 4) * 3,
        "restart"
      )
      .setScale(0.05) // Ajustei o tamanho do botão de restart
      .setOrigin(0, 0)
      .setInteractive()
      .setVisible(false);

    // 9) Adiciona evento de clique no botão de "reiniciar"
    this.gameControls.restartBt.on(
      "pointerdown",
      function () {
        if (this.gameControls.over) {
          this.gameControls.over = false;
          this.gameControls.score = 0;
          this.player.lives = 2;
          this.shirts.speed = 200;
          this.scene.restart();
        }
      },
      this
    );

    // 10) Cria camisas em intervalos regulares
    this.shirtTimer = this.time.addEvent({
      delay: this.shirts.interval,
      callback: this.dropShirt,
      callbackScope: this,
      loop: true,
    });
  }

  // Atualização lógica do jogo a cada frame
  update() {
    // Controla se o jogo acabou e paraliza a cena
    if (this.gameControls.over) {
      return;
    }

    // Movimentação do jogador
    if (this.cursors.left.isDown) {
      this.player.obj.setVelocityX(-this.player.speed);
    } else if (this.cursors.right.isDown) {
      this.player.obj.setVelocityX(this.player.speed);
    } else {
      this.player.obj.setVelocityX(0);
    }

    // Verifica se alguma camisa tocou o chão
    this.shirts.group.children.iterate((shirt) => {
      if (shirt && shirt.y > this.game.config.height) {
        this.missShirt();
        shirt.destroy();
      }
    });

    // Atualiza o texto do power-up se estiver ativo
    if (this.player.powerUpActive) {
      const remainingTime = Math.ceil(
        (this.player.powerUpTimer.delay -
          this.player.powerUpTimer.getElapsed()) /
          1000
      );
      this.powerUpText.setText("Power-Up: " + remainingTime + "s");
    } else {
      this.powerUpText.setText("");
    }

    // Verifica se é hora de criar um novo power-up (a cada 15 camisas coletadas)
    if (
      this.gameControls.score >= 15 &&
      this.gameControls.score % 15 === 0 &&
      this.gameControls.score !== this.gameControls.lastPowerUpScore
    ) {
      this.gameControls.lastPowerUpScore = this.gameControls.score;
      this.dropPowerUp();
    }
  }

  // Função chamada quando o jogador pega uma camisa
  catchShirt(player, shirt) {
    if (shirt.active) {
      shirt.destroy();
      this.gameControls.score++;
      this.scoreText.setText(this.game.name + ": " + this.gameControls.score);

      // Registra informação sobre a camisa coletada na lista
      this.gameControls.collectedShirts.push({
        x: shirt.x,
        y: shirt.y,
        time: new Date().getTime(),
      });
    }
  }

  // Função chamada quando o jogador perde uma vida
  missShirt() {
    this.player.lives--;
    this.livesText.setText("Vidas: " + this.player.lives);
    if (this.player.lives <= 0) {
      this.gameOver();
    }
  }

  // Função para criar uma nova camisa aleatória
  dropShirt() {
    const x = Phaser.Math.Between(
      this.game.config.width * 0.08,
      this.game.config.width * 0.92
    );

    // Seleção aleatória da imagem da camisa
    const shirtType = Phaser.Math.RND.pick(this.shirts.types);

    const shirt = this.shirts.group.get(x, 0, shirtType); // Usa o tipo aleatório de camisa
    if (shirt) {
      shirt.setActive(true);
      shirt.setVisible(true);
      shirt.setScale(this.shirts.size);
      shirt.body.setVelocityY(this.shirts.speed);
    }
  }

  // Função para criar um novo power-up
  dropPowerUp() {
    const x = Phaser.Math.Between(
      this.game.config.width * 0.08,
      this.game.config.width * 0.92
    );
    const powerUp = this.powerUps.group.get(x, 0);
    if (powerUp) {
      powerUp.setActive(true);
      powerUp.setVisible(true);
      powerUp.setScale(this.powerUps.size);
      powerUp.body.setVelocityY(this.shirts.speed);
    }
  }

  // Função chamada quando o jogador pega um power-up
  catchPowerUp(player, powerUp) {
    if (powerUp.active) {
      powerUp.destroy();
      this.activatePowerUp();
    }
  }

  // Função para ativar o power-up
  activatePowerUp() {
    this.player.powerUpActive = true;
    this.player.speed = this.player.powerUpSpeed;
    this.player.obj.setTexture("playerPowerUp");
    this.player.obj.body.setSize(
      this.player.obj.width,
      this.player.obj.height,
      true
    );

    // Desativa o power-up após a duração
    this.player.powerUpTimer = this.time.addEvent({
      delay: this.powerUps.duration,
      callback: this.deactivatePowerUp,
      callbackScope: this,
    });
  }

  // Função para desativar o power-up
  deactivatePowerUp() {
    this.player.powerUpActive = false;
    this.player.speed = 300;
    this.player.obj.setTexture("player");
    this.player.obj.body.setSize(
      this.player.obj.width,
      this.player.obj.height,
      true
    );
  }

  // Função chamada quando o jogo acaba
  gameOver() {
    this.physics.pause();
    this.shirtTimer.remove(false);
    this.gameControls.over = true;
    this.add
      .image(
        this.game.config.width / 2,
        this.game.config.height / 2,
        "gameOver"
      )
      .setScale(0.25);
    this.gameControls.restartBt.visible = true;
    if (this.gameControls.score > this.game.highScore) {
      this.game.highScore = this.gameControls.score;
      this.highScoreText.setText("high score: " + this.game.highScore);
    }
  }
}
