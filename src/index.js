// const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

require("yargs")
  .scriptName("pirate-parser")
  .usage("$0 <cmd> [args]")
  .command(
    "generate [resume_file] [theme_package]",
    "generate pdf from resume.json",
    (yargs) => {
      yargs.positional("resume_file", {
        type: "string",
      });
      yargs.positional("theme_package", {
        type: "string",
      });
    },
    function (argv) {
      (async (current_dir) => {
        var theme = require(path.join(
          __dirname,
          "themes",
          argv.theme_package,
          "index.js"
        ));
        var resume = require(path.join(current_dir, argv.resume_file));
        const html = theme.render(resume);

        fs.writeFile(
          path.join(
            current_dir,
            "html",
            `${argv.theme_package}-${
              argv.resume_file.replace(/^.*[\\\/]/, "") + ".html"
            }`
          ),
          html,
          function (err) {
            if (err) {
              return console.log(err);
            }
            console.log("The file was saved!");
          }
        );

        // const browser = await puppeteer.launch({
        //   args: [
        //     "--no-sandbox",
        //     "--disable-setuid-sandbox",
        //     "--disable-gpu",
        //     "--hide-scrollbars",
        //     "--disable-web-security",
        //   ],
        //   headless: true,
        //   executablePath: "/usr/bin/google-chrome",
        // });

        // const page = await browser.newPage();
        // await page.setContent(html, { waitUntil: "domcontentloaded" });

        // await page.emulateMediaType("screen");

        // await page.pdf({
        //   path: path.join(
        //     current_dir,
        //     `${argv.theme_package}-${
        //       argv.resume_file.substr(0, argv.resume_file.lastIndexOf(".")) +
        //       ".pdf"
        //     }`
        //   ),
        //   margin: { top: "20px", right: "0px", bottom: "20px", left: "0px" },
        //   printBackground: true,
        //   format: "A4",
        //   preferCSSPageSize: true,
        // });

        // await browser.close();
      })(process.cwd());
    }
  )
  .help().argv;
