import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { currentUser } = useContext(CurrentUserContext);

  const { name, link, likes = [], owner = {} } = card;

  const isLiked = card.isLiked;

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  const ownerId = typeof owner === "string" ? owner : owner?._id;
  const isOwn = ownerId === currentUser?._id;

  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? "" : "card__delete-button_hidden"
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteCard() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => onCardClick(card)}
      />

      <button
        aria-label="Delete card"
        className={cardDeleteButtonClassName}
        type="button"
      />

      <div className="card__description">
        <h2 className="card__title">{name}</h2>

        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        />

        <button
          aria-label="Delete card"
          type="button"
          className={cardDeleteButtonClassName}
          onClick={handleDeleteCard}
        />
      </div>
    </li>
  );
}
