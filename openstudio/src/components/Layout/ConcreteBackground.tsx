import { ReactNode } from "react";

interface ConcreteBackgroundProps {
  children: ReactNode;
}

const ConcreteBackground = ({ children }: ConcreteBackgroundProps) => {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#404040",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <svg
          preserveAspectRatio="none"
          width="100%"
          height="100%"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Base concrete texture */}
            <filter id="concreteBase">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.6"
                numOctaves="3"
                seed="5"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer>
                <feFuncR type="linear" slope="0.05" />
                <feFuncG type="linear" slope="0.05" />
                <feFuncB type="linear" slope="0.05" />
              </feComponentTransfer>
              <feGaussianBlur stdDeviation="0.8" />
            </filter>

            {/* Paint splatter texture */}
            <filter id="splatterTexture">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.3"
                numOctaves="2"
                seed="8"
              />
              <feDisplacementMap in="SourceGraphic" scale="10" />
            </filter>
          </defs>

          {/* Base concrete */}
          <rect
            width="100%"
            height="100%"
            filter="url(#concreteBase)"
            opacity="0.4"
          />

          {/* Paint marks and studio wear */}
          <g opacity="0.15">
            {/* Large paint drips */}
            <path
              d="M50,20 q10,40 0,80"
              stroke="#666"
              strokeWidth="2"
              filter="url(#splatterTexture)"
            />
            <path
              d="M280,50 q-15,60 0,100"
              stroke="#555"
              strokeWidth="3"
              filter="url(#splatterTexture)"
            />

            {/* Paint splatters */}
            <circle
              cx="150"
              cy="150"
              r="30"
              fill="#555"
              filter="url(#splatterTexture)"
            />
            <circle
              cx="300"
              cy="200"
              r="40"
              fill="#666"
              filter="url(#splatterTexture)"
            />
            <circle
              cx="100"
              cy="300"
              r="25"
              fill="#444"
              filter="url(#splatterTexture)"
            />

            {/* Studio wear marks */}
            <path d="M0,100 h400" stroke="#444" strokeWidth="0.5" />
            <path d="M0,250 h400" stroke="#444" strokeWidth="0.5" />
            <path d="M0,380 h400" stroke="#444" strokeWidth="0.5" />

            {/* Scuffs and scratches */}
            <path d="M200,150 l50,-30" stroke="#555" strokeWidth="1" />
            <path d="M100,200 l80,-20" stroke="#555" strokeWidth="1" />
            <path d="M300,300 l-60,-40" stroke="#555" strokeWidth="1" />
          </g>

          {/* Subtle paint drops */}
          <g opacity="0.1">
            <circle cx="120" cy="180" r="2" fill="#555" />
            <circle cx="250" cy="220" r="3" fill="#555" />
            <circle cx="180" cy="280" r="2" fill="#555" />
            <circle cx="320" cy="150" r="2" fill="#555" />
            <circle cx="90" cy="250" r="3" fill="#555" />
          </g>

          {/* Fine detail marks */}
          <g opacity="0.08">
            <path
              d="M150,100 c20,-10 40,10 60,0"
              stroke="#666"
              strokeWidth="0.5"
            />
            <path
              d="M250,200 c-20,10 -40,-10 -60,0"
              stroke="#666"
              strokeWidth="0.5"
            />
            <path
              d="M100,300 c30,-15 60,15 90,0"
              stroke="#666"
              strokeWidth="0.5"
            />
          </g>
        </svg>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ConcreteBackground;
