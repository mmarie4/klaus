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
            isPopup: false
        };
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    displayWrapper() {
        console.log(this.state.league);
        if(this.state.league !== '') {
            return <ResultWrapper league={this.state.league}/>
        }
    }

    openPopup() {
        this.setState( { league: this.state.league, isPopup: true } );
    }

    closePopup() {
        this.setState( { league: this.state.league, isPopup: false} );
    }
    displayPopup() {
        if(this.state.isPopup) return <Popup isPopup={this.isPopup} closePopup={this.closePopup} league={this.state.league}/>
    }

    render() {
        console.log(this.state);
        return(
            <div id='wrapper'>
                <TitleBar/>
                <NavigationBar setLeague={(s, c) => this.setState(s, c)}/>
                <LockButton openPopup={this.openPopup}/>
                {this.displayWrapper()}
                {this.displayPopup()}
                <GridStats/>
            </div>
        )
    }
}