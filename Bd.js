const readline = require("readline");

// Setup input/output interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class App {
  constructor() {
    this.currentScreen = 0;
    this.isLoading = true;
    this.musicPlaying = false;
    this.showMusicControl = false;
  }

  showLoader() {
    console.log("⏳ Loading...");
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isLoading = false;
        resolve();
      }, 4000);
    });
  }

  async nextScreen() {
    if (this.currentScreen === 0) {
      this.showMusicControl = true;
      this.musicPlaying = true;
      console.log("🎵 Music started!");
    }

    this.currentScreen = (this.currentScreen + 1) % 5;
    await new Promise((res) => setTimeout(res, 500)); // simulate transition delay
    this.renderScreen();
  }

  renderScreen() {
    if (this.isLoading) {
      this.showLoader().then(() => this.renderScreen());
      return;
    }

    console.clear();
    console.log("========================================");

    if (this.showMusicControl) {
      console.log("[🎶 Music Player Visible]");
    }

    const screens = [
      "👋 Welcome Screen",
      "🧮 Miss Counter Screen",
      "💬 Message Screen",
      "🖼️ Memories Screen",
      "🎉 Final Screen"
    ];

    console.log(`🖥️ Now showing: ${screens[this.currentScreen]}`);
    console.log("========================================\n");
  }

  run() {
    this.renderScreen();

    rl.on("line", async (input) => {
      const cmd = input.trim().toLowerCase();

      if (cmd === "exit") {
        console.log("👋 Exiting app. Goodbye!");
        rl.close();
        return;
      }

      if (cmd === "") {
        await this.nextScreen();
      } else {
        console.log("⚠️ Unknown command. Please press ENTER or type 'exit'.");
      }
    });
  }
}

const app = new App();
app.run();
