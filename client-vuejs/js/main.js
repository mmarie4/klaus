// ------------- components -------------------

// Select button for a league
Vue.component('league-select', {
    props: ['league'],
    template:
        `
        <div class="league-select" @click='hideList()'>
            <img class="league-select-img" :src="'res/' + league + '.png'">
        </div>
        `,
    methods: {
        hideList: function() {
            this.$root.currentLeague = this.league; // Not working, the components are not re-rendered when we change the data --> need a router
        }
    }
});

// List of all the leagues
Vue.component('league-list', {
    props: ['leagues'],
    template: 
        `
        <div id="league-list">
            <league-select v-for="league in leagues" :key=league :league=league></league-select>
        </div>
        `
})

// League title
Vue.component('league-title', {
    props: ['league'],
    template: 
        `
        <p id="league-title">{{ league }}</p>
        `
})

// Team selector box
Vue.component('selector-container', {
    props: ['teams', 'currentLeague'],
    template:
    `
    <div id="selector-container" class="probabilities-container">
        <team-selector :current-league="currentLeague" :teams="teams" :side="'Home'"></team-selector>
        <team-selector :current-league="currentLeague" :teams="teams" :side="'Away'"></team-selector>
    </div>
    `
})

// team selector
Vue.component('team-selector', {
    props: ['teams', 'currentLeague', 'side'],
    template: 
        `
        <div class='team-selector'>
            <p class="team-side"> {{ side }} </p>
            <select>
                <option :value='none'>Select a team...</option>
                <option v-for="team in teams[currentLeague]" :value="team"> {{ team }} </option>
            </select>
        </div>
        `
})

// Result container
Vue.component('result-container', {
    props: ['results'],
    template: 
        `
        <div id="result-container" class="probabilities-container">
            Here will be the result
        </div>
        `
})


// ------------- Vue instance ---------------------
var vm = new Vue({
    el: '#app',
    data: {
        leagues: ['Ligue1', 'Bundesliga', 'PremierLeague', 'SerieA', 'LaLiga'],
        teams: {
            "Bundesliga" : ['Leverkusen', 'Bayern Munich', 'Dortmund', 'Cologne', 'Ein Frankfurt', 'Augsburg', 'Fortuna Dusseldorf', 'Fribourg', 'Hertha', 'Hoffenheim', 'Mainz', 'M\'gladbach', 'Paderborn', 'RB Leibzig', 'Schalke 04', 'Union Berlin', 'Werder Bremen', 'Wolfsburg'],
            "Ligue1": ['Amiens', 'Angers', 'Bordeaux', 'Brest', 'Dijon', 'Lille', 'Lyon', 'Marseille', 'Metz', 'Monaco', 'Montpellier', 'Nantes', 'Nice', 'Nîmes', 'Paris SG', 'Reims', 'Rennes', 'St Etienne', 'Strasbourg', 'Toulouse'],
            "PremierLeague": ['Arsenal', 'Aston Villa', 'Bournemouth', 'Brighton', 'Burnley', 'Chelsea', 'Crystal Palace', 'Everton', 'Leicester', 'Liverpool', 'Man City', 'Man United', 'Newcastle', 'Norwich City', 'Sheffield United', 'Southampton', 'Tottenham', 'Watford', 'West Ham', 'Wolves'],
            "SerieA": ['Atalanta', 'Bologna', 'Cagliari', 'Fiorentina', 'Genoa', 'Brescia', 'Hellas Verona', 'Inter', 'Juventus', 'Lazio', 'Lecce', 'Milan', 'Napoli', 'Parma', 'Roma', 'Sampdoria', 'Sassuolo', 'Spal', 'Torino', 'Udinese'],
            "LaLiga": ['Alaves', 'Ath Bilbao', 'Ath Madrid', 'Leganes', 'Barcelona', 'Celta', 'Eibar', 'Espanol', 'Getafe', 'Granada', 'Leganes', 'Levante', 'Mallorca', 'Osasuna', 'Betis', 'Real Madrid', 'Sociedad', 'Sevilla', 'Valencia', 'Valladolid', 'Villarreal']
        }, 
        currentLeague: "Ligue1"
    }
})
