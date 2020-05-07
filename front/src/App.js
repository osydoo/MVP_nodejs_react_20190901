import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CustomTable from './seller/sellertable'
import Request from './customer/requestform'

const App = () => {
  return(
    <Router>
      <Switch>
          <Route path="/Customer" component={Request}/>
          <Route path="/" component={CustomTable}/>
      </Switch>
    </Router>
  )
}

export default App;
