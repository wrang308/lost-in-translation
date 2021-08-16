import './App.css';
import ProfilePage from './components/Profile/ProfilePage';
import StartUpPage from './components/StartUp/StartUpPage';
import TranslationPage from './components/Translation/TranslationPage';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
        <Route path="/" exact component={StartUpPage} />
        <Route path="/translator" exact component={TranslationPage} />
        <Route path="/profile" exact component={ProfilePage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
