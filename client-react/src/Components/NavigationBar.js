import React from 'react'

export default class NavigationBar extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        var select1 = document.getElementById('select1');
        var select2 = document.getElementById('select2');
        if(select1) {
            select1.selectedIndex = 0;
        }
        if(select2) {
            select2.selectedIndex = 0;
        }
        this.props.setLeague({
            league: event.target.value,
            stats: [
                ['Goals', '0', '1', '2', '3', '4', '5'],
                ['0', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %'],
                ['1', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %'],
                ['2', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %'],
                ['3', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %'],
                ['4', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %'],
                ['5', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %'],
            ]
        });
    }

    render() {
        return(
            <div className='nav-bar'>
                <input type='radio' value='Ligue1' name='league' id='radio-ligue1' onChange={this.handleChange}/>
                <label htmlFor='radio-ligue1'>Ligue 1</label>
                <input type='radio' value='PremierLeague' name='league' id='radio-premierleague' onChange={this.handleChange}/>
                <label htmlFor='radio-premierleague'>Premier League</label>
                <input type='radio' value='Bundesliga' name='league' id='radio-bundesliga' onChange={this.handleChange}/>
                <label htmlFor='radio-bundesliga'>Bundesliga</label>
                <input type='radio' value='SerieA' name='league' id='radio-serieA' onChange={this.handleChange}/>
                <label htmlFor='radio-serieA'>Serie A</label>
                <input type='radio' value='LaLiga' name='league' id='radio-laliga' onChange={this.handleChange}/>
                <label htmlFor='radio-laliga'>La Liga</label>
            </div>
        )
    }
}