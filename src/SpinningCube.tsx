import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Box, PerspectiveCamera } from '@react-three/drei';

export interface SpinningCubeProps {
    imageUrls: string[];
    size: number;
    rotationSpeed: number;
}

const Cube: React.FC<{ textures: THREE.Texture[], rotationSpeed: number }> = ({ textures, rotationSpeed }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const { size, camera } = useThree();
    const scale = useMemo(() => Math.min(size.width, size.height) / 150 * 4, [size]);
    const cubeSize = useMemo(() => 0.5 * 1 * scale, [scale]);
    const halfDiagonal = useMemo(() => Math.sqrt(3) / 2 * cubeSize, [cubeSize]);
    const cameraDistance = useMemo(() => halfDiagonal / Math.tan((Math.PI / 180) * 45 / 2) * 2, [halfDiagonal]);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += rotationSpeed;
            meshRef.current.rotation.x += rotationSpeed;
            meshRef.current.scale.set(scale, scale, scale);
            camera.position.z = cameraDistance;
        }
    });

    const materials = useMemo(() =>
            textures.map((texture) => new THREE.MeshBasicMaterial({ map: texture })),
        [textures]
    );

    return <Box ref={meshRef} args={[1, 1, 1]} material={materials} />;
};

const SpinningCube: React.FC<SpinningCubeProps> = ({ size, imageUrls, rotationSpeed }) => {
    const [loadedTextures, setLoadedTextures] = useState<THREE.Texture[]>([]);

    useEffect(() => {
        if (imageUrls.length !== 6) {
            console.warn('Expected 6 images for cube faces. You provided', imageUrls.length);
        }

        const loader = new THREE.TextureLoader();

        const loadPromises = imageUrls.map((url) =>
            new Promise<THREE.Texture>((resolve, reject) => {
                loader.load(url, (texture) => {
                    texture.encoding = THREE.sRGBEncoding;
                    resolve(texture);
                }, undefined, (error) => {
                    reject(new Error(`Failed to load texture from URL: ${url}. Error: ${error.message}`));
                });
            })
        );

        Promise.all(loadPromises).then(setLoadedTextures).catch((error) => {
            console.error(error);
        });

    }, [imageUrls]);

    if (loadedTextures.length !== imageUrls.length) {
        return null;
    }

    return (
        <div style={{ width: `${size}px`, height: `${size}px` }}>
            <Canvas style={{ width: '100%', height: '100%' }}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 2, 2]} intensity={1} />
                <Cube textures={loadedTextures} rotationSpeed={rotationSpeed} />
            </Canvas>
        </div>
    );
};

SpinningCube.defaultProps = {
    size: 250,
    rotationSpeed: 0.00625
};

export default SpinningCube;
