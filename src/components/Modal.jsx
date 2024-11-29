/* eslint-disable react/prop-types */

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="modal-content bg-white p-6 rounded-lg">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 text-gray-700 text-lg"
        >
          &times;
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
