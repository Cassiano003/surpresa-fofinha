import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Surpresa from './Surpresa'; 

const musicas = [
  { titulo: 'Meu Bem Querer - Djavan', arquivo: './musicas/meuBemQuerer.mp3' },
  { titulo: 'Oceano - Djavan', arquivo: './musicas/oceano.mp3' },
  { titulo: 'Best Part - Daniel Caeser', arquivo: './musicas/bestPart.mp3' },
  { titulo: 'Risk It All - Bruno Mars', arquivo: './musicas/riskItAll.mp3' },
];

function Home() {
  return (
    <div className="container">
      <h1>Feliz <b>3 Meses</b> de Namoro! 💞</h1>
      <div className="decoracao">
        <img loading="lazy" src="./decoracoes/snoopy_kitty.png" alt="Foto Legal" />
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
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  }, [currentSong]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const selecionarMusica = (index) => {
    setCurrentSong(index);
    setIsPlaying(true);
    setIsPlaylistOpen(false);
  };

  return (
    <HashRouter>
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

      <audio ref={audioRef} src={musicas[currentSong].arquivo} loop />

      <button className="botao-musica" onClick={togglePlay}>
        {isPlaying ? 'Pausar Música' : 'Tocar Música'}
      </button>

      <button className="botao-playlist" onClick={() => setIsPlaylistOpen(true)}>
        Playlist
      </button>

      {isPlaylistOpen && (
        <div className="playlist-overlay" onClick={() => setIsPlaylistOpen(false)} />
      )}

      <div className={`playlist-sidebar ${isPlaylistOpen ? 'aberta' : ''}`}>
        <div className="playlist-header">
          <h3>Escolha a trilha</h3>
          <button className="fechar-playlist" onClick={() => setIsPlaylistOpen(false)}>✕</button>
        </div>
        <ul>
          {musicas.map((musica, index) => (
            <li
              key={index}
              className={index === currentSong ? 'musica-ativa' : ''}
              onClick={() => selecionarMusica(index)}
            >
              {musica.titulo}
            </li>
          ))}
        </ul>
      </div>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/surpresa" element={<Surpresa />} />
      </Routes>
    </HashRouter>
  );
}

export default App;