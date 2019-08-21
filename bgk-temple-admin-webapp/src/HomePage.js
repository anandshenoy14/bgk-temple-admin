import React, { Component } from 'react';
import queryString from 'query-string'
import LoggedInAppBar from './LoggedInAppBar'

export class HomePage extends Component {
    constructor(){
        super()
        this.state = {
            params : {}
        }
    }
    componentDidMount(){
        const values = queryString.parse(this.props.location.search)
        this.setState({params : Object.assign({},values)})
    }
    render() {
        return (
            <div>
                <LoggedInAppBar onSignOut={this.props.onSignOut}></LoggedInAppBar>
                <h1>Welcome, {this.state.params.uname}</h1>
            </div>
        );
    }
}

export default HomePage;
