import {Command, flags} from '@oclif/command';
const Chalk = require('chalk');
const inquirer = require("inquirer");

class Jankenpo extends Command {
  static description = 'Jankenpo game';

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
  };

  static args = [{name: 'file'}];

  async run() {
      let choice:string = "";
      
      await inquirer.prompt(
        {
          name: "choice",
          type: "list",
          message: "Please select one option:", 
          choices: ["paper", "rock", "scissors"]
        }
      ).then (function (answer: any): void {
        choice = answer.choice;
      });
      
      let computerChoice = this.getComputerChoice();

      let winner = Chalk.yellow("draw");

      if ((choice == "paper" && computerChoice == "rock") || (choice == "scissors" && computerChoice == "paper") || (choice == "rock" && computerChoice == "scissors")) {
        winner = Chalk.green("player (you)");
      } else if ((choice == "paper" && computerChoice == "scissors") || (choice == "scissors" && computerChoice == "rock") || (choice == "rock" && computerChoice == "paper")) {
        winner = Chalk.red("computer");
      }

      console.log("You choosed: " + this.getColoredChoice(choice));
      console.log("Computer choosed: " + this.getColoredChoice(computerChoice));
      console.log("Winner was: " + winner);
  }

  getColoredChoice(choice: string): string {
    if (choice == "paper") {
      return Chalk.cyan("paper");
    } else if (choice == "rock") {
      return  Chalk.blue("rock");
    } 
    return Chalk.gray("scissors");
  }

  getComputerChoice(): string {
    const choices = ["paper", "rock", "scissors"];
    const randomComputerIndex = Math.floor(Math.random() * 3);
    return choices[randomComputerIndex];
  }
}

export = Jankenpo
