import React, { Component } from 'react';
import queryString from 'query-string'
import LoggedInAppBar from './LoggedInAppBar'
import Loader from './Loader'
import SearchBar from './SearchBar'
import MemberCards from './MemberCards';
export class HomePage extends Component {
    constructor() {
        super()
        this.state = {
            params: {},
            data: []
        }
    }
    async dataFetcher() {
        const data = await this.props.fireStoreDataFetcher();
        return data
    }
    componentDidMount() {
        const current = this.state.data;
        const fetchedData = this.dataFetcher();
        fetchedData.then(d => {
            const newData = current.concat(d);
            this.setState({ data: newData })
        })
    }
    render() {
        return (
            <div>
                <LoggedInAppBar onSignOut={this.props.signOutController}></LoggedInAppBar>
                <div className="searchBar">
                    <SearchBar></SearchBar>
                </div>
                {this.state.data.length > 0 ? 
                    (<><MemberCards records={this.state.data}></MemberCards></>)
                    : 
                    (<Loader></Loader>)}
            </div>
        );
    }
}

export default HomePage;
