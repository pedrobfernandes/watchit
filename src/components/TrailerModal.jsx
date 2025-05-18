import { useEffect, useRef } from "react";

import "./TrailerModal.css";

export default function TrailerModal(props)
{
    const { isOpen, onClose, videoKey } = props;
    const dialogRef = useRef(null);

    useEffect(() =>
    {
        const dialog = dialogRef.current;

        if (isOpen && dialog)
        {
            dialog.showModal();
            document.body.classList.add("no-scroll");
        }
        else if (!isOpen && dialog?.open)
        {
            dialog.close();
            document.body.classList.remove("no-scroll");
        }

        return(() => document.body.classList.remove("no-scroll"));
        
    }, [isOpen]);

    useEffect(() =>
    {
        const handleKeyDown = (event) =>
        {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleKeyDown);
        return(() => document.removeEventListener("keydown", handleKeyDown));
        
    }, [onClose]);


    if (!videoKey) return(null);

    return(
        <dialog
            ref={dialogRef}
            className="trailer-dialog"
            onClose={onClose}
            aria-modal="true"
            aria-label="Trailer"
            tabIndex={-1}
        >
            <button
                type="button"
                className="close-button"
                aria-label="Fechar trailer"
                onClick={onClose}
                autoFocus
            >
                ✖
            </button>
            
            <div className="iframe-wrapper"> 
                {
                    isOpen &&
                    (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&cc_load_policy=1&hl=pt`}
                            title="Trailer"
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    )
                }
            </div>
        </dialog>
    );
}
