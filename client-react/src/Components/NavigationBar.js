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
        this.props.setLeague({league: event.target.value});
    }

    render() {
        return(
            <div className='nav-bar'>
                <input type='radio' value='Ligue 1' name='league' id='radio-ligue1' onChange={this.handleChange}/>
                <label htmlFor='radio-ligue1'>Ligue 1</label>
                <input type='radio' value='Premier League' name='league' id='radio-premierleague' onChange={this.handleChange}/>
                <label htmlFor='radio-premierleague'>Premier League</label>
                <input type='radio' value='Bundesliga' name='league' id='radio-bundesliga' onChange={this.handleChange}/>
                <label htmlFor='radio-bundesliga'>Bundesliga</label>
            </div>
        )
    }
}