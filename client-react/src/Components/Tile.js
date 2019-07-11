import React from 'react'

export default class Tile extends React.Component {

    constructor(props) {
        super(props);
        this.style = {
            background: 'grey'
        }
    }

    render() {
        return(
            <div className='tile' style={this.style}>
                <p>{this.props.value}</p>
            </div>
        )
    }
}