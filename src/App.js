import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Estado para armazenar o array de 5 cores da paleta
  const [palette, setPalette] = useState([]);

  // Função para gerar uma única cor hexadecimal aleatória
  const generateRandomHexColor = () => {
    // Caracteres possíveis em um código hexadecimal
    const hexChars = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      // Pega um caractere aleatório da string hexChars e concatena
      color += hexChars[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Função para gerar uma nova paleta com 5 cores
  const generateNewPalette = () => {
    const newPalette = [];
    for (let i = 0; i < 5; i++) {
      newPalette.push(generateRandomHexColor());
    }
    // Atualiza o estado com a nova paleta gerada
    setPalette(newPalette);
  };

  // useEffect com array de dependências vazio ( []) roda apenas uma vez,
  // quando o componente é montado. Ideal para gerar a paleta inicial.
  useEffect(() => {
    generateNewPalette();
  }, []); // O array vazio garante que isso só execute na montagem inicial

  // Função para copiar o código da cor para a área de transferência
  const handleCopyColor = (hexCode) => {
    navigator.clipboard.writeText(hexCode).then(() => {
      // Alerta simples para confirmar que a cor foi copiada
      alert(`Cor ${hexCode} copiada para a área de transferência!`);
    }).catch(err => {
      console.error('Falha ao copiar a cor: ', err);
    });
  };

  return (
    <div className="App">
      <header>
        <h1>Gerador de Paleta de Cores</h1>
      </header>
      <main>
        <div className="palette-container">
          {palette.map((color, index) => (
            <div key={index} className="color-swatch" style={{ backgroundColor: color }}>
              <div 
                className="hex-code" 
                onClick={() => handleCopyColor(color)}
                title="Clique para copiar"
              >
                {color}
              </div>
            </div>
          ))}
        </div>
        <button onClick={generateNewPalette}>Gerar Nova Paleta</button>
      </main>
    </div>
  );
}

export default App;