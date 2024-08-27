#!/usr/bin/env node

const { Command } = require('commander')
const fs = require('fs-extra')
const path = require('path')

const program = new Command()
const expenseFile = path.join(__dirname, 'expenses.json')

fs.ensureFileSync(expenseFile)
if (!fs.existsSync(expenseFile) || fs.readJSONSync(expenseFile, { throws: false }) === null) {
    fs.writeFileSync(expenseFile, JSON.stringify([]))
}

// Command to Add a new expense
program
    .command('add')
    .description('Command to add a new expense')
    .requiredOption('--description <desc>', 'Expense description')
    .requiredOption('--amount <amt>', 'Expense amount')
    .action((options) => {
        const { description, amount } = options;
        if (amount <= 0) {
            console.log("Amount must be more than 0")
        } else {
            const expenses = JSON.parse(fs.readFileSync(expenseFile), 'utf-8')
            const date = new Date()
            const year = date.getFullYear()
            const month = date.getMonth()
            const day = date.getDate()
            const fullDate = day + "-" + (month+1) + "-" + year
            const newExpense = { "id": expenses.length + 1, "description": description, "amount": amount, "date": fullDate }
            expenses.push(newExpense);
            fs.writeFileSync(expenseFile, JSON.stringify(expenses, null, 2))
            console.log("New expense added successfully.")
        }

    });

// Command to Update existing expense
program
    .command("update <id>")
    .description("Command to update the existing expense details")
    .requiredOption("--description <desc>", "Description of expense")
    .requiredOption("--amount <amount>", "Expense amount")
    .action((id, options) => {
        const { description, amount } = options
        if (amount <= 0) {
            console.log("Amount must be more than 0")
        } else {
            const expenses = JSON.parse(fs.readFileSync(expenseFile, 'utf-8'))
            if (Array.from(expenses).find(x => x.id === Number(id))) {
                Array.from(expenses).forEach(x => {
                    if (x.id == Number(id)) {
                        x.description = description
                        x.amount = amount
                        const date = new Date()
                        const year = date.getFullYear()
                        const month = date.getMonth()
                        const day = date.getDate()
                        const fullDate = day + "-" + (month+1) + "-" + year
                        x.date = fullDate
                    }
                })
                fs.writeFileSync(expenseFile, JSON.stringify(expenses, null, 2))
                console.log("Expense updated successfully")
            } else {
                console.log("Expense with Id: " + id + " does not exists.")
            }
        }


    })

// Command to Delete Existing Expense
program
    .command("delete")
    .description("Command to delete an existing expense")
    .requiredOption("--id <id>", "Id which you want to delete")
    .action((options) => {
        const { id } = options
        const expenses = JSON.parse(fs.readFileSync(expenseFile, 'utf-8'))
        if (Array.from(expenses).find(x => x.id === Number(id))) {
            const filtered = Array.from(expenses).filter(x => x.id !== Number(id));
            fs.writeFileSync(expenseFile, JSON.stringify(filtered, null, 2))
            console.log("Expense Delete successfully")
        } else {
            console.log("Expenses with id: " + id + " does not exists")
        }

    })

// Command to list all the expenses
program
    .command("list")
    .description("Displays all the expenses")
    .action(x => {
        const expenses = JSON.parse(fs.readFileSync(expenseFile, 'utf-8'))
        console.log("#\tDate\t\tDescription\t\tAmount")
        Array.from(expenses).forEach(x => {
            console.log(x.id + "\t" + x.date + "\t" + x.description + "\t\t\t" + x.amount)
        })
    })

// Command to display summary of expenses
program
    .command("summary")
    .description("Display overall summary and month wise summary")
    .option("--month <month>", "Enter month in numbers (1 to 12)")
    .action((options) => {
        const {month} = options;
        const expenses = JSON.parse(fs.readFileSync(expenseFile,'utf-8'))
        if (month != null) {
            if(month >= 1 && month <= 12){
                const months = {
                    1: "January",
                    2: "February",
                    3: "March",
                    4: "April",
                    5: "May",
                    6: "June",
                    7: "July",
                    8: "August",
                    9: "September",
                    10: "October",
                    11: "November",
                    12: "December"
                  };
                  const date = new Date()
                  const currentYear = date.getFullYear()
                  let expenseSum = Number(0)
                  Array.from(expenses).forEach(x=>{
                    const expenseDate = x.date.toString().split('-')
                    if(Number(expenseDate[1]) == Number(month) && Number(expenseDate[2]) === Number(currentYear)){
                        expenseSum += Number(x.amount)
                    }
                  })
                  console.log(`Total expenses for ${months[Number(month)]}: $${expenseSum}`)
            } else{
                console.log("Invalid month")
            }
        } else {
            let totalExpenses = Number(0)
            Array.from(expenses).forEach(x=>{
                totalExpenses += Number(x.amount)
            })
            console.log(`Total expenses: $${totalExpenses}`)
        }
    })
program.parse(process.argv)