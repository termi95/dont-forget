import { RxCross1 } from "react-icons/all"
import "../../style/modal.css"

interface Props {
    tittle: string;
    text: string;
    type: number;
    handleUserAction: (action: boolean) => Promise<void>;
}

function Modal({ text, tittle, type, handleUserAction }: Props) {

    const renderModalButtons = (type: number) => {
        switch (type) {
            case 0:
                return (
                    <>
                        <button className="back-success" onClick={()=>handleUserAction(true)}>Yes</button>
                        <button className="back-delete" onClick={()=>handleUserAction(false)}>No</button>
                    </>);
            case 1:
                return (
                    <>
                        <button onClick={()=>handleUserAction(true)}>Ok</button>
                    </>);
            default:
                throw new Error("Type of modal button not found");
        }
    }

    return (
        <>
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <RxCross1 className="icon-menu secondary close" />
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