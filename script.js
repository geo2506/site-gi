document.addEventListener('DOMContentLoaded', () => {
    const botoesAdicionar = document.querySelectorAll('.btn-adicionar');
    const listaCarrinho = document.getElementById('lista-carrinho');
    const valorTotalSpan = document.getElementById('valor-total');
    const finalizarCompraBtn = document.getElementById('finalizar-compra');

    let carrinho = []; // Array para armazenar os itens do carrinho

    // Função para atualizar o carrinho na interface
    function atualizarCarrinho() {
        listaCarrinho.innerHTML = ''; // Limpa o carrinho antes de redesenhar
        let total = 0;

        if (carrinho.length === 0) {
            listaCarrinho.innerHTML = '<p>Nenhum item no carrinho.</p>';
        } else {
            carrinho.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
                    <button class="btn-remover" data-nome="${item.nome}">Remover</button>
                `;
                listaCarrinho.appendChild(li);
                total += item.preco;
            });
        }
        valorTotalSpan.textContent = total.toFixed(2);
    }

    // Adiciona evento de clique para os botões "Adicionar ao Carrinho"
    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', (event) => {
            const nomeProduto = event.target.dataset.nome;
            const precoProduto = parseFloat(event.target.dataset.preco);

            const produto = { nome: nomeProduto, preco: precoProduto };
            carrinho.push(produto);
            atualizarCarrinho();
            alert(`${nomeProduto} foi adicionado ao carrinho!`);
        });
    });

    // Adiciona evento de clique para remover itens do carrinho (delegação de evento)
    listaCarrinho.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-remover')) {
            const nomeRemover = event.target.dataset.nome;
            // Encontra o índice do primeiro item com o nome a ser removido
            const index = carrinho.findIndex(item => item.nome === nomeRemover);
            if (index > -1) {
                carrinho.splice(index, 1); // Remove o item do array
                atualizarCarrinho();
            }
        }
    });

    // Evento para finalizar a compra
    finalizarCompraBtn.addEventListener('click', () => {
        if (carrinho.length > 0) {
            alert(`Compra finalizada! Total: R$ ${valorTotalSpan.textContent}. Em breve entraremos em contato.`);
            carrinho = []; // Limpa o carrinho após a compra
            atualizarCarrinho();
        } else {
            alert('Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.');
        }
    });

    // Inicializa o carrinho ao carregar a página
    atualizarCarrinho();
});