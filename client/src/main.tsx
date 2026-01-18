import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './redux/reducer.ts'
import { Provider } from 'react-redux'

const store = configureStore({
  reducer: rootReducer
})
export type RootState = ReturnType<typeof store.getState>;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Toaster />
      <App />
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
