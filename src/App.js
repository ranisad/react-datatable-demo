import react, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { render } from 'react-dom';
import React from 'react';
import { TableSimple } from 'react-pagination-table';
import {Pager} from 'react-bootstrap'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      data:null,
      prev:null,
      next:null,
      count:0,
      header:null
    }
    this.prevData = this.prevData.bind(this);
    this.nextData = this.nextData.bind(this);
    this.hitApi = this.hitApi.bind(this);
  }

  hitApi(url){
    fetch(url).then(res=>res.json())
    .then(res=>{
      let count =0;
      this.setState({
        data:res.results,
        prev:res.previous,
        next:res.next,
        count:res.count
      })
    });
  }

  prevData(){
    if(this.state.prev)
      this.hitApi(this.state.prev)
  }

  nextData(){
    if(this.state.next)
      this.hitApi(this.state.next)
  }

  componentWillMount(){
    // this.hitApi('https://swapi.co/api/people/');
    fetch('https://swapi.co/api/people/').then(res=>res.json())
    .then(res=>{
      this.setState({
        data:res.results,
        prev:res.previous,
        next:res.next,
        count:res.count,
        header: Object.keys(res.results[0]).splice(0,5)
      })
    });
  }

  render() {
    return (
      <div>
      {this.state.data && <div><TableSimple
          title="PEOPLE DATA"
          data={ this.state.data }
          headers={ this.state.header }
          columns={this.state.header.join('.')}
          //Tell the component what order you wanna render.
          arrayOption={ [["size", 'all', ', ']] }
      />
        <Pager>
          <Pager.Item style={!this.state.prev ? {display:"none"}: {}} disabled={this.state.prev == null} href="JavaScript:void(0)" onClick={this.prevData}>Previous</Pager.Item>{' '}
          <Pager.Item style={!this.state.next ? {display:"none"}: {}} disabled={this.state.next == null} href="JavaScript:void(0)" onClick={this.nextData}>Next</Pager.Item>
        </Pager></div>
      }
      </div>
    )
  }
}

export default App;
