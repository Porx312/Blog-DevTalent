import React from 'react'
import "./auth.css"
const LoginRegisterLayout = ({children}) => {
  return (
    <>
    <section className='auth-content'>
    <h2 className="header-logox">&lt;/<span className="header-logo-spanx">DevTalent</span>&gt;</h2>

       {children}
    </section>
    </>
  )
}

export default LoginRegisterLayout
