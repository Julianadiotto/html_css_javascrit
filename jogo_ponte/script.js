// Variáveis globais para controlar o estado do jogo
let contadorRodadas = 1; // Começa em 1, e incrementa antes de cada rodada
let jogoAtivo = true;

// Referências aos elementos HTML
const btnVerificar = document.querySelector('#btnVerificar');
const btnReiniciar = document.querySelector('#btnReiniciar'); 
const contador = document.querySelector("#contador");
const resultado = document.querySelector('#resultado');
const mensagemFinal = document.querySelector('#mensagemFinal');
const inputEscolha = document.querySelector('#inputEscolha');
const msgEscolha = document.querySelector('#escolha');
const pEscolha = document.querySelector('#pEscolha');
// --- Event Listeners ---

// Adiciona o evento de clique ao botão "Verificar"
btnVerificar.addEventListener('click', jogarRodada);

// Adiciona o evento de clique ao botão "Reiniciar"
btnReiniciar.addEventListener('click', reiniciarJogo);

// Adiciona o evento de teclado quando a tecla enter é pressionada.
inputEscolha.addEventListener('keydown', verificarEnter);

// --- Funções do Jogo ---

 // Esta função é verifica se a tecla enter foi pressionada.
function verificarEnter(event) {    
  if (event.key === 'Enter' && document.activeElement === inputEscolha) {
    event.preventDefault();
    jogarRodada();
  }
}

 // Esta função é chamada a cada clique no botão "Verificar" ou quando a tecla enter é pressionada. 
function jogarRodada() {
    // Se o jogo não estiver ativo, não faz nada
    if (!jogoAtivo) {
        return;
    }

    // Pega a escolha do jogador e a converte para número
    let escolha = Number(inputEscolha.value);

    // Validação da entrada do jogador
    if (escolha < 1 || escolha > 6 || isNaN(escolha)) {
        resultado.textContent = "Número inválido! Escolha um número de 1 a 6.";
        inputEscolha.value = ""; 
        inputEscolha.focus();  
        return; // Sai da função se a entrada for inválida
    }   

    // Incrementa o contador de rodadas e atualiza o display
    contadorRodadas++;
    contador.textContent = "Você está na ponte: " + contadorRodadas;

    // Gera um número aleatório para o "piso quebrado"
    const pisoQuebrado = Math.floor(Math.random() * 6) + 1;

    // --- Lógica do Jogo ---
    if (escolha !== pisoQuebrado) {
        // Jogador acertou, o piso não quebrou
        resultado.textContent = `Passou para a próxima ponte! O piso de vidro era o número ${pisoQuebrado}!`;        

        if (contadorRodadas < 6) {
            // Jogo continua, ainda não chegou à última ponte
            mensagemFinal.textContent = `Escolha o próximo número de 1 a 6 para atravessar a ponte ${contadorRodadas}.`;
            contador.style.display = 'none';
            pEscolha.style.display = 'none';
            inputEscolha.focus();
        } else {
            // Jogador venceu! Passou da 6ª ponte.
            resultado.textContent = "Você venceu! Parabéns!";
            mensagemFinal.textContent = `O piso de vidro era o número ${pisoQuebrado}!`;
            
            msgEscolha.style.display = 'none';
            finalizarJogo(true); // Termina o jogo com vitória
            
           
        }
    } else {
        // Jogador errou, o piso quebrou
        resultado.textContent = `Vidro quebrou! Você escolheu o número ${escolha}, e o piso de vidro era ${pisoQuebrado}.`;
        mensagemFinal.textContent = "Acabou o jogo pra você.";
        finalizarJogo(false); // Termina o jogo com derrota
        contador.style.display = 'none';
        msgEscolha.style.display = 'none';
        
    }

    // Limpa o input após cada jogada para a próxima rodada
    inputEscolha.value = "";
}

/**
 * Finaliza o jogo, desabilitando as interações e mostrando a mensagem final.
 * @param {boolean} venceu Indica se o jogador venceu (true) ou perdeu (false).
 */
function finalizarJogo(venceu) {
    jogoAtivo = false; // Desativa o jogo
    inputEscolha.disabled = true; // Desabilita o campo de input
    btnVerificar.disabled = true; // Desabilita o botão de verificar
    btnReiniciar.style.display = 'block'; // Mostra o botão de reiniciar
    
    if (venceu) {
        mensagemFinal.textContent += " Clique em 'Reiniciar' para jogar novamente.";
    } else {
        mensagemFinal.textContent += " Clique em 'Reiniciar' para tentar de novo.";
    }
}

/**
 * Reinicia o jogo, resetando as variáveis e elementos da UI.
 */
function reiniciarJogo() {
    contadorRodadas = 1; // contador reinicia em 1 
    jogoAtivo = true;    // Ativa o jogo novamente

    // Limpa e reseta os elementos da interface
    contador.textContent = "Você está na ponte: 1";
    resultado.textContent = "";
    mensagemFinal.textContent = "";
    inputEscolha.value = "";
    
    // Reabilita os controles
    msgEscolha.style.display = 'block';
    contador.style.display = 'block';
    pEscolha.style.display = 'block';
    inputEscolha.disabled = false;
    btnVerificar.disabled = false;
    btnReiniciar.style.display = 'none'; //  oculta o botão de reiniciar novamente
    
    // Foca no campo de input para a próxima jogada
    inputEscolha.focus();
}


    


                
         
            
        