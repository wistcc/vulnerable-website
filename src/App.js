import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={'./logo512.png'} className="App-logo" alt="logo" />
        <div className='store-logos-container'>
          <a href='https://apps.apple.com/us/app/letra/id1613044521'>
            <img src={'./apple-store.png'} className="store-logo" alt="Apple logo" />
          </a>
          <a href='https://play.google.com/store/apps/details?id=com.letra.letra'>
            <img src={'./google-play.png'} className="store-logo" alt="Android logo" />
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
