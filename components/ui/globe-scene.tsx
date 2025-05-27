"use client";
import { useEffect, useRef, useState } from "react";
import { Color, Vector3, Group } from "three";
import ThreeGlobe from "three-globe";
import { Canvas, useThree, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { WorldProps, Position } from "./github-globe";
import countries from "@/components/data/globe.json";

extend({ ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const cameraZ = 300;

function Globe({ globeConfig, data }: WorldProps) {
    const globeRef = useRef<ThreeGlobe | null>(null);
    const groupRef = useRef<Group>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    const defaultProps = {
        pointSize: 1,
        atmosphereColor: "#ffffff",
        showAtmosphere: true,
        atmosphereAltitude: 0.1,
        polygonColor: "rgba(255,255,255,0.7)",
        globeColor: "#1d072e",
        emissive: "#000000",
        emissiveIntensity: 0.1,
        shininess: 0.9,
        arcTime: 2000,
        arcLength: 0.9,
        rings: 1,
        maxRings: 3,
        ...globeConfig,
    };

    useEffect(() => {
        if (!globeRef.current && groupRef.current) {
            globeRef.current = new ThreeGlobe();
            (groupRef.current as any).add(globeRef.current);
            setIsInitialized(true);
        }
    }, []);

    useEffect(() => {
        if (!globeRef.current || !isInitialized) return;

        const globeMaterial = globeRef.current.globeMaterial() as unknown as {
            color: Color;
            emissive: Color;
            emissiveIntensity: number;
            shininess: number;
        };
        globeMaterial.color = new Color(globeConfig.globeColor);
        globeMaterial.emissive = new Color(globeConfig.emissive);
        globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
        globeMaterial.shininess = globeConfig.shininess || 0.9;
    }, [isInitialized, globeConfig]);

    useEffect(() => {
        if (!globeRef.current || !isInitialized || !data) return;

        const arcs = data;
        let points = [];
        for (let i = 0; i < arcs.length; i++) {
            const arc = arcs[i];
            points.push({
                size: defaultProps.pointSize,
                order: arc.order,
                color: arc.color,
                lat: arc.startLat,
                lng: arc.startLng,
            });
            points.push({
                size: defaultProps.pointSize,
                order: arc.order,
                color: arc.color,
                lat: arc.endLat,
                lng: arc.endLng,
            });
        }

        const filteredPoints = points.filter(
            (v, i, a) =>
                a.findIndex((v2) =>
                    ["lat", "lng"].every(
                        (k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"],
                    ),
                ) === i,
        );

        if (globeRef.current) {
            globeRef.current
                .hexPolygonsData(countries.features)
                .hexPolygonResolution(3)
                .hexPolygonMargin(0.7)
                .showAtmosphere(defaultProps.showAtmosphere)
                .atmosphereColor(defaultProps.atmosphereColor)
                .atmosphereAltitude(defaultProps.atmosphereAltitude)
                .hexPolygonColor(() => defaultProps.polygonColor);

            globeRef.current
                .arcsData(data)
                .arcStartLat((d) => (d as { startLat: number }).startLat * 1)
                .arcStartLng((d) => (d as { startLng: number }).startLng * 1)
                .arcEndLat((d) => (d as { endLat: number }).endLat * 1)
                .arcEndLng((d) => (d as { endLng: number }).endLng * 1)
                .arcColor((e: any) => (e as { color: string }).color)
                .arcAltitude((e) => (e as { arcAlt: number }).arcAlt * 1)
                .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
                .arcDashLength(defaultProps.arcLength)
                .arcDashInitialGap((e) => (e as { order: number }).order * 1)
                .arcDashGap(15)
                .arcDashAnimateTime(() => defaultProps.arcTime);

            globeRef.current
                .pointsData(filteredPoints)
                .pointColor((e) => (e as { color: string }).color)
                .pointsMerge(true)
                .pointAltitude(0.0)
                .pointRadius(2);

            globeRef.current
                .ringsData([])
                .ringColor(() => defaultProps.polygonColor)
                .ringMaxRadius(defaultProps.maxRings)
                .ringPropagationSpeed(RING_PROPAGATION_SPEED)
                .ringRepeatPeriod(
                    (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings,
                );
        }
    }, [isInitialized, data, defaultProps]);

    useEffect(() => {
        if (!globeRef.current || !isInitialized || !data) return;

        const interval = setInterval(() => {
            if (!globeRef.current) return;

            const newNumbersOfRings = genRandomNumbers(
                0,
                data.length,
                Math.floor((data.length * 4) / 5),
            );

            const ringsData = data
                .filter((d: Position, i: number) => newNumbersOfRings.includes(i))
                .map((d: Position) => ({
                    lat: d.startLat,
                    lng: d.startLng,
                    color: d.color,
                }));

            globeRef.current.ringsData(ringsData);
        }, 2000);

        return () => clearInterval(interval);
    }, [isInitialized, data]);

    return <group ref={groupRef} />;
}

function SceneSetup({ globeConfig }: { globeConfig: WorldProps['globeConfig'] }) {
    const { gl } = useThree();

    useEffect(() => {
        if (gl) {
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            gl.setClearColor(0x000000, 0);
        }
    }, [gl]);

    return (
        <>
            <ambientLight color={globeConfig.ambientLight || "#ffffff"} intensity={0.6} />
            <directionalLight
                color={globeConfig.directionalLeftLight || "#ffffff"}
                position={new Vector3(-400, 100, 400)}
            />
            <directionalLight
                color={globeConfig.directionalTopLight || "#ffffff"}
                position={new Vector3(-200, 500, 200)}
            />
            <pointLight
                color={globeConfig.pointLight || "#ffffff"}
                position={new Vector3(-200, 500, 200)}
                intensity={0.8}
            />
            <OrbitControls
                enablePan={false}
                enableZoom={false}
                minDistance={cameraZ}
                maxDistance={cameraZ}
                autoRotate={globeConfig.autoRotate}
                autoRotateSpeed={globeConfig.autoRotateSpeed}
            />
        </>
    );
}

export function GlobeScene(props: WorldProps) {
    return (
        <Canvas
            camera={{ position: [0, 0, cameraZ], fov: 45 }}
            style={{ width: '100%', height: '100%' }}
            gl={{ 
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance'
            }}
        >
            <SceneSetup globeConfig={props.globeConfig} />
            <Globe {...props} />
        </Canvas>
    );
}

function genRandomNumbers(min: number, max: number, count: number) {
    const arr = [];
    while (arr.length < count) {
        const r = Math.floor(Math.random() * (max - min)) + min;
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
} 