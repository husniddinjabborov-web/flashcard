import '../styles/Footer.css'
function Footer({
  topicView,
  cardView,
  topic,
  cardFront,
  cardBack,
  addTopic,
  addCard,
  setAddTopic,
  setAddCard,
  handleTopicChange,
  handleCardFrontChange,
  handleCardBackChange,
  handleTopicSubmit,
  handleCardSubmit
}) {
  return (
    <footer>
      {topicView && (
        <>
          <button className='topicButton' onClick={() => setAddTopic(!addTopic)}>Mavzu qo'shish</button>
          {addTopic && (
            <form onSubmit={handleTopicSubmit}>
              <input
                type="text"
                id="topic"
                value={topic}
                placeholder="Mavzu Qo'shish"
                onChange={handleTopicChange}
              />
              <div className="formButtons">
                <button type="submit">Mavzu Qo'shish</button>
                <button type="button" onClick={() => setAddTopic(!addTopic)}>Bekor qilish</button>
              </div>
            </form>
          )}
        </>
      )}
      {cardView && (
        <>
          <button className='cardButton' onClick={() => setAddCard(!addCard)}>Flashcard qo'shish</button>
          {addCard && (
            <form onSubmit={handleCardSubmit}>
              <input
                type="text"
                id="cardFront"
                value={cardFront}
                placeholder="Flashcard Front"
                onChange={handleCardFrontChange}
              />
              <input
                type="text"
                id="cardBack"
                value={cardBack}
                placeholder="Flashcard Back"
                onChange={handleCardBackChange}
              />
              <div className="formButtons">
                <button type="submit">Flashcard Qo'shish</button>
                <button type="button" onClick={() => setAddCard(!addCard)}>Bekor qilish</button>
              </div>
            </form>
          )}
        </>
      )}
    </footer>
  );
}

export default Footer;
