import React from "react";
import ReactDOM from "react-dom";

interface Props {
    isShowing: boolean,
    hide: any,
    message: string,
}

const Modal = ({ isShowing, hide, message } : Props) =>
    isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
        <div>
            <div>
            <button
                type="button"
                data-dismiss="modal"
                aria-label="Close"
                onClick={hide}
            >
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <p>저는 {message}입니다.</p>
        </div>
        </React.Fragment>,
        document.body
    )
    : null;

export default Modal;