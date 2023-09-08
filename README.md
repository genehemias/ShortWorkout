# ShortWorkout
A simple static web app to guide you through a 5-10 minute workout.  
Presents 6 random excercises (from a total of 12 - more coming soon). 30 second excercise intervals punctuated with 10 second rests periods.

## Usage
[Deployed to Azure](https://salmon-plant-0a0ed6d0f.3.azurestaticapps.net)  
Click the Start button and follow the directions.

## Roadmap/Contributions
Planned features:  
- make it 'dark mode' (black background with white text)
- modularize/organize the javascript a bit better
- display an illustration or .gif for each excercise
- change the color of the progress bar from blue to yellow during the rest timer
- splash a banner when the cycle is complete
- make the number of excercises configurable based on user input/setting
  -  within reason: minimum of 5, maximum of 25(?)
- provide a checkbox that includes/excludes excercises that require dumbells
  - omit excercises based on the selection
- add more excercises
- improve the excercise descriptions
- store the excercises elsewhere and fetch them via api/AJAX call on initial page load
- use browser's IndexedDB to track completed workouts
  - add a view where users can view workout history
 
## Good to know
Uses:  
- The aptly named [EasyTimer](http://albert-gonzalez.github.io/easytimer.js/)
- Bootstrap 5