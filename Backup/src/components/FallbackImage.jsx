export default function FallbackImage()
{ 
    return(
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 185 278"
            preserveAspectRatio="xMidYMid meet"
            className="fallback-svg"
            aria-label="Actor sem foto disponivel"
        >
            <rect fill="#ddd" width="100%" height="100%"/>
            <text
                fill="#666"
                fontFamily="sans-serif"
                fontSize={14}
                dy={"0.5em"}
                textAnchor="middle"
                x={92.5}
                y={139}
            >
                Sem Foto
            </text>
        </svg>
    );
}
