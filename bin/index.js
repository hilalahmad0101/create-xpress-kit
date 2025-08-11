import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import inquirer from "inquirer";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

// ESM-friendly __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CLI arguments
const args = process.argv.slice(2);
const projectName = args[0];
const flag = args[1]; // --view or --api

// Validate input
if (!projectName || !flag) {
    console.log(chalk.red("❌ Usage: create-xpress-starterkit <project-name> --view|--api"));
    process.exit(1);
}

// Base paths
const currentDir = process.cwd();
let templatePath = "";
let selectedViewEngine = "";

// Select template based on flag
if (flag === "--api") {
    templatePath = path.join(__dirname, "../template/api");
}
else if (flag === "--view") {
    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "viewEngine",
            message: "Choose your view engine:",
            choices: ["hbs", "ejs"]
        }
    ]);
    selectedViewEngine = answer.viewEngine;
    templatePath = path.join(__dirname, "../template/view", selectedViewEngine);
}
else {
    console.log(chalk.red("❌ Invalid flag. Use --view or --api"));
    process.exit(1);
}

// Target path
const targetPath = path.join(currentDir, projectName);

// Spinner
const spinner = ora({ text: chalk.cyan("Creating your project..."), spinner: "dots" }).start();

try {
    // 1️⃣ Copy template folder
    await fs.copy(templatePath, targetPath);

    // 2️⃣ Read and update package.json dynamically
    const pkgPath = path.join(targetPath, "package.json");
    if (await fs.pathExists(pkgPath)) {
        const pkg = await fs.readJson(pkgPath);
        pkg.name = projectName;
        pkg.description = flag === "--api"
            ? `API project generated using create-xpress-starterkit`
            : `Express view project (${selectedViewEngine}) generated using create-xpress-starterkit`;
        await fs.writeJson(pkgPath, pkg, { spaces: 2 });
    }

    // 3️⃣ Install dependencies for view projects
    if (flag === "--view") {
        spinner.text = chalk.cyan("Installing dependencies...");
        execSync("npm install ", { cwd: targetPath, stdio: "inherit" });
        spinner.succeed(chalk.green(`setup complete for ${selectedViewEngine}.`));
    }

    spinner.succeed(chalk.green("Project created successfully! 🚀"));

    // 4️⃣ Show next steps
    console.log(`\nNext steps:\n`);
    console.log(chalk.yellow(`  npm run start`));
    console.log(chalk.yellow(`  npm run dev:css`));
    console.log(`\nHappy hacking! ✨\n`);
} catch (err) {
    spinner.fail(chalk.red("Failed to create project."));
    console.error(err);
    process.exit(1);
}
