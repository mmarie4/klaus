import React from 'react'

export default class TeamSelector extends React.Component {

    getTeamsList() {
        var options = [];
        var teamNames = ['Select a team...'];
        var names = {};
        names['Ligue1'] = ['Amiens', 'Angers', 'Bordeaux', 'Brest', 'Dijon', 'Lille', 'Lyon', 'Marseille', 'Metz', 'Monaco', 'Montpellier', 'Nantes', 'Nice', 'Nîmes', 'Paris SG', 'Reims', 'Rennes', 'St Etienne', 'Strasbourg', 'Toulouse'];
        names['PremierLeague'] = ['Arsenal', 'Aston Villa', 'Bournemouth', 'Brighton', 'Burnley', 'Chelsea', 'Crystal Palace', 'Everton', 'Leicester', 'Liverpool', 'Man City', 'Man United', 'Newcastle', 'Norwich City', 'Sheffield United', 'Southampton', 'Tottenham', 'Watford', 'West Ham', 'Wolves'];
        names["Bundesliga"] = ['Leverkusen', 'Bayern Munich', 'Dortmund', 'Cologne', 'Ein Frankfurt', 'Augsburg', 'Fortuna Dusseldorf', 'Fribourg', 'Hertha', 'Hoffenheim', 'Mainz', 'M\'gladbach', 'Paderborn', 'RB Leibzig', 'Schalke 04', 'Union Berlin', 'Werder Bremen', 'Wolfsburg'];
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