import {Command, flags} from '@oclif/command'
const Chalk = require('chalk');
const inquirer = require("inquirer")
const axios = require("axios")

class Jankenpo extends Command {
  static description = 'Jankenpo game'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'file'}]

  async run() {
      let choice:string = ""
      
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
      
      let computerChoice = ''
      await axios.get("https://187a7n5rz8.execute-api.us-west-2.amazonaws.com/default/jankenpo").then(
        function(response: any): any {
          computerChoice = response.data;
        }
      )

      let winner = Chalk.yellow("draw")
      computerChoice = this.translateChoice(computerChoice);

      if ((choice == "paper" && computerChoice == "rock") || (choice == "scissors" && computerChoice == "paper") || (choice == "rock" && computerChoice == "scissors")) {
        winner = Chalk.green("player (you)")
      } else if ((choice == "paper" && computerChoice == "scissors") || (choice == "scissors" && computerChoice == "rock") || (choice == "rock" && computerChoice == "paper")) {
        winner = Chalk.red("computer")
      }

      console.log(choice + " (you)")
      console.log(computerChoice + " (computer)")

      console.log("You choosed: " + this.getColoredChoice(choice))
      console.log("Computer choosed: " + this.getColoredChoice(computerChoice))
      console.log("Winner was: " + winner)
  }

  getColoredChoice(choice: string): string {
    if (choice == "paper") {
      return Chalk.cyan("paper");
    } else if (choice == "rock") {
      return  Chalk.blue("rock");
    } 
    return Chalk.gray("scissors");
  }

  translateChoice(choice: string): string {
    if (choice == "papel") {
      return "paper";
    } else if (choice == "pedra") {
      return  "rock";
    } 
    return "scissors";
  }
}

export = Jankenpo
