import react, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { render } from 'react-dom';
import React from 'react';
import DataTables from 'material-ui-datatables';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      data:null,
      prev:null,
      next:null,
      count:0,
      header:null,
      pageNo:1,
      open: false,
      selectedData:null
    }
    this.count=1;
    this.prevData = this.prevData.bind(this);
    this.nextData = this.nextData.bind(this);
    this.hitApi = this.hitApi.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleClickOpen=this.handleClickOpen.bind(this);
    this.handleClose=this.handleClose.bind(this)
  }

  handleCellClick(e){
    this.handleClickOpen(e);
  }

  handleClickOpen(e) {
    this.setState({ open: true,selectedData:this.state.data[e] });
  };

  handleClose() {
    this.setState({ open: false,selectedData:null });
  };

  hitApi(url,count){
    fetch(url).then(res=>res.json())
    .then(res=>{
      this.setState({
        data:res.results,
        prev:res.previous,
        next:res.next,
        count:res.count,
        pageNo:count
      })
    });
  }

  prevData(){
    if(this.state.prev)
      this.count--;
      this.hitApi(this.state.prev,this.count)
  }

  nextData(){
    if(this.state.next)
      this.count++;
      this.hitApi(this.state.next,this.count)
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
        header: Object.keys(res.results[0]).splice(0,5).map(obj=>{
          return {
            key:obj,
            label:obj
          }
        })
      })
    });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          {this.state.data && <div><DataTables
            height={'auto'}
            selectable={false}
            showRowHover={true}
            columns={this.state.header}
            data={this.state.data}
            showCheckboxes={false}
            onCellClick={this.handleCellClick}
            onCellDoubleClick={this.handleCellDoubleClick}
            onFilterValueChange={this.handleFilterValueChange}
            onSortOrderChange={this.handleSortOrderChange}
            onNextPageClick={this.nextData}
            onPreviousPageClick={this.prevData}
            page={this.state.pageNo }
            count={this.state.count}
          />
            {/* <Pager>
              <Pager.Item style={!this.state.prev ? {display:"none"}: {}} disabled={this.state.prev == null} href="JavaScript:void(0)" onClick={this.prevData}>Previous</Pager.Item>{' '}
              <Pager.Item style={!this.state.next ? {display:"none"}: {}} disabled={this.state.next == null} href="JavaScript:void(0)" onClick={this.nextData}>Next</Pager.Item>
            </Pager></div> */}
          </div>}

          <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={styles.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={styles.flex}>
                Data
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem button>
              <ListItemText primary="Phone ringtone" secondary="Titania" />
            </ListItem>
            <Divider />
            {this.state.selectedData && Object.keys(this.state.selectedData).map(obj=>{
              return <ListItem><ListItemText primary={obj} secondary={this.state.selectedData[obj]} /></ListItem>
            })}
          </List>
        </Dialog>

      </MuiThemeProvider>
      </div>
    )
  }
}


export default App;
