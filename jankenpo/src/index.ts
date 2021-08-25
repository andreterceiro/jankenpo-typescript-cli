import {Command, flags} from '@oclif/command'
import { string } from '@oclif/command/lib/flags'
var inquirer = require("inquirer")
var axios = require("axios")

class Jankenpo extends Command {
  static description = 'describe the command here'

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
          choices: ["papel", "pedra", "tesoura"]
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

      console.log("Você escolheu: " + choice)
      console.log("O computador escolheu: " + computerChoice)

      let vencedor = "empate"

      if ((choice == "papel" && computerChoice == "pedra") || (choice == "tesoura" && computerChoice == "papel") || (choice == "pedra" && computerChoice == "tesoura")) {
        vencedor = "jogador (você)"
      } else if ((choice == "papel" && computerChoice == "tesoura") || (choice == "tesoura" && computerChoice == "pedra") || (choice == "pedra" && computerChoice == "papel")) {
        vencedor = "computador"
      }

      console.log("O vencedor foi: " + vencedor)
  }
}

export = Jankenpo
