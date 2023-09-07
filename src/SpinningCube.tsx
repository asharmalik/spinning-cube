import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Box, PerspectiveCamera } from '@react-three/drei';

export interface SpinningCubeProps {
    imageUrls: string[];
    size: number; // px
    rotationSpeed: number;
}

const Cube: React.FC<{ textures: THREE.Texture[], rotationSpeed: number }> = ({ textures, rotationSpeed }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const { size, camera } = useThree();

    const [scrollY, setScrollY] = useState(window.scrollY);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useFrame(() => {
        const scale = Math.min(size.width, size.height) / 150 * 4;

        if (meshRef.current) {
            const cubeSize = 0.5 * 1 * scale;

            const halfDiagonal = Math.sqrt(3) / 2 * cubeSize;

            const cameraDistance = halfDiagonal / Math.tan((Math.PI / 180) * 45 / 2) * 2;

            meshRef.current.rotation.y += rotationSpeed;
            meshRef.current.rotation.x += rotationSpeed;
            meshRef.current.scale.set(scale, scale, scale);

            camera.position.z = cameraDistance;
        }
    });

    const materials = textures.map((texture) => (
        new THREE.MeshBasicMaterial({ map: texture })
    ));

    return (
        <Box ref={meshRef} args={[1, 1, 1]} material={materials} />
    );
};

const SpinningCube: React.FC<SpinningCubeProps> = ({ size, imageUrls, rotationSpeed }) => {
    const [loadedTextures, setLoadedTextures] = useState<THREE.Texture[]>([]);

    useEffect(() => {
        const loader = new THREE.TextureLoader();

        const loadPromises = imageUrls.map((url) =>
            new Promise<THREE.Texture>((resolve) => {
                loader.load(url, (texture) => {
                    texture.encoding = THREE.sRGBEncoding;  // Added this line
                    resolve(texture);
                });
            })
        );

        Promise.all(loadPromises).then(setLoadedTextures);
    }, [imageUrls]);

    if (loadedTextures.length !== imageUrls.length) {
        return null;
    }

    return (
        <div style={{
            width: `${size}px`,
            height: `${size}px`
        }}>
            <Canvas style={{
                    width: '100%',
                    height: '100%'
                }}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={0.5} /> {/* Adjusted this */}
                <directionalLight position={[2, 2, 2]} intensity={1} /> {/* Added this */}
                <Cube textures={loadedTextures} rotationSpeed={rotationSpeed} />
            </Canvas>
        </div>
    );
}

SpinningCube.defaultProps = {
    size: 250,
    rotationSpeed: 0.00625
};

export default SpinningCube;
