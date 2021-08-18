import './App.css';
import ProfilePage from './components/Profile/ProfilePage';
import StartUpPage from './components/StartUp/StartUpPage';
import TranslationPage from './components/Translation/TranslationPage';
import NotFoundPage from './components/NotFound/NotFound';
import { 
  BrowserRouter, 
  Switch, 
  Route, 
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={StartUpPage} />
          <Route path="/translator" exact component={TranslationPage} />
          <Route path="/profile" exact component={ProfilePage} />
          <Route path="*" exact component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;