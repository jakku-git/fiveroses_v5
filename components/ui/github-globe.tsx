"use client";
import { useEffect, useRef, useState, Component } from "react";
import { Color, Vector3 } from "three";
import dynamic from 'next/dynamic';
import countries from "@/components/data/globe.json";

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: ThreeElements["mesh"] & {
      new (): ThreeGlobe;
    };
  }
}

const RING_PROPAGATION_SPEED = 3;
const cameraZ = 300;

export type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

export type WorldProps = {
    globeConfig: GlobeConfig;
    data: Position[];
};

let numbersOfRings = [0];

// Basic loading component
const LoadingFallback = () => (
    <div className="w-full h-full bg-black/5 flex items-center justify-center">
        Loading...
    </div>
);

// Error boundary component
class GlobeErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <div className="w-full h-full bg-black/5 flex items-center justify-center">Failed to load globe</div>;
        }
        return this.props.children;
    }
}

// Dynamic import of the Three.js component with proper type checking
const GlobeScene = dynamic<WorldProps>(
    () => import('./globe-scene').then(mod => mod.GlobeScene),
    {
        ssr: false,
        loading: () => <LoadingFallback />
    }
);

// Main component
export function World(props: WorldProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <LoadingFallback />;
    }

    return (
        <GlobeErrorBoundary>
            <div className="w-full h-full">
                <GlobeScene {...props} />
            </div>
        </GlobeErrorBoundary>
    );
}

export function hexToRgb(hex: string) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const arr = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}
