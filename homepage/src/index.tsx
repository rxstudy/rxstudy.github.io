import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './home/App'
import ArkRngApp from './ark_rng/App'
import ARK_RNG_PATH from './ark_rng/Path'
import reportWebVitals from './reportWebVitals'
import NoteIndex from './note'
import NotFound from './NotFound'
import { Routes, Route, HashRouter } from 'react-router-dom'
import RegisterNotes from './RegisterNotes'

if (process.env.NODE_ENV === 'production') {
  console.log = () => { }
}

RegisterNotes()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/note" element={<Home />}>
          <Route path=":subject" element={<NoteIndex />} />
          <Route path=":subject/:key" element={<NoteIndex />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path={`/demo/${ARK_RNG_PATH}`} element={<ArkRngApp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  </React.StrictMode >
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
