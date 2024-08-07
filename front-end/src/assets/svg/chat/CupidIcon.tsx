import type { SVGProps } from 'react';
const SvgCupidIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 53 53" {...props}>
        <g clipPath="url(#CupidIcon_svg__a)" filter="url(#CupidIcon_svg__b)">
            <path
                fill="#fff"
                d="M10.172 34.972c1.483-.693 2.42-1.53 3.711-.412 1.292 1.118 3.472.664 4.146-1.03.674-1.695-.837-1.692.332-3.114s-1.64.33-1.82 1.54c-.18 1.212-1.244-.003-.894-1.071.349-1.07-2.033 2.55-1.648.062s-5.69 4.342-1.786-1.012c-2.7 1.191-2.381-.324-1.793-.713s-2.64.328-.668-1.36c.897-.926-4.458-.319.1-1.96 1.35-.57.813-2.186 1.972-4.009 1.159-1.822 3.008-1.917 5.02-.381 2.011 1.535 4.229 1.228 3.864-.37s-2.766-.401-3.353-2.579-2.749-2.244-.757-4.263c1.991-2.02 1.161-3.256 3.135-3.188s2.73-.934 3.625.706c.896 1.639 2.125-.136 1.998 2.19-.14 2.558.755 1.997.894 2.45 0 0 .498 1.568-.057 2.374-.731 1.062-1.231 1.34-1.302 1.426.44.646 2.694.58 2.88-.648l.384-6.376s-3.517-4.776.687-4.293c2.069.54-1.612 2.774 1.837 3.448 1.837.126 5.1.203 7.133 3.162l1.98-1.604-.628-1.457 3.108.36-1.59 3.162-.576-1.336-1.774 1.652s1.204 2.313.749 4.076c-.646 2.5-2.339 4.572-1.71 6.03.628 1.457 2.288.471 2.031 2.256s-2.974.58-3.547-2.63l-4.917-2.092s-1.34-.449-2.678 2.454l-1.224 2.684s2.072 4.184 1.379 6.21c-.692 2.027-1.844 3.903-3.122 5.289-2.356 2.554.48 4.059-.915 4.769 0 0-2.735.611-3.32-2.376-.587-2.988.201-2.977 1.06-3.428 1.47-1.039.929-2.669.185-3.833-.746-1.164-1.617 6.962-7.884 2.697-3.254-1.98-4.06-1.274-4.822-1.162s-.908-1.606.575-2.3m25.392-10c-.004-.323-.036-.147.403-2.01.439-1.864-.81-3.55-.81-3.55-1.727 2.447-3.582 3.822-3.582 3.822zm-5.391-4.427 4.119-2.933c-1.267-4.693-5.24-3.929-5.24-3.929l-.241 6.018c.947-.057 1.362.844 1.362.844"
            />
        </g>
        <defs>
            <clipPath id="CupidIcon_svg__a">
                <path fill="#fff" d="M36.733 0 0 15.834l15.834 36.733 36.733-15.834z" />
            </clipPath>
            <filter
                id="CupidIcon_svg__b"
                width={54.282}
                height={56.518}
                x={-2.01}
                y={2.907}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy={4} />
                <feGaussianBlur stdDeviation={5} />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix values="0 0 0 0 0.427959 0 0 0 0 0.253128 0 0 0 0 0.471667 0 0 0 0.2 0" />
                <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_114_244" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_114_244" result="shape" />
            </filter>
        </defs>
    </svg>
);
export default SvgCupidIcon;
