# Klaus

Web application which estimates probabilities for football european leagues.
Based on all results from season 18-19, using dataset from datahub.io, ATK and DEF stats are calculated for each team so we can estimate the score probabilities using Poisson distribution.

Visit Klaus [here](http://51.38.68.118).


__front__ : Two versions : 

    - ReactJS application in folder client-react, served on _/client-react_
    
    - Vue.js application in folder client-vuejs, served on _/client-vuejs_ __Work in progress__

__back__ : NodeJS (Express). Serves statically the reactJS build folder, computes statistics and handles requests for probabilities.

