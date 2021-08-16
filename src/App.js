import './App.css';
import ProfilePage from './components/Profile/ProfilePage';
import StartUpPage from './components/StartUp/StartUpPage';
import TranslationPage from './components/Translation/TranslationPage';

function App() {
  return (
    <div className="App">
      <ProfilePage />
      <StartUpPage />
      <TranslationPage />
    </div>
  );
}

export default App;
