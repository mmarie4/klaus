import React from 'react'
import TitleBar from './TitleBar';
import NavigationBar from './NavigationBar';
import ResultWrapper from './ResultWrapper';
import GridStats from './GridStats';
import LockButton from './LockButton';
import Popup from './Popup';
import axios from 'axios';

export default class Wrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            league: '',
            isPopup: false,
            stats: [
                ['Goals', '0', '1', '2', '3', '4', '5'],
                ['0', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %'],
                ['1', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %'],
                ['2', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %'],
                ['3', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %'],
                ['4', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %'],
                ['5', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %'],
            ]
        };
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.updateGrid = this.updateGrid.bind(this);
    }

    displayWrapper() {
        console.log(this.state.league);
        if(this.state.league !== '') {
            return <ResultWrapper league={this.state.league} updateGrid={this.updateGrid}/>
        }
    }

    updateGrid(new_stats) {
        var lines =  [];
        lines.push(['Goals', '0', '1', '2', '3', '4', '5']);
        for(var i = 0; i < new_stats.length; i++) {
            lines.push([i, new_stats[i][0], new_stats[i][1], new_stats[i][2], new_stats[i][3], new_stats[i][4], new_stats[i][5]]);
        }
        this.setState( { stats : lines } );
    }

    openPopup() {
        document.getElementById('black-screen').style.display = '';
        this.setState( { league: this.state.league, isPopup: true } );
    }

    closePopup() {
        document.getElementById('black-screen').style.display = 'none';
        this.setState( { league: this.state.league, isPopup: false} );
    }
    displayPopup() {
        if(this.state.isPopup) return <Popup isPopup={this.isPopup} closePopup={this.closePopup} league={this.state.league}/>
    }

    getLayout() {
        console.log(window.innerWidth);
        if(window.innerWidth < 768) {
            return (
                <div>
                {this.displayWrapper()}
                <GridStats stats={this.state.stats}/>
                </div>
            )
        } else {
          return (
            <div className="flex-box">
            {this.displayWrapper()}
            <GridStats stats={this.state.stats}/>
        </div>
          )  
        }
    }

    render() {
        console.log(this.state);
        return(
            <div id='wrapper'>
                <div id='black-screen' style={{display: 'none'}}></div>
                <TitleBar/>
                <NavigationBar setLeague={(state, callback) => this.setState(state, callback)}/>
                <LockButton openPopup={this.openPopup}/>
                {this.getLayout()}
                {this.displayPopup()}
            </div>
        )
    }
}