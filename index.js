// Função para buscar produtos do localStorage
function getProdutos() {
    return JSON.parse(localStorage.getItem('produtos')) || [];
}

// Função para criar cards de produtos na página inicial
function exibirProdutosIndex() {
    const produtos = getProdutos();
    const container = document.getElementById('produtosDestaque');
    if (!container) return;

    container.className = 'row g-5 justify-content-start'; // Adiciona gap e alinhamento à esquerda
    container.innerHTML = '';

    if (produtos.length === 0) {
        container.innerHTML = '<p class="text-center text-muted">Nenhum produto cadastrado ainda.</p>';
        return;
    }

    produtos.forEach(produto => {
        const col = document.createElement('div');
        col.className = 'col-auto d-flex';
        col.innerHTML = `
            <div class="card geek-card shadow" style="width: 280px; min-width: 280px; max-width: 280px;">
                <img src="${produto.imagem || 'img/sem-imagem.png'}" class="card-img-top mx-auto mt-3 mb-3" alt="${produto.nome}"
                    style="width: 180px; height: 180px; object-fit: cover; border-radius: 8px;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${produto.nome}</h5>
                    <p class="card-text">${produto.descricao}</p>
                    <span class="fw-bold mb-2 text-danger">R$ ${parseFloat(produto.preco).toFixed(2)}</span>
                    <a href="produtos.html" class="btn btn-danger mt-auto">Ver Produto</a>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', exibirProdutosIndex);