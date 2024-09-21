import { useEffect, useState } from 'react';
import Loader from 'react-loaders';
import { Link } from 'react-router-dom';
import LogoF from '../../assets/images/Formula1Logo.png';
import AnimatedLetters from '../AnimatedLetters';
import './index.scss';
import {Canvas, useFrame} from "@react-three/fiber";
import {useGLTF, Stage, PresentationControls} from "@react-three/drei";

function Model(props) {
  const { scene } = useGLTF("/f1.glb");

  useFrame(() => {
    scene.rotation.y += 0.01; 
  });

  // scene.rotation.x = Math.PI / 2;

  return <primitive object={scene} {...props} />;
}

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const nameArray = "Welcome to".split("");
    const jobArray = "Formula 1 Fantasy!".split("");

    useEffect(() => {
        const timerId = setTimeout(() => {
          setLetterClass('text-animate-hover');
        }, 4000);
      
        return () => {
          clearTimeout(timerId);
        };
      }, []);

    return(
      <>
        <div className = "container home-page">
            <div className="text-zone">
                <h1>
                <img src={LogoF} alt = "FormulaOneZone" />
                <br />
                <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={12} />
                <br /> 
                <AnimatedLetters letterClass={letterClass} strArray={jobArray} idx={15} /> 
                </h1>
                <h2>The Hub for Formula One Enthusiasts:Race Stats and More!</h2>
                <Link to="/teams" className="flat-button">LIGHTS OUT!</Link>
            </div>

            <div className="model-zone">
            <Canvas dpr={[1, 2]} camera={{ fov: 1 }}>
              <color attach="background" args={["#3c3c38"]} />
              <ambientLight intensity={2} />
              <directionalLight position={[10, 10, 5]} intensity={2} />
              <PresentationControls speed={1.5} zoom={0.6} polar={[-0.1, Math.PI / 4]}>
                <Model scale={0.023} position={[0, -0.018, 0]} /> {/* Move down on the y-axis */}
              </PresentationControls>
          </Canvas>

            </div>
        </div>
        <Loader type="pacman" />
      </>
    )
}


export default Home