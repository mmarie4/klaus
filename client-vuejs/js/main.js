// ------------- components -------------------

// Select button for a league
Vue.component('league-select', {
    props: ['league'],
    template:
        `<div class="league-select" @click='hideList()'>
            <img class="league-select-img" :src="'res/' + league + '.png'"/>
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
            <league-select
                v-for="league in leagues"
                :key=league
                :league=league></league-select>>
        </div>
        `
})

// Team selector
Vue.component('team-selector', {
    props: ['teams', 'league'],
    template: 
        `
        <p>{{ league }}</p>
        `

})


// ------------- Vue instance ---------------------
var vm = new Vue({
    el: '#app',
    data: {
        leagues: ['Ligue1', 'Bundesliga', 'PremierLeague', 'SerieA', 'LaLiga'],
        currentLeague: "Ligue1"
    }
})
