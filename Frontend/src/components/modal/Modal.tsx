import "../../style/modal.scss"
import { ModalButton } from "../../types/Modal";

interface Props {
    tittle: string;
    text: string;
    type: number;
    handleUserAction: (action: boolean) => Promise<void>;
    closeAction: () => Promise<void>;
}

function Modal({ text, tittle, type, handleUserAction, closeAction }: Props) {

    const renderModalButtons = (type: number) => {
        switch (type) {
            case ModalButton.YesNo:
                return (
                    <>
                        <button className="back-success" onClick={async () => await handleUserAction(true)}>Yes</button>
                        <button className="back-delete" onClick={async () => await handleUserAction(false)}>No</button>
                    </>);
            case ModalButton.Info:
                return (
                    <>
                        <button onClick={async () => await closeAction()}>Ok</button>
                    </>);
            default:
                throw new Error("Type of modal button not found");
        }
    }

    return (
        <>
            <div id="myModal" className="modal" onClick={async () => await closeAction()}>
                <div onClick={(e) => e.stopPropagation()} className="modal-content">                    
                    <div className="modal-title">
                        <p>{tittle}</p>
                    </div>
                    <p className="modal-content-text">{text}</p>
                    <div className="modal-content-action">
                        {renderModalButtons(type)}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Modal