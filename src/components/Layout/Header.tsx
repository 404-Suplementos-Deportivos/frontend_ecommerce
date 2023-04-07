import { useState, useEffect } from 'react'
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen'
import HeaderDesktop from './HeaderDesktop'
import HeaderMobile from './HeaderMobile'

interface HeaderState {
  isAtTop: boolean
}

const Header = () => {
  const isSmallScreen = useIsSmallScreen(768)
  const [isAtTop, setIsAtTop] = useState<HeaderState['isAtTop']>(true)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 0) {
        setIsAtTop(false)
      } else {
        setIsAtTop(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <>
      {isSmallScreen ? (
        // Mobile
        <HeaderMobile isAtTop={isAtTop} />
      ): (
        // Desktop
        <HeaderDesktop isAtTop={isAtTop} />
      )}
    </>
  )
}

export default Header