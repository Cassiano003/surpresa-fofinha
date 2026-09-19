import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'https://recados-api-dpb4.onrender.com/recados';

function Recados() {
  const [recados, setRecados] = useState([]);
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(null);

  const buscarRecados = async () => {
    try {
      setCarregando(true);
      const resposta = await fetch(API_URL, { cache: 'no-store' });
      if (!resposta.ok) throw new Error('Falha ao buscar recados');
      const dados = await resposta.json();
      setRecados(dados);
      setErro(null);
    } catch (e) {
      setErro('Não foi possível carregar os recados agora. A API está rodando?');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarRecados();
  }, []);

  const enviarRecado = async (e) => {
    e.preventDefault();
    if (!mensagem.trim()) return;

    try {
      setEnviando(true);
      const resposta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, mensagem }),
      });

      if (!resposta.ok) throw new Error('Falha ao enviar recado');

      const novoRecado = await resposta.json();
      setRecados((atual) => [novoRecado, ...atual]);
      setMensagem('');
      setNome('');
      setErro(null);
    } catch (e) {
      setErro('Não foi possível enviar o recado agora. Tenta de novo?');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="container">
      <h1 className="surpresaTitulo">Mural de cartinhas 💌</h1>
      <p>Que tal trocarmos algumas cartinhas?</p>

      <form className="form-recado" onSubmit={enviarRecado}>
        <input
          type="text"
          placeholder="Seu nome (opcional)"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          maxLength={40}
        />
        <textarea
          placeholder="Escreva sua cartinha aqui..."
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          maxLength={500}
          required
        />
        <button type="submit" className="botao-carinhoso" disabled={enviando}>
          {enviando ? 'Enviando...' : 'Enviar cartinha'}
        </button>
      </form>

      {erro && <p className="recados-erro">{erro}</p>}

      <div className="lista-recados">
        {carregando ? (
          <p>Carregando recados...</p>
        ) : recados.length === 0 ? (
          <p>Nenhum recado ainda. Seja a primeira! 💕</p>
        ) : (
          recados.map((recado) => (
            <div key={recado.id} className="recado-card">
              <p className="recado-mensagem">{recado.mensagem}</p>
              <p className="recado-assinatura">— {recado.nome || 'Anônimo'}</p>
            </div>
          ))
        )}
      </div>

      <Link to="/surpresa">
        <button className="botao-carinhoso">Voltar</button>
      </Link>
    </div>
  );
}

export default Recados;
