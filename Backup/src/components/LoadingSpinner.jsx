import { RiLoader4Line } from "react-icons/ri";
import "./LoadingSpinner.css";


export default function LoadingSpinner()
{
    return(
        <div className="loading-spinner-container">
            <RiLoader4Line
                className="loading-spinner-icon"
                aria-label="Carregando"
            />
        </div>
    );
}
