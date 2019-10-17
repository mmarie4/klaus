import React from 'react'
import Axios from 'axios';
import TeamSelector from './TeamSelector';

export default class Popup extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { isLogged: false };
    }

    handleSubmit(event) {
        var pwd = document.getElementById('password').value;        
        // Send pwd to API to get auth token, and display other popup
        var that = this;
        Axios.get('http://51.38.68.118:80/auth?pwd='+pwd, { crossdomain: true }).then(function(response) {
        //Axios.get('http://localhost:80/auth?pwd='+pwd, { crossdomain: true }).then(function(response) {
            console.log(response);
            if(response.data.status == 'OK') {
                // Go for update Popup
                that.setState( { isLogged: true , duration: response.data.time} );
            } else {
                alert('Wrong password.');
            }
        });
    }

    displayContent() {
        if(this.state.isLogged) {
            return <p>The database has been updated and it took {this.state.time} seconds.</p>
        } else {
            return (
                <div>
                    <p>Enter admin password to update database</p>
                    <input id='password' type='password' onKeyDown={this.keyPressed}></input>
                    <button id='ok-button' class='primary-btn' onClick={this.handleSubmit}>OK</button>
                </div>)
        }
    }

    keyPressed(event) {
        if(event.keyCode == 13) {
            document.getElementById('ok-button').click();
        }
    }

    render() {
        return(
            <div id='popup' onClick={this.props.closePopUp}>
                <img id='cross' onClick={this.props.closePopup} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAyNCAyNCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij4gICAgPHBhdGggZD0iTSA1IDMgQyAzLjg5NSAzIDMgMy44OTUgMyA1IEwgMyAxOSBDIDMgMjAuMTA1IDMuODk1IDIxIDUgMjEgTCAxOSAyMSBDIDIwLjEwNSAyMSAyMSAyMC4xMDUgMjEgMTkgTCAyMSA1IEMgMjEgMy44OTUgMjAuMTA1IDMgMTkgMyBMIDUgMyB6IE0gOCA3IEMgOC4yNTU3NSA3IDguNTExNTMxMyA3LjA5NzQ2ODggOC43MDcwMzEyIDcuMjkyOTY4OCBMIDEyIDEwLjU4NTkzOCBMIDE1LjI5Mjk2OSA3LjI5Mjk2ODggQyAxNS4zOTA3MTkgNy4xOTUyMTg4IDE1LjUwMjcwMyA3LjEyMTE0MDYgMTUuNjIzMDQ3IDcuMDcyMjY1NiBDIDE1Ljk4NDA3OCA2LjkyNTY0MDYgMTYuNDEzNzgxIDYuOTk5NzE4NyAxNi43MDcwMzEgNy4yOTI5Njg4IEMgMTcuMDk4MDMxIDcuNjgzOTY4OCAxNy4wOTgwMzEgOC4zMTYwMzEyIDE2LjcwNzAzMSA4LjcwNzAzMTIgTCAxMy40MTQwNjIgMTIgTCAxNi43MDcwMzEgMTUuMjkyOTY5IEMgMTcuMDAwMjgxIDE1LjU4NjIxOSAxNy4wNzQzNTkgMTYuMDE1OTIyIDE2LjkyNzczNCAxNi4zNzY5NTMgQyAxNi44Nzg4NTkgMTYuNDk3Mjk3IDE2LjgwNDc4MSAxNi42MDkyODEgMTYuNzA3MDMxIDE2LjcwNzAzMSBDIDE2LjYwOTUzMSAxNi44MDQ1MzEgMTYuNDk3MzI4IDE2Ljg3NjkwNiAxNi4zNzY5NTMgMTYuOTI1NzgxIEMgMTYuMjU2NTc4IDE2Ljk3NDY1NiAxNi4xMjggMTcgMTYgMTcgQyAxNS43NDQgMTcgMTUuNDg3OTY5IDE2LjkwMjAzMSAxNS4yOTI5NjkgMTYuNzA3MDMxIEwgMTIgMTMuNDE0MDYyIEwgOC43MDcwMzEyIDE2LjcwNzAzMSBDIDguNTEyMDMxMiAxNi45MDIwMzEgOC4yNTYgMTcgOCAxNyBDIDcuNzQ0IDE3IDcuNDg3OTY4OCAxNi45MDIwMzEgNy4yOTI5Njg4IDE2LjcwNzAzMSBDIDYuOTAxOTY4NyAxNi4zMTYwMzEgNi45MDE5Njg3IDE1LjY4Mzk2OSA3LjI5Mjk2ODggMTUuMjkyOTY5IEwgMTAuNTg1OTM4IDEyIEwgNy4yOTI5Njg4IDguNzA3MDMxMiBDIDYuOTAxOTY4NyA4LjMxNjAzMTIgNi45MDE5Njg3IDcuNjgzOTY4NyA3LjI5Mjk2ODggNy4yOTI5Njg4IEMgNy40ODg0Njg4IDcuMDk3NDY4NyA3Ljc0NDI1IDcgOCA3IHoiPjwvcGF0aD48L3N2Zz4="></img>
                {this.displayContent()}
            </div> 
            )
    }
}