import {Command, flags} from '@oclif/command';
const Chalk = require('chalk');
const inquirer = require("inquirer");

class Jankenpo extends Command {
  static description = 'Jankenpo game';

  /**
   * Oclif flags
   * 
   * @member {object}
   */
  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
  };

  /**
   * Main method - run the game
   * 
   * @return {Promise<void>}
   */
  async run():Promise<void> {
      let choice:string = "";
      
      // Showing the options to the user
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

  /**
   * Get the chalk colored choice
   * 
   * @param {string} choice A string representing the choice, like 'rock'
   * 
   * @return {string} 
   */
  getColoredChoice(choice: string): string {
    if (choice == "paper") {
      return Chalk.cyan("paper");
    } else if (choice == "rock") {
      return  Chalk.blue("rock");
    } 
    return Chalk.gray("scissors");
  }

  /**
   * Returns the computer choice
   * 
   * @return {string} A string representing the choice, like 'rock'
   */
  getComputerChoice(): string {
    const choices = ["paper", "rock", "scissors"];
    const randomComputerIndex = Math.floor(Math.random() * 3);
    return choices[randomComputerIndex];
  }
}

export = Jankenpo
