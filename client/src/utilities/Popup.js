

function Popup ({ message, onClose }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="popup-backdrop" onClick={onClose} />
    </div>
  );
};

export default Popup;
