import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

/* Import Styles in order */
import './styles/tokens.css'
import './styles/reset.css'
import './styles/typography.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/pages.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
