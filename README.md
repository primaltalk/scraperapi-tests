# Install
To install dependencies for the tests, run `npm install` from the installation directory.

You will also need babel@cli version 7 or higher installed globally.  The tests use
babel-node to avoid having to run through a build step first, for convenience.  Obviously
this isn't great for performance, but I'm assuming for the puproses of the exercise that
this aspect of performance can be overlooked.

The tests also assume a node version of 8.12.0 or greater.

# Running
In order to run the individual scripts, from the command line (in the install directory):

* `npm run-script simple`
* `npm run-script medium`
* `npm run-script complex`
