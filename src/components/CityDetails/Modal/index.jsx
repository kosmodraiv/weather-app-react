import PropTypes from "prop-types";
import "animate.css/animate.min.css";
import "./styled.scss";

function Modal({ content, onClose, isModalOpen }) {
  return (
    <div
      className={`animate__animated ${
        isModalOpen ? "animate__fadeIn" : "animate__fadeOut"
      } modal`}
    >
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>

        <p>{content}</p>
      </div>
    </div>
  );
}

Modal.propTypes = {
  content: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  isModalOpen: PropTypes.func.isRequired,
};

export default Modal;
