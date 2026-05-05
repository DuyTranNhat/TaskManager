import type { ReactNode } from 'react';
import ReactDOM from 'react-dom';

type Props = {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
};

const Modal = ({ open, onClose, children }: Props) => {
    return open ? (
        ReactDOM.createPortal(
            <div className="fixed inset-0 z-[10000] bg-black/30" onClick={onClose}>
                <div
                    className="absolute top-1/2 left-1/2 -translate-[50%] rounded-2xl bg-white p-6 shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>,
            document.body,
        )
    ) : (
        <></>
    );
};

export default Modal;
