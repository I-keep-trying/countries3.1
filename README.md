My goal for this project is to apply all the concepts taught in fullstackopen (and some that weren't) to a single app.

So far, I have accomplished:

1. Move 3rd party api calls to separate back end for security
2. Improved performance by lazy loading images
3. Added basic security measures to mitigate XSS and similar known vulnerabilities
4. Ensured basic functionality works on IE
5. Added responsive / mobile version
6. Added redux and redux-thunk for state management - an improvement imo

I have learned why inline styling, while extremely useful and handy, is not recommended for security reasons.

Next, I will be adding routing. Wish me luck!

FYI - for Netlify CI to work, the 'build command' in CI settings must be preceded by `CI='' `. This was not obvious to me at first, so my deployments were constantly failing.

[Netlify demo - no longer being updated](https://vigilant-meitner-a5258e.netlify.app/)

Update: Switched to Heroku after refactoring to separate back end. Netlify instructions for supporting node back end are confusing but Heroku handles it easily.

[Heroku demo](https://sheltered-scrubland-08732.herokuapp.com/)

[backend repo](https://github.com/I-keep-trying/my-app-backend)

Momentarily had this working in IE, but something happened when I wasn't paying attention and it no longer does. The polyfill and core.js are still being imported for future use.

IE works now!