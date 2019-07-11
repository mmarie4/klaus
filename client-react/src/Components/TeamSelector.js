import React from 'react'

export default class TeamSelector extends React.Component {

    getTeamsList() {
        var options = [];
        var teamNames = ['Select a team...'];
        var names = {};
        names['Ligue 1'] = ['Amiens', 'Angers', 'Bordeaux', 'Brest', 'Dijon', 'Lille', 'Lyon', 'Marseille', 'Metz', 'Monaco', 'Montpellier', 'Nantes', 'Nice', 'Nîmes', 'Paris', 'Reims', 'Rennes', 'Saint-Etienne', 'Strasbourg', 'Toulouse'];
        names['Premier League'] = ['Arsenal', 'Aston Villa', 'AFC Bournemouth', 'Brighton', 'Burnley', 'Chelsea', 'Crystal Palace', 'Everton', 'Leicester City', 'Liverpool', 'Manchester City', 'Manchester United', 'Newcastle United', 'Norwich City', 'Sheffield United', 'Southampton', 'Tottentam', 'Watford', 'West Ham', 'Wolverhampton'];
        names["Bundesliga"] = ['Bayer Leverkusen', 'Bayern Munich', 'Borussia Dortmund', 'Cologne', 'Eintracht Francfort', 'Augsburg', 'Fortuna Düsseldorf', 'Fribourg', 'Hertha Berlin', 'Hoffenheim', 'Mayence', 'Mönchengladbach', 'Paderborn', 'RB Leibzig', 'Schalke 04', 'Union Berlin', 'Werder Brême', 'Wolfsburg'];
        names[this.props.league].forEach(team => teamNames.push(team));
        for (var i = 0; i < teamNames.length; i++) {
            options.push(<option key={i} value={teamNames[i]}>{teamNames[i]}</option>);
        }
        return options;
    }

    onChange(event) {
        var teamChosed = event.target.options[event.target.selectedIndex];
    }

    render() {
        return(
            <div className='team-selector'>
                <p>{this.props.value}</p>
                <select id={this.props.id} onChange={this.onChange}>
                    {this.getTeamsList()}
                </select>
            </div>
        )
    }
}