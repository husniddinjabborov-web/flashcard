import '../styles/Main.css'
function Main({
  topicView,
  cardView,
  topics,
  topic,
  editingTopic,
  newTopicName,
  editIndex,
  editedFront,
  editedBack,
  handleTopicButtonClick,
  handleEditTopic,
  handleDeleteTopic,
  handleFlip,
  handleEditCard,
  handleDeleteCard,
  handleScoreChange,
  setEditingTopic,
  setNewTopicName,
  setEditIndex,
  setEditedFront,
  setEditedBack
}) {
  return (
    <main>
      {topicView && (
        <section className="topicSection">
          <h2>Mavzular</h2>
          <div className="topicContainer">
            {topics.map((topicEntry, index) => {
              const topicKey = Object.keys(topicEntry)[0];
              return (
                <div key={index} className="topicItem">
                  <span onClick={() => handleTopicButtonClick(topicKey)}>{topicKey}</span>
                  <div className="topicButtons">
                    <button onClick={() => {
                      setEditingTopic(topicKey);
                    }}>Tahrirlash</button>
                    <button onClick={() => handleDeleteTopic(topicKey)}>O‘chirish</button>
                  </div>
                  {editingTopic === topicKey && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (newTopicName.trim()) {
                          handleEditTopic(topicKey, newTopicName.trim());
                          setEditingTopic(null);
                        }
                      }}
                    >
                      <input
                        type="text"
                        value={newTopicName}
                        placeholder="Mavzu nomini tahrirlang"
                        onChange={(e) => setNewTopicName(e.target.value)}
                      />
                      <div className="topicEditButtons">
                        <button type="submit">Saqlash</button>
                        <button type="button" onClick={() => setEditingTopic(null)}>Bekor qilish</button>
                      </div>
                    </form>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
      {cardView && (
        <section className='cardSection'>
          <h1>Flashcardlar</h1>
          <div className='cardWrapper'>
            {topics.map((topicEntry, index) => {
              const topicKey = Object.keys(topicEntry)[0];
              if (topic === topicKey) {
                return topicEntry[topicKey].map((card, idx) => (
                  <div
                    key={idx}
                    className="cardContainer"
                    onClick={() => handleFlip(idx)}
                  >
                    <div className="card" style={{ display: card.showNewCard ? 'none' : 'block' }}>
                      <div className="front">
                        <p>{card.front}</p>
                      </div>
                      <div className="back">
                        <p>{card.back}</p>
                        <div className="backButtons">
                          <button onClick={(e) => {
                            e.stopPropagation();
                            handleScoreChange(idx, true);
                          }}>To'g'ri</button>
                          <span>Ball: {card.score}</span>
                          <button onClick={(e) => {
                            e.stopPropagation();
                            handleScoreChange(idx, false);
                          }}>Xato</button>
                        </div>
                      </div>
                    </div>
                    {card.showNewCard && (
                      <div className="newCard">
                        <p>{card.front} - {card.back}</p>
                      </div>
                    )}
                    <div className="cardActions" style={{ display: card.showNewCard ? 'none' : 'block' }}>
                      {editIndex === idx ? (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (editedFront.trim() && editedBack.trim()) {
                              handleEditCard(idx, editedFront, editedBack);
                              setEditIndex(null);
                              setEditedFront('');
                              setEditedBack('');
                            }
                          }}
                        >
                          <input
                            type="text"
                            value={editedFront}
                            placeholder="Yangi old qismi"
                            onChange={(e) => setEditedFront(e.target.value)}
                          />
                          <input
                            type="text"
                            value={editedBack}
                            placeholder="Yangi orqa qismi"
                            onChange={(e) => setEditedBack(e.target.value)}
                          />
                          <div className="cardEditButtons">
                            <button type="submit">Saqlash</button>
                            <button type="button" onClick={() => setEditIndex(null)}>Bekor qilish</button>
                          </div>
                        </form>
                      ) : (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditIndex(idx);
                              setEditedFront(card.front);
                              setEditedBack(card.back);
                            }}
                          >
                            Tahrirlash
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCard(idx);
                            }}
                          >
                            O‘chirish
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ));
              }
              return null;
            })}
          </div>
        </section>
      )}
    </main>
  );
}

export default Main;
