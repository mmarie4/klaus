import React from 'react'

export default class Tile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
        }
    }

    render() {
        return (
            <div className='tile' style={this.props.style}>
                <p>{this.props.value}</p>
            </div>
        )
    }
}