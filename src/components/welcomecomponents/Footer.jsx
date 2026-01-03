import React from 'react'
import { useNavigate } from 'react-router-dom'
import { footerMessages, navBarMessages } from './welcomePageMessages'
import '../../css/footer.css';
import { Tiktok } from '../../icons/Icons';
import { Facebook } from '../../icons/Icons';
import { Ig } from '../../icons/Icons';
import { Youtube } from '../../icons/Icons';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate("/login");
  }

  const handleNavigateToRegister = () => {
    navigate("/register");
  }

  return (
    <>
      <footer className="footer-container" id="contacts">
        <div className="footer-content">
          <div className="slogan">
            <h1>{navBarMessages.bookifyLogo}</h1>
            <p>{footerMessages.bookifySlogan}</p>

            <div className="icons-social">
              <Tiktok />
              <Facebook />
              <Ig />
              <Youtube />
            </div>
          </div>

          <div className="links">
            <h4>{footerMessages.utilLink}</h4>
            <p>{footerMessages.explore}</p>
            <p onClick={handleNavigateToRegister}>{footerMessages.createAccount}</p>
            <p onClick={handleNavigateToLogin}>{footerMessages.login}</p>
          </div>

          <div className="policies">
            <h4>{footerMessages.policies}</h4>
            <p>{footerMessages.termsAndConditions}</p>
            <p>{footerMessages.privacyPolicies}</p>
          </div>

          <div className="follow-us">
            <h4>{footerMessages.paymentMethods}</h4>
            <p>{footerMessages.creditCard}</p>
            <p>{footerMessages.debitCard}</p>
            <p>{footerMessages.paypal}</p>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="cpyright-message">
          <p>{footerMessages.copyright}</p>
        </div>
      </footer>

    </>
  )
}

export default Footer
