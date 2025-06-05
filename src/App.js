import React, { useState, useEffect } from 'react';
import './styles/App.css';
import './styles/Header.css';
import './styles/Sections.css';
import './styles/Animations.css';
import './styles/PopupForm.css';

import StellarBurgersImg from './assets/stellar-burgers.png';
import WebLarekImg from './assets/web-larek.png';
import FilmProjectImg from './assets/film-project.png';
import SkilsImg from './assets/skils.png';



const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [menuOpen]);

  return (
    <header className="header">
      <p className="logo">ALEKSEI SUNDUKOV</p>

      <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
        <a href="#home" onClick={closeMenu}>HOME</a>
        <a href="#about" onClick={closeMenu}>ABOUT</a>
        <a href="#projects" onClick={closeMenu}>PROJECTS</a>
        <a href="#contact" onClick={closeMenu}>CONTACTS</a>
      </nav>

      {menuOpen && <div className="overlay" onClick={closeMenu}></div>}
    </header>
  );
};

const Section = ({ id, children }) => {
return (
  <section id={id} className="section fade-in">
    {children}
  </section>
)
};

const ContactForm = ({ onClose }) => (
  <>
    <div className="popup-form fade-in visible">
      <h3>Свяжитесь со мной</h3>
      <form onSubmit={(e) => {
        e.preventDefault();
        alert('Данные отправлены!');
        onClose();
      }}>
        <input type="tel" placeholder="Номер телефона" required />
        <input type="email" placeholder="Email" required />
        <textarea placeholder="Сообщение" required></textarea>
        <button type="submit">Отправить</button>
      </form>
      <button className="close-btn" onClick={onClose}>Закрыть</button>
    </div>
    <div className="overlay-bg" onClick={onClose}></div>
  </>
);

const App = () => {

  useEffect(() => {
const typedTextSpan = document.querySelector(".home-section-title-blue");
const cursorSpan = document.querySelector(".cursor");
const textArray = ["FULLSTACK DEVELOPER", "FRONTEND DEVELOPER", "BACKEND DEVELOPER", "GOOD MAN"];
const typingDelay = 100;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = typedTextSpan.textContent + textArray[textArrayIndex].charAt(charIndex);
    console.log('12345')
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
  	setTimeout(erase, newTextDelay);
  }
}

function erase() {
	if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

setTimeout(type, newTextDelay + 250);
 }, []);



  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <Section id="home" >
          <div className="home-section">
          <h1 className='home-section-title'>HI, I'M A <br/><span className='home-section-title-blue' id='typed-text'></span><span className="cursor" id='cursor'>&nbsp;</span></h1>
          <button className="btn-contact">DOWNLOAD CV</button> 
          </div>
        </Section>

        <Section id="about">
          <h2 className="section-title">About Me</h2>
          <div className='section-about'> 
          <p className='section-about-text'>
            Я - Full-Stack JavaScript разработчик с 3-летним опытом во фрилансе и собственных проектах.
            Специализируюсь на создании масштабируемых веб-приложений с использованием Vue.js, React, Node.js и Nest.js.
            В работе активно применяю принципы ООП, умею строить архитектуру и работаю с базами данных MongoDB и PostgreSQL.
            Среди реализованных проектов — онлайн-сервис “Космическая бургерная”, платформа для “Кино афиши” и Telegram-бот.
            Внимательно подхожу к деталям, довожу задачи до результата и всегда предлагаю свежие идеи.
            Открыт к командной работе и полностью готов к удалённому сотрудничеству.
          </p>
          <img src={SkilsImg} alt='Skils fullstack developer' className='section-about-skils'></img>
          </div>
        </Section>

        <Section id="projects">
          <h2 className="section-title">Projects</h2>
          <div className="project-list">
            <div className="project-item">
              <a href="https://screama6.github.io/stellar-burgers/" target="_blank" rel="noopener noreferrer" className='project-item-left'>
                <img src={StellarBurgersImg} alt="Stellar Burgers" />
                <h3>STELLAR-BURGERS</h3>
              </a>
              <a href="https://github.com/screama6/bad-server.git" target="_blank" rel="noopener noreferrer">
                <img src={WebLarekImg} alt="Web Larek" />
                <h3>WEB-LAREK</h3>
              </a>
              <a href="https://github.com/screama6/film-react-nest.git" target="_blank" rel="noopener noreferrer" className='project-item-right'>
                <img src={FilmProjectImg} alt="Film Project" />
                <h3>FILM!</h3>
              </a>
            </div>
          </div>
        </Section>

        <Section id="contact">
          <h2 className="section-title">Contacts</h2>
          <div className="contacts">
        </div>
        </Section>
      </main>
      <footer>
    <div class="footer-name">
    <p>ALEKSEI SUNDUKOV</p>
    <nav class="footer-menu">
      <a href="#home">HOME</a>
      <a href="#about">ABOUT</a>
      <a href="#projects">PROJECTS</a>
      <a href="#contacts">CONTACTS</a>
    </nav>
    </div>
    <div class="footer-icons">
      <a href="https://t.me/your_username" target="_blank" aria-label="Telegram">
        <i class="fab fa-telegram"></i>
      </a>
      <a href="https://www.instagram.com/your_username" target="_blank" aria-label="Instagram">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="https://github.com/your_username" target="_blank" aria-label="GitHub">
        <i class="fab fa-github"></i>
      </a>
    </div>

    <a href="mailto:your_email@yandex.ru" class="footer-email">your_email@yandex.ru</a>
  </footer>
      {showForm && <ContactForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default App;
