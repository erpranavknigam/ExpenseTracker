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
        const expenses = JSON.parse(fs.readFileSync(expenseFile), 'utf-8')
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = date.getDate()
        const fullDate = day + "-" + month + "-" + year
        const newExpense = { "id": expenses.length + 1, "description": description, "amount": amount, "date": fullDate }
        expenses.push(newExpense);
        fs.writeFileSync(expenseFile, JSON.stringify(expenses, null, 2))
        console.log("New expense added successfully.")
    });

// Command to Update existing expense
program
    .command("update <id>")
    .description("Command to update the existing expense details")
    .requiredOption("--description <desc>", "Description of expense")
    .requiredOption("--amount <amount>", "Expense amount")
    .action((id, options) => {
        const { description, amount } = options
        const expenses = JSON.parse(fs.readFileSync(expenseFile, 'utf-8'))
        Array.from(expenses).forEach(x => {
            if (x.id == id) {
                x.description = description
                x.amount = amount
                const date = new Date()
                const year = date.getFullYear()
                const month = date.getMonth()
                const day = date.getDate()
                const fullDate = day + "-" + month + "-" + year
                x.date = fullDate
            }
        })
        fs.writeFileSync(expenseFile, JSON.stringify(expenses, null, 2))
        console.log("Expense updated successfully")
    })

// Command to Delete Existing Expense
program
.command("delete <id>")
.description("Command to delete an existing expense")
.action((id) => {
    const expenses = JSON.parse(fs.readFileSync(expenseFile,'utf-8'))
    const filtered = Array.from(expenses).filter(x=>x.id !== Number(id));
    fs.writeFileSync(expenseFile, JSON.stringify(filtered, null, 2))
    console.log("Expense Delete successfully")
})
program.parse(process.argv)