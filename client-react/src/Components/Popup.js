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
        Axios.get('http://51.38.68.118:8080/auth?pwd='+pwd, { crossdomain: true }).then(function(response) {
        //Axios.get('http://localhost:8080/auth?pwd='+pwd, { crossdomain: true }).then(function(response) {
            console.log(response);
            if(response.data.status == 'OK') {
                // Go for update Popup
                that.setState( { isLogged: true } );
            } else {
                alert('Wrong password.');
            }
        });
    }

    displayContent() {
        if(this.state.isLogged) {
            return (
                <div>
                    <p>You are logged as and admin, you can now update the database.</p>
                    <div className='input-popup'>
                        <TeamSelector value='Home' id='popup-select1' league={this.props.league}/>
                        <input type='number' id='score1' className='score'></input>
                    </div>
                    <div classNmae='input-popup'>
                        <TeamSelector value='Away' id='popup-select2' league={this.props.league}/>
                        <input type='number' id='score2' className='score'></input>
                    </div>
                    <button className='primary-btn' id='add-btn'>Add</button>
                </div>
            )
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
                <img id='cross' onClick={this.props.closePopup} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjAiIGhlaWdodD0iMjAiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTMwLjk2LDEzLjc2Yy05LjQ1ODM0LDAgLTE3LjIsNy43NDE2NiAtMTcuMiwxNy4ydjExMC4wOGMwLDkuNDU4MzQgNy43NDE2NiwxNy4yIDE3LjIsMTcuMmgxMTAuMDhjOS40NTgzNCwwIDE3LjIsLTcuNzQxNjYgMTcuMiwtMTcuMnYtMTEwLjA4YzAsLTkuNDU4MzQgLTcuNzQxNjYsLTE3LjIgLTE3LjIsLTE3LjJ6TTMwLjk2LDIwLjY0aDExMC4wOGM1LjczOTU4LDAgMTAuMzIsNC41ODA0MiAxMC4zMiwxMC4zMnYxMTAuMDhjMCw1LjczOTU4IC00LjU4MDQyLDEwLjMyIC0xMC4zMiwxMC4zMmgtMTEwLjA4Yy01LjczOTU4LDAgLTEwLjMyLC00LjU4MDQyIC0xMC4zMiwtMTAuMzJ2LTExMC4wOGMwLC01LjczOTU4IDQuNTgwNDIsLTEwLjMyIDEwLjMyLC0xMC4zMnpNNTcuNDcyMTksNTIuNjA3ODFsLTQuODY0MzcsNC44NjQzN2wyOC41Mjc4MSwyOC41Mjc4MWwtMjguNTI3ODEsMjguNTI3ODFsNC44NjQzNyw0Ljg2NDM3bDI4LjUyNzgxLC0yOC41Mjc4MWwyOC41Mjc4MSwyOC41Mjc4MWw0Ljg2NDM3LC00Ljg2NDM3bC0yOC41Mjc4MSwtMjguNTI3ODFsMjguNTI3ODEsLTI4LjUyNzgxbC00Ljg2NDM3LC00Ljg2NDM3bC0yOC41Mjc4MSwyOC41Mjc4MXoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="/>
                {this.displayContent()}
            </div> 
            )
    }
}