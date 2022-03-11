FYI - for Netlify CI to work, the 'build command' in CI settings must be preceded by `CI='' `. This was not obvious to me at first, so my deployments were constantly failing.

[Netlify demo - no longer being updated](https://vigilant-meitner-a5258e.netlify.app/)

Update: Switched to Heroku after refactoring to separate back end. Netlify instructions for supporting node back end are confusing but Heroku handles it easily.

[Heroku demo](https://sheltered-scrubland-08732.herokuapp.com/)

Momentarily had this working in IE, but something happened when I wasn't paying attention and it no longer does. The polyfill and core.js are still being imported for future use.
