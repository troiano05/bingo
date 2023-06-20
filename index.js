var jogadores = [];
var numerosSorteados = [];

function gerarNumerosAleatorios(quantidade, min, max) {
    if (quantidade > (max - min)) {
        console.log("Intervalo insuficiente ...");
        return;
    }

    var numeros = [];

    while (numeros.length < quantidade) {
        var aleatorio = Math.floor(Math.random() * (max - min + 1) + min);

        if (!numeros.includes(aleatorio)) {
            numeros.push(aleatorio);
        }
    }

    return numeros;
}

function sortearNumero() {
    if (document.getElementById('vencedor').innerText) {
        return;
    }

    var numeroSorteado;

    do {
        numeroSorteado = Math.floor(Math.random() * 75 + 1);
    } while (numerosSorteados.includes(numeroSorteado));

    numerosSorteados.push(numeroSorteado);
    verificarCartelas();

    var numerosDiv = document.getElementById('a_numeros');
    var numeroSpan = document.createElement('span');
    numeroSpan.innerText = numeroSorteado + (', ');
    numerosDiv.appendChild(numeroSpan);

    setTimeout(sortearNumero, 1000);
}


function verificarCartelas() {
    var cartelas = document.getElementsByClassName('cartela');
    var evencedor = false;

    for (var i = 0; i < cartelas.length; i++) {
        var numeros = cartelas[i].querySelectorAll('.numero');
        var tacompleto = true;

        for (var j = 0; j < numeros.length; j++) {
            var numero = parseInt(numeros[j].innerText);

            if (numerosSorteados.includes(numero)) {
                numeros[j].classList.add('numero-marcado');
            } else {
                tacompleto = false;
                numeros[j].classList.remove('numero-marcado');
            }
        }

        if (tacompleto) {
            evencedor = true;
            break;
        }
    }

    if (evencedor) {
        var jogador = cartelas[i].querySelector('.jogador').innerText;
        mostrarVencedor(jogador);
    }
}

function mostrarVencedor(jogador) {
    var divVencedor = document.getElementById('vencedor');
    divVencedor.innerText = "O vencedor é: " + jogador;
}

function gerarCartela() {
    var nomeJogador = prompt('Digite o nome do jogador');

    var cartela = [
        gerarNumerosAleatorios(5, 1, 15),
        gerarNumerosAleatorios(5, 16, 30),
        gerarNumerosAleatorios(5, 31, 45),
        gerarNumerosAleatorios(5, 46, 60),
        gerarNumerosAleatorios(5, 61, 75)
    ];

    jogadores.push({
        nomeJogador: nomeJogador,
        cartela: cartela
    });

    desenharCartela(nomeJogador, cartela);

    console.log(jogadores);
}

function reiniciarJogo() {
    jogadores = [];
    numerosSorteados = [];

    var div = document.getElementById('a_cartelas');
    div.innerHTML = '';

    var numerosDiv = document.getElementById('a_numeros');
    numerosDiv.innerHTML = '';

    var divVencedor = document.getElementById('vencedor');
    divVencedor.innerText = '';
}

function desenharCartela(nome, cartela) {
    var div = document.getElementById('a_cartelas');

    var cartelaContainer = document.createElement('div');
    cartelaContainer.classList.add('cartela');

    var jogador = document.createElement('h2');
    jogador.classList.add('jogador');
    jogador.innerText = nome;

    jogador.style.textAlign = 'center';

    cartelaContainer.appendChild(jogador);

    var tabela = document.createElement('table');

    var thead = document.createElement('thead');

    var thB = document.createElement('th');
    thB.innerText = 'B';
    var thI = document.createElement('th');
    thI.innerText = 'I';
    var thN = document.createElement('th');
    thN.innerText = 'N';
    var thG = document.createElement('th');
    thG.innerText = 'G';
    var thO = document.createElement('th');
    thO.innerText = 'O';

    thead.appendChild(thB);
    thead.appendChild(thI);
    thead.appendChild(thN);
    thead.appendChild(thG);
    thead.appendChild(thO);

    for (var i = 0; i < 5; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 5; j++) {
            var td = document.createElement('td');
            var numero = document.createElement('span');
            numero.classList.add('numero');
            if (i == 2 && j == 2) {
                td.innerText = "X";
                td.classList.add('numero-central');
                tr.appendChild(td);
            } else {
                numero.innerText = cartela[j][i];
                td.appendChild(numero);
                tr.appendChild(td);
            }
        }
        tabela.appendChild(tr);
    }

    tabela.appendChild(thead);
    cartelaContainer.appendChild(tabela);
    div.appendChild(cartelaContainer);
}