import { useState, useContext } from "react";
import Popup from "./componentes/Popup/Popup";
import NewCard from "./form/NewCard/NewCard";
import avatar from "../../images/avatar.jpg";
import Card from "../Card/Card";
import ImagePopup from "../ImagePopup/ImagePopup";
import EditProfile from "../EditProfile/EditProfile";
import EditAvatar from "../EditAvatar/EditAvatar";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Main({ cards, onCardLike, onCardDelete, onAddPlaceSubmit }) {
  const { currentUser, handleUpdateAvatar } = useContext(CurrentUserContext);

  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const newCardPopup = {
    title: "Nuevo lugar",
    children: (
      <NewCard onAddPlaceSubmit={onAddPlaceSubmit} onClose={handleClosePopup} />
    ),
  };

  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  const editAvatarPopup = {
    title: "Cambiar avatar",
    children: (
      <EditAvatar
        onUpdateAvatar={handleUpdateAvatar}
        onClose={handleClosePopup}
      />
    ),
  };

  function handleOpenPopup(popupData) {
    setPopup(popupData);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__image-container">
          <img
            className="profile__image"
            src={currentUser.avatar || avatar}
            alt="Avatar"
          />
          <button
            className="profile__avatar-edit-button"
            type="button"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          />
        </div>

        <div className="profile__info">
          <h1 className="profile__title">
            {currentUser.name || "Cargando..."}
          </h1>

          <button
            className="profile__edit-button"
            type="button"
            onClick={() => handleOpenPopup(editProfilePopup)}
          />

          <p className="profile__description">{currentUser.about || ""}</p>
        </div>

        <button
          className="profile__add-button"
          type="button"
          onClick={() => handleOpenPopup(newCardPopup)}
        />
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={setSelectedCard}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title} isOpen={!!popup}>
          {popup.children}
        </Popup>
      )}

      <ImagePopup card={selectedCard} onClose={() => setSelectedCard(null)} />
    </main>
  );
}

export default Main;
