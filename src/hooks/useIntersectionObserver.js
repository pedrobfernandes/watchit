import { useState, useEffect, useRef } from "react";


function createObserver(setIsVisible, elementRef)
{
    function handleIntersection(entries)
    {
        entries.forEach(entry =>
        {
            setIsVisible(entry.isIntersecting);
        });
    }

    const options =
    {
        rootMargin: "0px",
        threshold: 0.1,
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    observeElement(observer, elementRef);

    return(observer);
}

function observeElement(observer, elementRef)
{
    if (elementRef.current)
    {
        observer.observe(elementRef.current);
    }
}

function cleanupObserver(observer, elementRef)
{
    if (elementRef.current)
    {
        observer.unobserve(elementRef.current);
    }
}

export function useIntersectionObserver()
{
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() =>
    {
        const observer = createObserver(setIsVisible, elementRef);

        observeElement(observer, elementRef);

        return(() =>
        {
            cleanupObserver(observer, elementRef);
        });
        
    }, []);

    return({ isVisible, elementRef });
}
