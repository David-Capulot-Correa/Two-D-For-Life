function calcularIMC() {
    const nome = document.getElementById('P1').value;
    const dataNascimento = document.getElementById('p3').value;
    const alturaCm = parseFloat(document.getElementById('p4').value);
    const pesoKg = parseFloat(document.getElementById('p5').value);

    if (!nome || !dataNascimento || isNaN(alturaCm) || isNaN(pesoKg)) {
        alert("Por favor, preencha todos os campos corretamente (nome, data de nascimento, altura e peso).");
        return;
    }

    // === Calcular idade ===
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    // === Calcular IMC ===
    const alturaM = alturaCm / 100;
    const imc = pesoKg / (alturaM * alturaM);

    // === Classificação do IMC ===
    let classificacao = '';
    if (imc < 18.5) {
        classificacao = 'Abaixo do peso';
    } else if (imc < 25) {
        classificacao = 'Peso normal';
    } else if (imc < 30) {
        classificacao = 'Excesso de peso';
    } else if (imc < 35) {
        classificacao = 'Obesidade grau 1';
    } else if (imc < 40) {
        classificacao = 'Obesidade grau 2';
    } else {
        classificacao = 'Obesidade grau 3 (mórbida)';
    }

    // === Atualizar texto no resultado ===
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `
        <p>${nome}, você tem <strong>${idade} anos</strong>.</p>
        <p>Seu IMC é <strong>${imc.toFixed(2)}</strong>.</p>
        <p>Classificação: <strong>${classificacao}</strong></p>
        ${idade < 18 ? "<p style='color:red'><strong>Atenção:</strong> o IMC pode não ser o melhor indicador para menores de idade.</p>" : ""}
    `;

    // === Mover imagem ===
    moverImagem(imc);
}

function moverImagem(imc) {
    const img = document.getElementById("img-imc");
    const area = document.getElementById("area-imagem");

    const larguraArea = area.clientWidth - 100; // limite da div
    let posicao = 0;

    img.style.animation = "none"; // reseta animação

    if (imc < 18.5) {
        posicao = larguraArea * 0.1;
    } else if (imc < 25) {
        posicao = larguraArea * 0.3;
    } else if (imc < 30) {
        posicao = larguraArea * 0.5;
    } else if (imc < 35) {
        posicao = larguraArea * 0.7;
    } else if (imc < 40) {
        posicao = larguraArea * 0.85;
    } else {
        posicao = larguraArea * 0.95;
        img.style.animation = "tremer 0.3s infinite"; // animação especial
    }

    img.style.left = posicao + "px";
}

// CSS da animação (injetado pelo JS)
const estilo = document.createElement("style");
estilo.innerHTML = `
@keyframes tremer {
  0% { transform: translateX(0px); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0px); }
}
`;
document.head.appendChild(estilo);
