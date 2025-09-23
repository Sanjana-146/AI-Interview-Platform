import { useState } from 'react'
// import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routers/Router';


function App(){
  return(
    <div className='h-screen bg-black'>
        <AppRouter/>
    </div>
  )
}
export default App;
