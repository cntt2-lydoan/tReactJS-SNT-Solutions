import React, { Component } from 'react';
// import {BrowserRouter, NavLink, Route, Switch,} from 'react-router-dom';
import Login from './components/login/Login';
import ListAnimal from './components/animal/ListAnimal';
import {connect} from 'react-redux';
import './App.css'
// import { checkAuthenAction } from './redux/action';
import * as actions from './redux/action';
class App extends Component {
  constructor(props) {
    super(props);
    
  }
  checkAuthenAction = () => {
        if (localStorage.getItem('user')) {
            let dataToken = localStorage.getItem('user').split('.')[1];
            let dateEpx = -1;
            dataToken && (dateEpx = JSON.parse(atob(dataToken)).exp*1000 - Date.now());
            dateEpx > 0 ? this.props.isAuthenAction(localStorage.getItem('user')) : localStorage.removeItem('user');
        } else this.props.noAuthenAction();
    
  };
  componentDidMount() {
    this.checkAuthenAction();
  }
  
  render() {
    return this.props.isAuthen? <ListAnimal/>:<Login/>
      // <div className="App">
      // <BrowserRouter>
      //   <div className="header">
      //     {/* <NavLink exact activeClassName="active" to="/">Home</NavLink> */}
      //     <NavLink exact activeClassName="active" to="/">Login</NavLink>
      //     <NavLink activeClassName="active" to="/animal">Animal</NavLink>
      //   </div>
      //   <div className="content">
      //     <Switch>
      //       {/* <Route exact path="/" component={Home}/> */}
      //       <Route exact path="/" component={Login}/>
      //       <Route exact path="/animal" component={ListAnimal}/>
      //     </Switch>
      //   </div>
      // </BrowserRouter>
      
      // </div>    
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthen: state?.authen
  }
}
const mapDispatchToProps = (dispatch,props) => {
  return {
    isAuthenAction: (token) => {
      dispatch(actions.isAuthenAction(token))
    },
    noAuthenAction: () => {
      dispatch(actions.noAuthenAction())
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);