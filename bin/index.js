const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const ora = require("ora");

const args = process.argv.slice(2);
const projectName = args[0];

if (!projectName) {
    console.error(chalk.red("❌ Please specify a project name."));
    process.exit(1);
}

const targetPath = path.join(process.cwd(), projectName);
const templatePath = path.join(__dirname, "../template");

const spinner = ora({
    text: chalk.cyan("Creating your Express starter kit..."),
    spinner: "dots"
}).start();

fs.copy(templatePath, targetPath)
    .then(() => {
        spinner.succeed(chalk.green("Project created successfully! 🚀"));
        console.log(`\nNext steps:\n`);
        console.log(chalk.yellow(`  cd ${projectName}`));
        console.log(chalk.yellow(`  npm install`));
        console.log(chalk.yellow(`  npm start`));
        console.log(`\nHappy hacking! ✨\n`);
    })
    .catch((err) => {
        spinner.fail(chalk.red("Failed to create project."));
        console.error(err);
        process.exit(1);
    });
