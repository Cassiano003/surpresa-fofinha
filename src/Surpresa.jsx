import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import LoveTimer from './LoveTimer';

const fotos = [
  { src: './fotos/foto1.jpg', legenda: 'Um dia qualquer, do nosso jeito', rotacao: -6 },
  { src: './fotos/foto2.jpg', legenda: 'Aquele sorriso que eu amo', rotacao: 4 },
  { src: './fotos/foto3.jpg', legenda: 'Sempre juntinhos', rotacao: -3 },
  { src: './fotos/foto4.jpg', legenda: 'Um momento pra guardar', rotacao: 5 },
  { src: './fotos/foto5.jpg', legenda: '3 meses e contando 💕', rotacao: -5 },
];

function Surpresa() {
  const [cartaAberta, setCartaAberta] = useState(false);
  const [envelopeVisivel, setEnvelopeVisivel] = useState(true);
  const [fotoAberta, setFotoAberta] = useState(null);

  const abrirCarta = () => {
    setCartaAberta(true);
  };
  const handleEnvelopeTransitionEnd = () => {
    if (cartaAberta) setEnvelopeVisivel(false);
  };

  useEffect(() => {
    const elementos = document.querySelectorAll('.foto-polaroid');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elementos.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setFotoAberta(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="container">
      <h1 className="surpresaTitulo">Obrigado por me amar, <b>MEU</b> amor 💖</h1>
      <div className="carta-wrapper">
        {envelopeVisivel && (
          <div
            className={`envelope ${cartaAberta ? 'aberto' : ''}`}
            onClick={abrirCarta}
            onTransitionEnd={handleEnvelopeTransitionEnd}
          >
            <div className="envelope-corpo"></div>
            <div className="envelope-aba"></div>
            <div className="selo">❤️‍🩹</div>
          </div>
        )}

        {!cartaAberta && (
          <p className="dica-clique">Toque no envelope para abrir a cartinha 💌</p>
        )}

        <div className={`textoFofinho ${cartaAberta ? 'aberta' : ''}`}>
          <p>
            &nbsp;&nbsp;&nbsp;São 3 meses em que eu posso te chamar de minha namorada. São 90 dias em que meu amor por você só cresceu cada dia mais. 2160 horas em que acordo pensando em você, durmo pensando em você, vivo pensando em você...<br/><br/>...Quando menos imaginei, te dizer "eu te amo" se tornou algo tão comum. Poder te abraçar, beijar, saber que o que eu sinto é recíproco. Não tenho palavras para descrever o amor que sinto por você. A cada dia aprendo a ser alguém melhor por você...<br/><br/>...Eu te amo...<br/><br/>...Feliz 3 meses de namoro... 😝
          </p>
        </div>
      </div>
      <LoveTimer />
      
      <div id='polaroid'>
        <p className='aqui'>
          Aqui vão alguns momentos nossos
        </p>

        <div className="polaroid-grid">
          {fotos.map((foto, index) => (
            <div
              key={index}
              className="foto-polaroid"
              style={{ '--rot': `${foto.rotacao}deg`, transitionDelay: `${index * 0.12}s` }}
              onClick={() => setFotoAberta(foto)}
            >
              <img loading="lazy" src={foto.src} alt={foto.legenda} />
              <p className="legenda-polaroid">{foto.legenda}</p>
            </div>
          ))}
        </div>
      </div>

      {fotoAberta && createPortal(
        <div className="lightbox-overlay" onClick={() => setFotoAberta(null)}>
          <button
            className="lightbox-fechar"
            onClick={(e) => {
              e.stopPropagation();
              setFotoAberta(null);
            }}
          >
            ✕
          </button>
          <img
            src={fotoAberta.src}
            alt={fotoAberta.legenda}
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="lightbox-legenda">{fotoAberta.legenda}</p>
        </div>,
        document.body
      )}

      <div className='ass'>
        <h2 className="assinatura">
          Com carinho, Cassiano 💕
        </h2>
      </div>
    
      
      <Link to="/">
        <button className="botao-carinhoso">Voltar para o início</button>
      </Link>
    </div>
  );
}

export default Surpresa;