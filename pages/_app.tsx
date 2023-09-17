import { useEffect } from 'react'
import store from '@/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import "bootstrap-icons/font/bootstrap-icons.css";
import { loadUser } from '@/slices/authSlice';

export default function App({ Component, pageProps }: AppProps) {
  // Load user when the application initializes
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  ) 
}
