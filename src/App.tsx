import { Helmet } from 'react-helmet'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { connect } from 'react-redux'
import './app.css'
// import favicon from './images/favicon.ico'
import Welcome from './components/welcome'
import MasterResults from './components/master-results'
import themeColors from './config/theme-colors'

const GlobalStyle = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      border: 0;
      vertical-align: baseline;
  }

  body {
    font-family: 'Montserrat', sans-serif;
  }
`

type ThemeState = {
  theme: string
}

type AppProps = {
  theme: string
}

const App = (props: AppProps): JSX.Element => {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>iClinic Frontend Challenge</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
      </Helmet>
      <ThemeProvider theme={themeColors}>
        <GlobalStyle />
        {props.theme === '' ? <Welcome /> : <MasterResults />}
      </ThemeProvider>
    </div>
  )
}

const mapStateToProps = (state: ThemeState) => {
  return {
    theme: state.theme,
  }
}

export default connect(mapStateToProps)(App)
