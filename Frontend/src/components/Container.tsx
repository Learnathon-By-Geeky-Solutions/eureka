import React from 'react'

type Props = {
    children: React.ReactNode;
    
}
const Container = ({children}:Props) => {
  return (
    <div className='mx-auto max-w-[980px] px-6'>{children}</div>
  )
}

export default Container