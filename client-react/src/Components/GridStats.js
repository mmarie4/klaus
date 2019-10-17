import React from 'react';
import Tile from './Tile';

export default class GridStats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            homeTeam: 'Home',
            awayTeam: 'Away',
        }
    }

    getFirstLine() {
        var line = [];
        line.push(<Tile value=''></Tile>);
        for (var i = 0; i < 6; i++) {
            line.push(<Tile value={i}></Tile>);
        }
        return line;
    }

    getBackground(percentage) {
       if(percentage in ['Goals', '0', '1', '2', '3', '4', '5']) return 'grey' ;
       percentage = parseFloat(percentage);
       var r = percentage<5 ? 255 : Math.floor(255-(percentage*2-12)*255/12);
       var g = percentage>5 ? 255 : Math.floor((percentage*2)*255/12);
       return 'rgb('+r+','+g+',0)';
    }

    getGrid() {
        // Return array of lines
        var DOMGrid = [];
        for(var i = 0; i < this.props.stats.length; i++) {
            var DOMLine = [];
            for(var j = 0; j < this.props.stats[i].length; j++) {
                var anim = 'fade ' + parseInt((i+j)/2) + 's';
                DOMLine.push(<Tile className='to-move-up' value={this.props.stats[i][j]} style={{background: this.getBackground(this.props.stats[i][j]), animation: anim}}></Tile>);
            }
            DOMGrid.push(<div className='line to-move-up'> {DOMLine} </div>);
        }
        return DOMGrid;
    }

    render() {
        console.log('rendering...');
        console.log('lines:', this.props.stats);
        // Call get Grid to get all the lines
        return(
            <div id='grid-wrapper' className='grid-stats'>
                <p id='team1'>{this.state.homeTeam}</p>
                <p id='team2'>{this.state.awayTeam}</p>
                {this.getGrid()}
            </div>
        )
    }
}