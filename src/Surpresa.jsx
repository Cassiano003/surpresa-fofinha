import { Link } from 'react-router-dom';
import LoveTimer from './LoveTimer';

function Surpresa() {
  return (
    <div className="container">
      <h1 className="surpresaTitulo">Obrigado por me amar, <b>MEU</b> amor.</h1>
      <div className="galeria">
        <img src="/fotos/foto5.jpg" alt="Foto 5" />
      </div>
      <LoveTimer /> 
      <p>
        Aqui vai alguns momentos nossos
      </p>

      <div className="galeria">
        <img className="nossasFotos" src="/fotos/foto1.jpg" alt="Foto 1" />
        <img className="nossasFotos" src="/fotos/foto2.jpg" alt="Foto 2" />
        <img className="nossasFotos" src="/fotos/foto3.jpg" alt="Foto 3" />
        <img className="nossasFotos" src="/fotos/foto4.jpg" alt="Foto 4" />
      </div>

      <Link to="/">
        <button className="botao-carinhoso">Voltar para o início</button>
      </Link>
    </div>
  );
}

export default Surpresa;