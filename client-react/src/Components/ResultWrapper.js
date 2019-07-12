import React from 'react'
import TeamSelector from './TeamSelector';

export default class ResultWrapper extends React.Component {

    handleButton() {
        document.getElementById('team1').scrollIntoView();
    }

    render() {
        return(
            <div className='result-wrapper'>
                <TeamSelector value='Team 1' id='select1' league={this.props.league}/>
                <TeamSelector value='Team 2' id='select2'league={this.props.league}/>
                <button className='primary-btn' onClick={this.handleButton}>GET PREDICTIONS</button>
            </div>
        )
    }
}