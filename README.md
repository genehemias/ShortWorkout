# ShortWorkout
A simple static web app to guide you through a 5-10 minute workout.  
Presents 6 random excercises (from a total of 12 - more coming soon). 30 second excercise intervals punctuated with 10 second rests periods.

## Usage
[Deployed to Azure](https://salmon-plant-0a0ed6d0f.3.azurestaticapps.net)  
Click the Start button and follow the directions.

## Roadmap/Contributions
Planned features:  
- modularize/organize the javascript a bit better
- make the number of excercises configurable based on user input/setting
  - use a slider
  - within reason: minimum of 5, maximum of 25(?), default 7
    - maximum number will have to take into account the total number of exercises available OR we will have to allow repeating the same exercise within a workout.
  - display a dynamic workout length based on current number of excercises selected
    - multiply the number of excercises by the length of each excercise. add to that the multiple of the number of rests by the length of each rest
- store the excercises elsewhere and fetch them via api/AJAX call on initial page load
  - maybe in a google sheet? somewhere that can be read-only but doesn't require a secret to access...
- use browser's IndexedDB to track completed workouts
  - add a view where users can view workout history
    - a scrollable modal? support pagination? or maybe a separate page altogether?
    - can be reached from either the 'setup' modal or the 'finished' modal
      - navigation element placement should be consistent between the 2 modals
  - gamify it a little
    - "rank up" after every 15(?) workouts
    - badges. like "you've done 1 hours worth of jumping jacks!"
    - rank and badges would be visible in the modal described above
 
## Good to know
Uses:  
- The aptly named [EasyTimer](http://albert-gonzalez.github.io/easytimer.js/)
- Bootstrap 5
- Modern browser's CORS restrictions treat scripts with a file-system-ish `src` value as coming from a different origin. This means that when working locally you can no longer just open index.html in your browser and have everything work. You have to have a local web server. I use the VS Code extension "Live Preview" from Microsoft.  It allows you to point your browser at http://127.0.0.1:3000/src/index.html ... and everything works.