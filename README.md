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

## Testing
I have provided a basic NodeJS/ExpressJS testing server to load up and render the
handlebars templates and run the simulator locally, similar to [KageroChart](https://kagerochart.com).

### Setup
If you have not previously installed NodeJS and NPM, you must first do so.

https://nodejs.org/en/

https://www.npmjs.com/

After you have installed both, you can install the project dependencies (node_modules)
> npm install

### Run
1) Open a command prompt or terminal
2) Navigate to the project root
3) Start the test app
> node test-app.js

4) Open a browser window and navigate to locahost:3000
5) Refresh the page when you make client changes; Restart the app for changes to the
views.

## Data
I have configured the damage calculator to pull data from a large number of individual
files rather than a handful of huge mega-files. There is a performance cost for
local testing but it hardly matters on the server, because I load it once when the
server starts up.

This is a direction I think we should go moving forward, to make it easier for
people to jump in and contribute.

### Editing
1) Find the relevant .json file(s) under /data and make your change(s)
your change there.
2) Stop and restart the test application
> ctrl + C
> node test-app.js

### Creating
1) Find the relevant directory under /data to add new data and create a new json
file using a [url slug](https://en.wikipedia.org/wiki/Clean_URL#Slug) naming convention.
2) Stop and restart the test application
> ctrl + C
> node test-app.js

## Images
Images are currently hosted on https://kagerochart.com. There are gigs of images,
so I'm keeping it out of the repository. I may setup an interface for 3rd party
upload at a later time.

## SCSS
KageroCalc uses generated css files from scss, both of which are provided. If you would
like to edit styles, you must edit the associated scss files and generate the
minifed .min.css files.

For example, theme.scss will generate theme.min.css after you run your changes through
a parser.

I personally use my editor [ATOM](https://atom.io/) + [an addon](https://atom.io/packages/sass-autocompile) to monitor for scss changes and automatically
compile. I encourage you to do some googling and read about SCSS if it is new to you!
Way better than manually styling everything with css alone.

## Views
KageroCalc makes use of NodeJS, ExpressJS and handlebars templates to render the
calculator. If you'd like to tweak or fix something, you must update the relevant
view file and refresh your browser.

## Logic
KageroCalc is a mix of JQuery and native JS for legacy reasons. The code is not
particularly well structured into modules or classes, so diving in will take some
commitment.

If you'd like to take a crack at adding a new mechanic or otherwise updating the
code, like everything else just make your changes and restart the app.

---

Please let me know if you have any questions or concerns, and thanks for reading!

Cheers,

@Winsomniak
