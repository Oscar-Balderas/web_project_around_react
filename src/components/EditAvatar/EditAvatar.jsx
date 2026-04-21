import { useEffect, useRef } from "react";

export default function EditAvatar({ onUpdateAvatar, onClose }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });

    onClose();
  }
  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <input
        className="popup__input"
        placeholder="Image link"
        type="url"
        required
        ref={avatarRef}
      />
      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
