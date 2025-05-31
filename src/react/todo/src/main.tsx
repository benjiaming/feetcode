import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TodoReducer from './TodoReducer'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TodoReducer />
  </StrictMode>,
)
