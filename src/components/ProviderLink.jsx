import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export default function ProviderLink(props)
{
    const { provider } = props;
    const { isVisible, elementRef } = useIntersectionObserver();
    
    return(
        <div className="card provider-card">
            <img
                ref={elementRef}
                src={`https://image.tmdb.org/t/p/w185${provider.logo_path}`}
                srcSet={`
                    https://image.tmdb.org/t/p/w45${provider.logo_path} 45w,
                    https://image.tmdb.org/t/p/w92${provider.logo_path} 92w,
                    https://image.tmdb.org/t/p/w154${provider.logo_path} 154w,
                    https://image.tmdb.org/t/p/w185${provider.logo_path} 185w,
                    https://image.tmdb.org/t/p/w300${provider.logo_path} 300w,
                    https://image.tmdb.org/t/p/w500${provider.logo_path} 500w,
                    https://image.tmdb.org/t/p/original${provider.logo_path} 1080w
                `}
                sizes="(max-width: 35.5em) 92px, (max-width: 64em) 154px, 185px"
                alt={`Logo do provider ${provider.provider_name}`}
                loading={isVisible ? "eager" : "lazy"}
                fetchPriority={isVisible ? "high" : "auto"}
                width={185}
                height={278}
            />

            <div className="link-overlay">
                <p className="overlay-content">
                </p>
            </div>
        </div>
    );
}
