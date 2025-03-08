class Bemvindo extends Phaser.Scene {
  constructor() {
    super({
      key: "Bemvindo",
    });
  }

  preload() {
    this.load.image("play", "img/play_bt.png");
    this.load.image("helpButton", "img/help_bt.png");
    this.load.image("logo", "img/player.png");
    this.load.image("background", "img/fundo.jpeg"); // Novo fundo de tela
  }

  create() {
    // Fundo da tela com imagem
    const background = this.add.image(0, 0, "background");
    background.setOrigin(0, 0);
    background.setDisplaySize(this.game.config.width, this.game.config.height);

    this.title = this.add
      .text(
        this.game.config.width / 2,
        this.game.config.height / 4,
        "Fashion Boy", // Novo nome do jogo
        {
          fontFamily: "Impact", // Nova fonte
          fontSize: "60px",
          fontStyle: "bold",
          color: "#7200f5", // Cor rosa
          stroke: "#000",
          strokeThickness: 5,
        }
      )
      .setOrigin(0.5)
      .setAlpha(0);

    // Animação de entrada do título
    this.tweens.add({
      targets: this.title,
      alpha: 1,
      duration: 1000,
      ease: "Power2",
    });

    // Botão de "Jogar" estilizado
    this.playBt = this.add
      .image(
        this.game.config.width / 2,
        this.game.config.height / 2 + 100,
        "play"
      )
      .setScale(0.3)
      .setOrigin(0.5)
      .setInteractive()
      .setAlpha(0);

    this.playBt.on("pointerdown", () => {
      this.game.highScore = 0;
      this.scene.start("fashionBoy", this.game);
    });

    // Efeito de hover para o botão de "Jogar"
    this.playBt.on("pointerover", () => {
      this.playBt.setScale(0.35);
    });
    this.playBt.on("pointerout", () => {
      this.playBt.setScale(0.3);
    });

    // Animação do botão "Jogar"
    this.tweens.add({
      targets: this.playBt,
      alpha: 1,
      duration: 1000,
      delay: 500,
      ease: "Power2",
    });

    // Botão de "Instruções" no canto inferior direito
    const howToPlayButton = this.add
      .text(
        this.game.config.width - 30,
        this.game.config.height - 30,
        "Instruções",
        {
          color: "#ffffff",
          fontSize: "24px",
          fontFamily: "Arial",
          fontStyle: "bold",
          backgroundColor: "#7200f5",
          padding: { left: 20, right: 20, top: 10, bottom: 10 },
          borderRadius: 15,
        }
      )
      .setOrigin(1, 1)
      .setInteractive()
      .setAlpha(0);

    howToPlayButton.on("pointerdown", () => {
      this.showHowToPlay();
    });

    // Efeito de hover para o botão de "Instruções"
    howToPlayButton.on("pointerover", () => {
      howToPlayButton.setScale(1.1);
    });
    howToPlayButton.on("pointerout", () => {
      howToPlayButton.setScale(1);
    });

    // Animação do botão "Instruções"
    this.tweens.add({
      targets: howToPlayButton,
      alpha: 1,
      duration: 1000,
      delay: 700,
      ease: "Power2",
    });

    // Cria o pop-up de instruções (inicialmente oculto)
    this.createHowToPlayPopUp();
  }

  createHowToPlayPopUp() {
    this.overlay = this.add.rectangle(
      this.game.config.width / 2,
      this.game.config.height / 2,
      this.game.config.width,
      this.game.config.height,
      0x000000,
      0.7
    );
    this.overlay.setVisible(false);
    this.overlay.setInteractive();

    this.howToPlayPopUp = this.add.container(
      this.game.config.width / 2,
      this.game.config.height / 2
    );
    this.howToPlayPopUp.setVisible(false);

    const popUpBg = this.add.rectangle(
      0,
      0,
      this.game.config.width - 80,
      300,
      0x000000,
      0.8
    );
    popUpBg.setStrokeStyle(2, 0xff6b8b);

    const popUpTitle = this.add
      .text(0, -120, "Tutorial", {
        color: "#7200f5",
        fontSize: "28px",
        fontFamily: "Arial",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    const instructions = [
      "• Deixe seu personagem estiloso!",
      "• Utilize as setas do teclado",
      "• Colete roupas para ganhar pontos",
      "• Você tem 2 vidas...",
      "• Boa Sorte! #MAD",
    ];

    const instructionTexts = [];

    instructions.forEach((instruction, index) => {
      instructionTexts.push(
        this.add
          .text(-popUpBg.width / 2 + 20, -80 + index * 30, instruction, {
            color: "#ffffff",
            fontSize: "18px",
            fontFamily: "Arial",
          })
          .setOrigin(0, 0)
      );
    });

    const closeButton = this.add
      .text(0, 100, "Fechar", {
        backgroundColor: "#7200f5",
        color: "#ffffff",
        fontSize: "20px",
        fontFamily: "Arial",
        fontStyle: "bold",
        padding: { left: 20, right: 20, top: 10, bottom: 10 },
      })
      .setOrigin(0.5)
      .setInteractive();

    closeButton.on("pointerdown", () => {
      this.hideHowToPlay();
    });

    this.howToPlayPopUp.add([
      popUpBg,
      popUpTitle,
      ...instructionTexts,
      closeButton,
    ]);
  }

  showHowToPlay() {
    this.overlay.setVisible(true);
    this.howToPlayPopUp.setVisible(true);
  }

  hideHowToPlay() {
    this.overlay.setVisible(false);
    this.howToPlayPopUp.setVisible(false);
  }
}
