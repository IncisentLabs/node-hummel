# node-hummel

Hummel is a collection of sane defaults for command line arg parsing, logging, settings configuration
for an Express.js application. These are bundled together to provide a prewired app to take the
repetitive legwork out of creating an Express.js web app that can be deployed in a production
environment.

"The Hummel was designed in 1942 out of a need for mobile artillery support for the tank forces,
the lack of which had first been felt during the invasion of the USSR."

## Setup

    npm install

## Running the Example

    cd example
    node index.js --environment=DEV

## How to Use in an Express.js Project

Refer to example/index.js to see how to have hummel create a prewired Express.js app to use
as a starting point for an application.