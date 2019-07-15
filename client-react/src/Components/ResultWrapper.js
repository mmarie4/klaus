import React from 'react'
import TeamSelector from './TeamSelector';
import Axios from 'axios';

export default class ResultWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.handleButton = this.handleButton.bind(this);
    }

    handleButton() {
        document.getElementById('team1').scrollIntoView();
        var team1 = document.getElementById('select1').options[document.getElementById('select1').selectedIndex].value;
        var team2 = document.getElementById('select2').options[document.getElementById('select2').selectedIndex].value;
        var that = this;
        if(team1 == 'Select a team...' || team2 == 'Select a team...') {
            alert('Please select teams before asking for predictions');
        } else {
            Axios.get('http://51.38.68.118:8080/probabilities?team1='+team1+'&team2='+team2).then(function(response){
            //Axios.get('http://localhost:8080/probabilities?team1='+team1+'&team2='+team2+'&league='+this.props.league).then(function(response){
                if(response.data.missing != undefined) {
                    alert(response.data.missing);
                } else {
                    console.log('Stats:', response.data);
                    that.props.updateGrid(response.data);
                }
            });
        }
    }

    render() {
        return(
            <div className='result-wrapper'>
                <TeamSelector value='Home team' id='select1' league={this.props.league}/>
                <TeamSelector value='Away team' id='select2'league={this.props.league}/>
                <button className='primary-btn' onClick={this.handleButton}>GET PREDICTIONS</button>
            </div>
        )
    }
}