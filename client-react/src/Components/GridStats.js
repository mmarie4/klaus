import React from 'react';
import Tile from './Tile';

export default class GridStats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lines: [
                ['Score', '0', '1', '2', '3', '4', '5'],
                ['0', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %'],
                ['1', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %'],
                ['2', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %'],
                ['3', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %'],
                ['4', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %'],
                ['5', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %', '0.0 %'],
            ]
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

    getGrid() {
        // Return array of lines
        var DOMGrid = [];
        for(var i = 0; i < this.state.lines.length; i++) {
            var DOMLine = [];
            for(var j = 0; j < this.state.lines[i].length; j++) {
                DOMLine.push(<Tile value={this.state.lines[i][j]}></Tile>);
            }
            DOMGrid.push(<div className='line'> {DOMLine} </div>);
        }
        return DOMGrid;
    }

    render() {
        // Call get Grid to get all the lines
        return(
            <div id='grid-wrapper' className='grid-stats'>
                <p id='team1'>Team 1</p>
                <p id='team2'>Team 2</p>
                {this.getGrid()}
            </div>
        )
    }
}