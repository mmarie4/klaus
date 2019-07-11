import React from 'react'
import TeamSelector from './TeamSelector';

export default class ResultWrapper extends React.Component {

    render() {
        return(
            <div className='result-wrapper'>
                <TeamSelector value='Team 1' id='select1' league={this.props.league}/>
                <TeamSelector value='Team 2' id='select2'league={this.props.league}/>
                <button className='primary-btn'>GET PREDICTIONS</button>
            </div>
        )
    }
}