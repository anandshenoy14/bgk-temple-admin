import React, { Component } from 'react';
import queryString from 'query-string'
import LoggedInAppBar from './LoggedInAppBar'
import DataTable from './DataTable'
import Loader from './Loader'
export class HomePage extends Component {
    constructor(){
        super()
        this.state = {
            params : {},
            data  : []
        }
    }
    async dataFetcher(){
        const data = await this.props.fireStoreDataFetcher();
        return data
    }
    componentDidMount(){
        const current = this.state.data;
        const fetchedData = this.dataFetcher();
        fetchedData.then(d=>{
            const newData = current.concat(d);
            console.log('Now finally new data is ==> '+newData);
            this.setState({data : newData})
        })
    }
    render() {
        return (
            <div>
                <LoggedInAppBar onSignOut={this.props.signOutController}></LoggedInAppBar>
                {this.state.data.length > 0 ? (<DataTable records={this.state.data}></DataTable>) : (<Loader></Loader>)}
            </div>
        );
    }
}

export default HomePage;
