# Klaus

Web application which estimates probabilities for football european leagues.
Based on all results from season 18-19, using dataset from datahub.io, ATK and DEF stats are calculated for each team so we can estimate the score probabilities using Poisson distribution.

#### Run

`npm run build` to build the folder from ReactJS project.

`npm start` to launch the server.

#### Tools

__front__ : ReactJS application in folder client-react.
__back__ : NodeJS (Express). Serves statically the reactJS build folder, computes statistics and handles requests for probabilities.

