import '../styles/Header.css'
import { Link } from 'react-router-dom';
import flashcardlogo from './images/flashcardlogo.png'
function Header({ topicView, cardView, topics, topic, getCompletedCardsCount, getTopicCompletedCards }) {
  return (
    <header>
      {topicView && (
        <nav className="topicsNav">
          <ul>
            <div className="topicsNavLeft">
              <li><Link to="/">Flashcard</Link></li>
            </div>
            <div className="topicsNavRight">
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/terms-and-privacy">Shartlar & Maxfiylik</Link></li>
              <li><Link to="/about">Abut Us</Link></li>
              <li className='dropdown'>
                <span>Yod olganlar: {getCompletedCardsCount()}ta</span>
                <ul className="dropdown-content">
                  {topics.map((topicEntry, index) => {
                    const topicKey = Object.keys(topicEntry)[0];
                    const completedCards = getTopicCompletedCards(topicKey);
                    return completedCards.length > 0 ? (
                      completedCards.map((card, idx) => (
                        <li key={idx}>
                          <p>{card.front} - {card.back}</p>
                        </li>
                      ))
                    ) : null;
                  })}
                </ul>
              </li>
            </div>
          </ul>
        </nav>
      )}

      {cardView && (
        <nav className="cardsNav">
          <ul>
            <div className="cardsNavLeft">
            <li><a href="./">Flashcard</a></li>
            </div>
            <div className="cardsNavRight">
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/terms-and-privacy">Shartlar & Maxfiylik</Link></li>
              <li><Link to="/about">Abut Us</Link></li>
              <li className='dropdown'>
                <span>Yod olganlar: {getTopicCompletedCards(topic).length}ta</span>
                <ul className="dropdown-content">
                  {getTopicCompletedCards(topic).map((card, idx) => (
                    <li key={idx}>
                      <p>{card.front} - {card.back}</p>
                    </li>
                  ))}
                </ul>
              </li>
            </div>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
