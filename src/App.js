import './App.css'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={'./logo.png'} className='App-logo' alt='logo' />
        <div className='store-logos-container'>
          <a href='https://apps.apple.com/us/app/vulnerable-daily-questions/id6444679585'>
            <img
              src={'./apple-store.png'}
              className='store-logo'
              alt='Apple logo'
            />
          </a>
          <a href='https://play.google.com/store/apps/details?id=com.vulnerable.vulnerable'>
            <img
              src={'./google-play.png'}
              className='store-logo'
              alt='Android logo'
            />
          </a>
        </div>
      </header>
    </div>
  )
}

export default App
