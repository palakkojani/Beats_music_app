import react from 'react'
import Dashboard from './components/Dashboard'
import Dashboard2 from './components/Dashboard2'
import Sidebar from './components/Sidebar'
import './App.css'

function App() {

  return (
    <main>
      <div className='content'>
        <Sidebar />
        <Dashboard2 />
      </div >
    </main>
  )
}

export default App
