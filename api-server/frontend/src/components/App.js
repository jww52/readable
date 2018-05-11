import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import ListPosts from './ListPosts'
import Header from './Header'
import PostDetail from './PostDetail'



class App extends Component {

  render() {

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={ListPosts}/>
          <Route exact path="/:category" component={ListPosts}/>
          <Route exact path="/:category/:id" component={PostDetail}/>
        </Switch>
      </div>

    );
  }
}

export default App;
