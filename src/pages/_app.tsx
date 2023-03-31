import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, NextUIProvider } from '@nextui-org/react'
import { Provider } from 'react-redux'
import { store } from '@/store/store'

const theme = createTheme({
  type: "dark", // it could be "light" or "dark"
  theme: {
    colors: {
      primary: '#4ADE7B',
      secondary: '#F9CB80',
      error: '#FCC5D8',
    },
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </NextUIProvider>
  )
}
