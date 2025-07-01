import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import FallbackImage from "./FallbackImage";


export default function ActorLink(props)
{
    const { actor } = props;
    const { isVisible, elementRef } = useIntersectionObserver();
    const actorUrl = actor.id
        ? `https://www.themoviedb.org/person/${actor.id}`
        : "#";

    const actorInfo = actor.character
        ? `${actor.name} como ${actor.character}`
        : `${actor.name}`;
       
    return(
        <div className="link-container">
            <a
                href={actorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card actor-card"
            >

                {
                    actor.profile_path ?
                    (
                        <img
                            ref={elementRef}
                            src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                            srcSet={`
                                https://image.tmdb.org/t/p/w45${actor.profile_path} 45w,
                                https://image.tmdb.org/t/p/w92${actor.profile_path} 92w,
                                https://image.tmdb.org/t/p/w185${actor.profile_path} 185w,
                                https://image.tmdb.org/t/p/w300${actor.profile_path} 300w
                            `}
                            sizes="(max-width: 35.5em) 92px, (max-width: 64em) 150px, 185px"
                            alt={`Foto de ${actor.name}`}
                            loading={isVisible ? "eager" : "lazy"}
                            fetchPriority={isVisible ? "high" : "auto"}
                            width={185}
                            height={278}
                        />
                    ) :
                    (
                        <FallbackImage/>
                    )
                }
            </a>
            <p className="item-info">
                {actorInfo}
            </p>

        </div>
    );
}
