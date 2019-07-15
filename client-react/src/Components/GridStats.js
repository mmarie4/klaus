import React from 'react';
import Tile from './Tile';

export default class GridStats extends React.Component {

    constructor(props) {
        super(props);
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
        if (percentage in ['Score', '0', '1', '2', '3', '4', '5']) return { background: 'grey' };
        var color;
       if(parseFloat(percentage) < 0.1) color = "#ff5900";
       else if(parseFloat(percentage) < 1) color = "#ff5900";
       else if(parseFloat(percentage) < 2) color = "#ffc400";
       else if(parseFloat(percentage) < 3) color = "#ffae00";
       else if(parseFloat(percentage) < 4) color = "#ffd000";
       else if(parseFloat(percentage) < 5) color = "#fbff00";
       else if(parseFloat(percentage) < 6) color = "#d0ff00";
       else if(parseFloat(percentage) < 7) color = "#aeff00";
       else if(parseFloat(percentage) < 8) color = "#73ff00";
       else if(parseFloat(percentage) >= 8) color = "#1eff00";
        return { background: color };
    }

    getGrid() {
        // Return array of lines
        var DOMGrid = [];
        for(var i = 0; i < this.props.stats.length; i++) {
            var DOMLine = [];
            for(var j = 0; j < this.props.stats[i].length; j++) {
                DOMLine.push(<Tile value={this.props.stats[i][j]} style={this.getBackground(this.props.stats[i][j])}></Tile>);
            }
            DOMGrid.push(<div className='line'> {DOMLine} </div>);
        }
        return DOMGrid;
    }

    render() {
        console.log('rendering...');
        console.log('lines:', this.props.stats);
        // Call get Grid to get all the lines
        return(
            <div id='grid-wrapper' className='grid-stats'>
                <p id='team1'>Home team</p>
                <p id='team2'>Away team</p>
                {this.getGrid()}
            </div>
        )
    }
}