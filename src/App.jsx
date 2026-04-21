import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import CurrentUserContext from "./contexts/CurrentUserContext";
import { useState, useEffect } from "react";
import api from "./utils/api";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo().then(setCurrentUser).catch(console.log);
  }, []);

  useEffect(() => {
    api.getInitialCards().then(setCards).catch(console.log);
  }, []);

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser);
      })
      .catch(console.log);
  }

  function handleCardLike(card) {
    const isLiked = card.isLiked;

    const request = isLiked ? api.unlikeCard(card._id) : api.likeCard(card._id);

    request
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)),
        );
      })
      .catch(console.log);
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(console.log);
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards((prev) => [newCard, ...prev]);
      })
      .catch(console.log);
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser }}>
      <div className="page__content">
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
