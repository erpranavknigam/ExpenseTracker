
# Expense Tracker CLI

This is a command-line interface (CLI) tool for managing your personal expenses. It allows you to add, update, delete, list, and summarize expenses. The tool is written in Node.js and uses JSON files to store expense data.

----------------------------------------------------------------------------------------------------------------

### Project URL
[![Project Page](https://img.shields.io/badge/Project%20Page-Click%20Here-brightgreen)](https://roadmap.sh/projects/expense-tracker)

## Installation

1. Clone the repository:

``` git clone https://github.com/erpranavknigam/ExpenseTracker.git ```
``` cd <repository_directory> ```

2. Install the dependencies:

``` npm install ```

4. Make the CLI Tool Executable


5. To run the CLI commands globally, you need to link the project:
    `npm link`

This command will create a symbolic link in your system’s global package bin directory. Now you can use github-activity commands from anywhere.

6. Run the CLI:

``` expense-tracker <command> ```

## Features
### Add New Expenses:

    Allows you to add a new expense with a description and amount.
    Ensures that the expense amount is greater than zero before adding.

### Update Existing Expenses:

    Enables updating the description and amount of an existing expense by its ID.
    Automatically updates the date of the expense to the current date.

### Delete Expenses:

    Provides the option to delete an expense by specifying its ID.
    Ensures that the expense exists before attempting to delete it.

### List All Expenses:

    Displays a list of all expenses, including their ID, date, description, and amount.
    Formats the output in a tabular format for easy readability.

### Display Expense Summary:

    Overall Summary: Shows the total expenses across all recorded data.
    Month-wise Summary: Optionally provides a summary of expenses for a specific month. The month is entered as a number (1 to 12).

### Error Handling:

    Provides user-friendly error messages for cases such as invalid data or non-existent expense IDs.
    Ensures valid input for amounts and months.

### Data Persistence:

    Stores expenses in a JSON file (expenses.json) to maintain data between runs of the CLI tool.
    Initializes the file if it does not exist and ensures it is in the correct format.

### Command-Line Interface:

    Easy-to-use CLI commands for managing expenses.
    Supports command options and arguments for flexible interaction.

### Date Management:

    Automatically records the current date when adding or updating expenses.
    This CLI tool is designed to help you efficiently manage and track your expenses with a straightforward command-line interface.

## Usage

1. Adding a New Expense
``` $ expense-tracker add --description "Groceries" --amount 50 ```

2. Updating an Existing Expense
``` $ expense-tracker update <id> --description "Dinner" --amount 30 ```

3. Deleting an Expense
``` $ expense-tracker delete --id <id> ```

4. Listing All Expenses
``` $ expense-tracker list ```

5. Displaying the Summary of Expenses
    * Overall Summary
    ``` $ expense-tracker summary ```

    * Month-wise Summary
    ``` $ expense-tracker summary --month <month_number> ```

## Example Commands
1. Add a new expense for groceries:

``` $ expense-tracker add --description "Groceries" --amount 50 ```

2. Update the description and amount of an expense with ID 1:

``` $ expense-tracker update 1 --description "Dinner" --amount 30 ```

3. Delete an expense with ID 2:

``` $ expense-tracker delete --id 2 ```

4. List all expenses:

``` $ expense-tracker list ```

5. Display the total expenses:

``` $ expense-tracker summary ```

6. Display the total expenses for July:

``` $ expense-tracker summary --month 7 ```

## Notes
The expenses are stored in a JSON file (expenses.json) located in the same directory as the script.
The CLI tool uses Node.js and the commander package to handle command-line arguments.
Ensure that the JSON file is writable to avoid permission issues.