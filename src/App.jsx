import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FAQ from './components/FAQ';
import NotFound from './components/NotFound';
import TermsAndPrivacyPage from './components/TermsAndPrivacyPage';
import AboutUs from './components/AboutUs';
function App() {
  const [editingTopic, setEditingTopic] = useState(null);
  const [newTopicName, setNewTopicName] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedFront, setEditedFront] = useState('');
  const [editedBack, setEditedBack] = useState('');

  const [addTopic, setAddTopic] = useState(false)
  const [addCard, setAddCard] = useState(false)
  const [topic, setTopic] = useState('');
  const [cardFront, setCardFront] = useState('');
  const [cardBack, setCardBack] = useState('');
  const [topics, setTopics] = useState(() => {
    const savedTopics = localStorage.getItem('topics');
    return savedTopics ? JSON.parse(savedTopics) : [];
  });
  const [topicView, setTopicView] = useState(true);
  const [cardView, setCardView] = useState(false);

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };

  const handleCardFrontChange = (event) => {
    setCardFront(event.target.value);
  };

  const handleCardBackChange = (event) => {
    setCardBack(event.target.value);
  };

  const handleTopicSubmit = (event) => {
    event.preventDefault();
    if (topic.trim()) {
      const newTopicEntry = {
        [topic]: [],
      };
      const updatedTopics = [...topics, newTopicEntry];
      setTopics(updatedTopics);
      setTopic('');
    }
  };

  const handleCardSubmit = (event) => {
    event.preventDefault();
    if (cardFront.trim() && cardBack.trim()) {
      const newCardEntry = {
        front: cardFront,
        back: cardBack,
        score: 0,
        showNewCard: false,
      };
      const updatedTopics = topics.map((topicEntry) => {
        const topicKey = Object.keys(topicEntry)[0];
        return topicKey === topic
          ? { [topicKey]: [...topicEntry[topicKey], newCardEntry] }
          : topicEntry;
      });
      setTopics(updatedTopics);
      setCardFront('');
      setCardBack('');
    }
  };

  const handleTopicButtonClick = (topicName) => {
    setTopicView(false);
    setCardView(true);
    setTopic(topicName);
  };

  useEffect(() => {
    localStorage.setItem('topics', JSON.stringify(topics));
  }, [topics]);

  const handleScoreChange = (cardIndex, isCorrect) => {
    const updatedTopics = topics.map((topicEntry) => {
      const topicKey = Object.keys(topicEntry)[0];
      if (topic === topicKey) {
        const updatedCards = [...topicEntry[topicKey]];
        const card = updatedCards[cardIndex];
        card.score = isCorrect ? card.score + 1 : card.score - 1;

        card.showNewCard = card.score >= 100;

        updatedCards[cardIndex] = card;
        return { [topicKey]: updatedCards };
      }
      return topicEntry;
    });
    setTopics(updatedTopics);
  };

  const getCompletedCardsCount = () => {
    return topics.reduce((count, topicEntry) => {
      const topicKey = Object.keys(topicEntry)[0];
      const completedCards = topicEntry[topicKey].filter(card => card.score >= 100);
      return count + completedCards.length;
    }, 0);
  };

  const getTopicCompletedCards = (topicName) => {
    const topicEntry = topics.find((entry) => Object.keys(entry)[0] === topicName);
    return topicEntry ? topicEntry[topicName].filter(card => card.score >= 100) : [];
  };

  const handleEditTopic = (oldTopicName, newTopicName) => {
    const updatedTopics = topics.map((topicEntry) => {
      const topicKey = Object.keys(topicEntry)[0];
      if (topicKey === oldTopicName) {
        return { [newTopicName]: topicEntry[topicKey] };
      }
      return topicEntry;
    });
    setTopics(updatedTopics);
  };

  const handleDeleteTopic = (topicName) => {
    const updatedTopics = topics.filter((topicEntry) => {
      const topicKey = Object.keys(topicEntry)[0];
      return topicKey !== topicName;
    });
    setTopics(updatedTopics);
  };


  const handleEditCard = (cardIndex, newFront, newBack) => {
    const updatedTopics = topics.map((topicEntry) => {
      const topicKey = Object.keys(topicEntry)[0];
      if (topic === topicKey) {
        const updatedCards = [...topicEntry[topicKey]];
        updatedCards[cardIndex] = {
          ...updatedCards[cardIndex],
          front: newFront,
          back: newBack,
        };
        return { [topicKey]: updatedCards };
      }
      return topicEntry;
    });
    setTopics(updatedTopics);
  };

  const handleDeleteCard = (cardIndex) => {
    const updatedTopics = topics.map((topicEntry) => {
      const topicKey = Object.keys(topicEntry)[0];
      if (topic === topicKey) {
        const updatedCards = topicEntry[topicKey].filter((_, idx) => idx !== cardIndex);
        return { [topicKey]: updatedCards };
      }
      return topicEntry;
    });
    setTopics(updatedTopics);
  };

  function handleFlip(index) {
    const cardContainer = document.querySelectorAll('.cardContainer')[index];
    cardContainer.classList.toggle('flipped');
  }


  return (
    <>
      <Router>
        <Header
          topicView={topicView}
          cardView={cardView}
          topics={topics}
          topic={topic}
          getCompletedCardsCount={getCompletedCardsCount}
          getTopicCompletedCards={getTopicCompletedCards}
        />
        <Routes>
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms-and-privacy" element={<TermsAndPrivacyPage/>} />
          <Route path="/about" element={<AboutUs/>} />
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={
            <>
              <Main
                topicView={topicView}
                cardView={cardView}
                topics={topics}
                topic={topic}
                editingTopic={editingTopic}
                newTopicName={newTopicName}
                editIndex={editIndex}
                editedFront={editedFront}
                editedBack={editedBack}
                handleTopicButtonClick={handleTopicButtonClick}
                handleEditTopic={handleEditTopic}
                handleDeleteTopic={handleDeleteTopic}
                handleFlip={handleFlip}
                handleEditCard={handleEditCard}
                handleDeleteCard={handleDeleteCard}
                handleScoreChange={handleScoreChange}
                setEditingTopic={setEditingTopic}
                setNewTopicName={setNewTopicName}
                setEditIndex={setEditIndex}
                setEditedFront={setEditedFront}
                setEditedBack={setEditedBack}
              />
              <Footer
                topicView={topicView}
                cardView={cardView}
                topic={topic}
                cardFront={cardFront}
                cardBack={cardBack}
                addTopic={addTopic}
                addCard={addCard}
                setAddTopic={setAddTopic}
                setAddCard={setAddCard}
                handleTopicChange={handleTopicChange}
                handleCardFrontChange={handleCardFrontChange}
                handleCardBackChange={handleCardBackChange}
                handleTopicSubmit={handleTopicSubmit}
                handleCardSubmit={handleCardSubmit}
              />
            </>
          }
          />
        </Routes>
      </Router>
    </>
  );


}

export default App;
