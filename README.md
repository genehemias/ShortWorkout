# ShortWorkout
A simple static web app to guide you through a 5-10 minute workout.  
Presents 6 random excercises (from a total of 12 - more coming soon). 30 second excercise intervals punctuated with 10 second rests periods.

## Usage
[Deployed to Azure](https://salmon-plant-0a0ed6d0f.3.azurestaticapps.net)  
Click the Start button and follow the directions.

## Longer term goals
Planned features:  
- modularize/organize the javascript a bit better
- store the excercises elsewhere and fetch them via api/AJAX call on initial page load
  - maybe in a google sheet? somewhere that can be read-only but doesn't require a secret to access...
 
## Good to know
Uses:  
- The aptly named [EasyTimer](http://albert-gonzalez.github.io/easytimer.js/)
- Bootstrap 5
- Modern browser's CORS restrictions treat scripts with a file-system-ish `src` value as coming from a different origin. This means that when working locally you can no longer just open index.html in your browser and have everything work. You have to have a local web server. I use the VS Code extension "Live Preview" from Microsoft.  It allows you to point your browser at http://127.0.0.1:3000/src/index.html ... and everything works.