import { useState } from 'react'
import './App.css'
import mixpanel from 'mixpanel-browser'

mixpanel.init('d2e7c1f14136e9faa6cb80dcd9f8ba15', {
  // debug: true,
  ignore_dnt: true,
})

const localization = require('./localization.json')
const supportedLanguages = ['en', 'es']
const language = (
  window.navigator.userLanguage || window.navigator.language
).substr(0, 2)
const currentLanguage = supportedLanguages.includes(language) ? language : 'en'
const allQuestions = localization[currentLanguage].questions
let questions = [...allQuestions]

const getQuestion = () => {
  if (!questions.length) {
    questions = [...allQuestions]
  }

  const randomIndex = Math.floor(Math.random() * questions.length)
  const question = questions[randomIndex]
  questions = questions.filter((q) => q !== question)
  return question
}

const trackEvent = (name, props) => {
  mixpanel.track(name, {
    ...props,
    language: currentLanguage,
  })
}

trackEvent('visit')

function App() {
  // TODO: getQuestion is being called twice on load
  const [question, setQuestion] = useState(getQuestion())
  const [showSpinner, setShowSpinner] = useState(false)

  const setNewQuestion = () => {
    setShowSpinner(true)
    setQuestion(getQuestion())
    setTimeout(() => setShowSpinner(false), 2000)
    trackEvent('question_click')
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <div className='left-side'>
          <div className='logo-container'>
            <img src={'./icon-white.png'} className='App-logo' alt='logo' />
            <span className='name'>Vulnerable</span>
            <span className='slogan'>
              {localization[currentLanguage].slogan}
            </span>
          </div>
          <p className='details'>
            {localization[currentLanguage].headerDetails}
          </p>
          <div className='store-logos-container'>
            <p className='store-details'>
              {localization[currentLanguage].headerCallToAction}
            </p>
            <div className='store-logos'>
              <a
                href='https://apps.apple.com/us/app/vulnerable-daily-questions/id6444679585'
                onClick={() => trackEvent('apple_click')}
              >
                <img
                  src={'./apple-store.png'}
                  className='store-logo'
                  alt='Apple logo'
                />
              </a>
              <a
                href='https://play.google.com/store/apps/details?id=com.vulnerable.vulnerable'
                onClick={() => trackEvent('android_click')}
              >
                <img
                  src={'./google-play.png'}
                  className='store-logo store-logo-right'
                  alt='Android logo'
                />
              </a>
            </div>
          </div>
        </div>
        <div className='right-side'>
          {/* Change image when it is spanish */}
          <img
            src={`./phone-${currentLanguage}.png`}
            className='phone-image'
            alt='phone'
          />
        </div>
      </header>
      <div className='middle-section'>
        <span className='title'>{localization[currentLanguage].title}</span>
        <span className='title second-title'>
          {localization[currentLanguage].secondTitle}
        </span>

        <div className='button' onClick={setNewQuestion}>
          <span className='button-text'>
            {localization[currentLanguage].button}
          </span>
        </div>

        {showSpinner && <audio src='./spin-and-stop.mp3' autoPlay />}
        <div
          className={`question-container ${
            showSpinner && 'question-container-spinner'
          }`}
        >
          {showSpinner ? (
            allQuestions.map((q, index) => (
              <span key={index} className='question question-spinner'>
                {q}
              </span>
            ))
          ) : (
            <span className='question'>{question}</span>
          )}
        </div>
      </div>

      <div className='middle-section-2'>
        <div className='usp-container'>
          <img
            className='usp-image'
            src={'./icon-white.png'}
            alt='unique-selling-point'
          />
          <span className='usp-title'>
            {localization[currentLanguage].usp1.title}
          </span>
          <span className='usp-description'>
            {localization[currentLanguage].usp1.description}
          </span>
        </div>
        <div className='usp-container'>
          <img
            className='usp-image'
            src={'./usp2.png'}
            alt='unique-selling-point'
          />
          <span className='usp-title'>
            {localization[currentLanguage].usp2.title}
          </span>
          <span className='usp-description'>
            {localization[currentLanguage].usp2.description}
          </span>
        </div>
        <div className='usp-container'>
          <img
            className='usp-image'
            src={'./usp3.png'}
            alt='unique-selling-point'
          />
          <span className='usp-title'>
            {localization[currentLanguage].usp3.title}
          </span>
          <span className='usp-description'>
            {localization[currentLanguage].usp3.description}
          </span>
        </div>
      </div>

      <div className='footer'>
        <img src={'./icon-white.png'} className='App-logo' alt='logo' />
        <span className='title'>
          {localization[currentLanguage].callToAction1}
        </span>
        <span className='title second-title'>
          {localization[currentLanguage].callToAction2}
        </span>

        <div className='store-logos-container'>
          <div className='store-logos'>
            <a
              href='https://apps.apple.com/us/app/vulnerable-daily-questions/id6444679585'
              onClick={() => trackEvent('apple_click')}
            >
              <img
                src={'./apple-store.png'}
                className='store-logo'
                alt='Apple logo'
              />
            </a>
            <a
              href='https://play.google.com/store/apps/details?id=com.vulnerable.vulnerable'
              onClick={() => trackEvent('android_click')}
            >
              <img
                src={'./google-play.png'}
                className='store-logo store-logo-right'
                alt='Android logo'
              />
            </a>
          </div>
        </div>
        <div className='store-logos'>
          <a
            href='https://www.instagram.com/vulnerable.app/'
            onClick={() => trackEvent('ig_click')}
          >
            <img src={'./instagram.png'} alt='Instagram logo' />
          </a>
          <a
            href='https://www.tiktok.com/@vulnerableapp/'
            onClick={() => trackEvent('tiktok_click')}
          >
            <img
              src={'./tiktok.png'}
              className='social-logo-right'
              alt='Tiktok logo'
            />
          </a>
        </div>
        <p className='details'>{localization[currentLanguage].socialText}</p>
      </div>
    </div>
  )
}

export default App
