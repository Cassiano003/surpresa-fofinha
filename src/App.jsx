import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import './App.css';
import './index.css';
import Surpresa from './Surpresa'; 

function Home() {
  return (
    <div className="container">
      <h1>Feliz <b>3 Meses</b> de Namoro! 💞</h1>
      <div className="decoracao">
        <img src="/decoracoes/snoopy_kitty.png" alt="Foto Legal" />
      </div>
      
      <p>Num dia tão especial, por que não uma surpresa tão especial quanto esta data, não é?</p>

      <Link to="/surpresa">
        <button className="botao-carinhoso">
          Aproveite a surpresa
        </button>
      </Link>
    </div>
  );
}

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <BrowserRouter>
     <div className="floating-hearts">
        <span className="heart">❤️</span>
        <span className="heart">💖</span>
        <span className="heart">💕</span>
        <span className="heart">💘</span>
        <span className="heart">💝</span>
        <span className="heart">❤️</span>
        <span className="heart">💗</span>
        <span className="heart">💓</span>
        <span className="heart">💞</span>
        <span className="heart">💓</span>
      </div>
    <audio ref={audioRef} src="/musicas/fundinhoMusical.mp3" loop />
      <button className="botao-musica" onClick={togglePlay}>
        {isPlaying ? 'Pausar Música' : 'Solta o som, Djavan'}
      </button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/surpresa" element={<Surpresa />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;