import React from "react"
import './header.css'

const Header = ({ theme }) => {
  return (
    <>
      <div className="container">
        <div className={theme ? "header__inner" : "header__inner light"}>
          <a href="#" className="header-logo">
            {/* <img src="ton.png" alt="Logo" /> */}
            <span>DevART</span>
          </a>

          <nav className="header-nav">
            <ul className="header-ul">
              <li className="header-ul__li"><a href="#">Портфолио</a></li>
              <li className="header-ul__li"><a href="#">Контакты</a></li>
              <li className="header-ul__li"><a href="#">Оборудование</a></li>
              <li>
              <button class="btn-burger">
                <div class="burger-logo">
                  <div class="burger-logo-line"></div>
                  <div class="burger-logo-line"></div>
                </div>
              </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Header
