import React from 'react';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import SavedPin from './components/savedPins/savedPins';
import GenerateSavePin from './components/generate/generateSavePin';

const App: React.FC = () => {

  return (
    <div className="App">
        <div className='links'>
          <Link to='/generate' className='link'>Generate</Link>
          <Link to='/saved' className='link'>Saved</Link>
        </div>
        <div className="tabs">
          <Switch>
            <Route path="/saved" component={SavedPin}/>
            <Route path="/generate" component={GenerateSavePin}/>
          </Switch>
        </div>  
    </div>
  );
}

export default App;
