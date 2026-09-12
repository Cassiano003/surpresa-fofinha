import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoveTimer from './LoveTimer';

function Surpresa() {
  const [cartaAberta, setCartaAberta] = useState(false);
  const [envelopeVisivel, setEnvelopeVisivel] = useState(true);

  const abrirCarta = () => {
    setCartaAberta(true);
  };
  const handleEnvelopeTransitionEnd = () => {
    if (cartaAberta) setEnvelopeVisivel(false);
  };

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
      
      <div className="galeria" id='polaroid'>
        <p className='aqui'>
          Aqui vão alguns momentos nossos
        </p>
        <img loading="lazy" className="nossasFotos" src="./fotos/foto1.jpg" alt="Foto 1" />
        <img loading="lazy" className="nossasFotos" src="./fotos/foto2.jpg" alt="Foto 2" />
        <img loading="lazy" className="nossasFotos" src="./fotos/foto3.jpg" alt="Foto 3" />
        <img loading="lazy" className="nossasFotos" src="./fotos/foto4.jpg" alt="Foto 4" />
        <img loading="lazy" className="nossasFotos" id="fotoCinco" src="./fotos/foto5.jpg" alt="Foto 5" />
      </div>

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