# ShortWorkout
A simple static web app to guide you through a 5-10 minute workout.  
Presents 6 random excercises (from a total of 12 - more coming soon). 30 second excercise intervals punctuated with 10 second rests periods.

## Usage
[Deployed to Azure](https://salmon-plant-0a0ed6d0f.3.azurestaticapps.net)  
Click the Start button and follow the directions.

## Roadmap/Contributions
Planned features:  
- make it 'dark mode' (black background with white text)
- add a "Next" button next to the "Start" button.
  - it should be enabled only while the rest timer is running (between exercises)
  - clicking it should set `currentExcercise` to the result of `nextExcercise` **and** reset the rest timer
  - it should _not_ add the skipped exercise to the `completedExercises` array (so it won't count toward completing the workout)
  - this will allow users to skip exercises they should (or wish to) avoid
- reduce audio volume to a reasonable level
- modularize/organize the javascript a bit better
- splash a banner when the cycle is complete
- add a counter that shows how many excercises are complete/total for the workout
  - put it between the `exercise-prompt` and `exercise-name` elements
- make the number of excercises configurable based on user input/setting
  - use a slider
  - within reason: minimum of 5, maximum of 25(?), default 7
    - maximum number will have to take into account the total number of exercises available OR we will have to allow repeating the same exercise within a workout.
  - display a dynamic workout length based on current number of excercises selected
    - multiply the number of excercises by the length of each excercise. add to that the multiple of the number of rests by the length of each rest
- add more excercises
- improve the excercise descriptions
- store the excercises elsewhere and fetch them via api/AJAX call on initial page load
  - maybe in a google sheet? somewhere that can be read-only but doesn't require a secret to access...
- use browser's IndexedDB to track completed workouts
  - add a view where users can view workout history
  - a scrollable modal. support pagination?
 
## Good to know
Uses:  
- The aptly named [EasyTimer](http://albert-gonzalez.github.io/easytimer.js/)
- Bootstrap 5
- Modern browser's CORS restrictions treat scripts with a file-system-ish `src` value as coming from a different origin. This means that when working locally you can no longer just open index.html in your browser and have everything work. You have to have a local web server. I use the VS Code extension "Live Preview" from Microsoft.  It allows you to point your browser at http://127.0.0.1:3000/src/index.html ... and everything works.