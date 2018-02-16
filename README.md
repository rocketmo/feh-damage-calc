# Fire Emblem: Heroes Damage Calculator / Battle Simulator
Interactive Fire Emblem Heroes Combat Simulator and Damage Calculator, as seen on [KageroChart](https://kagerochart.com/damage-calc). Quickly assess the strength of your build vs the entire FEH Hero Roster!

## Notice
This project is gradually being open-sourced for community involvement and management.
Parts of the application might be missing, or documentation may be sparse. If you have
any questions while we get this rolling, please shoot me an email. [winsomniak@gamedex.io](mailto:winsomniak@gamedex.io)

## Contributing

### Thank You!
KageroCalc is a community driven project and pull requests are welcomed and
encouraged! Continued community helps ensure the battle simulations are up to date
and bug free. As new mechanics are introduced to Fire Emblem Heroes, they must
also be implemented in the simulator.

Huge thanks to those who have or will make code contributions!

### Guidelines
Please be courteous to fellow contributors and follow these basic guidelines:
* DO: Comment your code sufficiently to explain what it does
* DO: Indent and space your code consistently with the rest of the project, using
spaces rather than tab characters (4 spaces/1 tab)
* DO: Test your code thoroughly before submitting a pull request
* DON'T: Submit pull requests for buggy, untested or incomplete code
* DON'T: Criticize or belittle other contributors

## Setup
If you have not previously installed NodeJS and NPM, you must first do so.

https://nodejs.org/en/

https://www.npmjs.com/

After you have installed both, you can install the project dependencies (node_modules)
> npm install

### SCSS
KageroCalc uses generated css files from scss, both of which are provided. If you would
like to edit styles, you must edit the associated scss files and generate the
minifed .min.css files.

For example, theme.scss will generate theme.min.css after you run your changes through
a parser.

I personally use my editor [ATOM](https://atom.io/) + [an addon](https://atom.io/packages/sass-autocompile) to monitor for scss changes and automatically
compile. I encourage you to do some googling and read about SCSS if it is new to you!
Way better than manually styling everything with css alone.

## Testing
I have provided a basic NodeJS/ExpressJS testing server to load up and render the
handlebars templates and run the simulator locally, similar to [KageroChart](https://kagerochart.com).

1) Open a command prompt or terminal
2) Navigate to the project root
3) Start the test app
> node test-app.js

4) Open a browser window and navigate to locahost:3000
5) Refresh the page when you make client changes; Restart the app for changes to the
views.
