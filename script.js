/**
 * Simulação de "banco de dados" usando localStorage.
 * Funções para salvar, buscar e exibir produtos na página de produtos.
 */

// Salva o array de produtos no localStorage
function setProdutos(produtos) {
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

// Busca o array de produtos do localStorage
function getProdutos() {
    return JSON.parse(localStorage.getItem('produtos')) || [];
}

// Adiciona um novo produto e salva
function adicionarProduto(produto) {
    const produtos = getProdutos();
    produtos.push(produto);
    setProdutos(produtos);
}

// Remove um produto pelo índice e salva
function removerProduto(idx) {
    const produtos = getProdutos();
    produtos.splice(idx, 1);
    setProdutos(produtos);
}

// Atualiza os selects das modais de excluir e editar
function atualizarSelects() {
    const produtos = getProdutos();
    const excluirSelect = document.getElementById('excluirProduto');
    const editarSelect = document.getElementById('editarProduto');
    if (excluirSelect) {
        excluirSelect.innerHTML = produtos.map((p, i) => `<option value="${i}">${p.nome}</option>`).join('');
    }
    if (editarSelect) {
        editarSelect.innerHTML = produtos.map((p, i) => `<option value="${i}">${p.nome}</option>`).join('');
    }
}

// Exibe produtos na página
function exibirProdutos() {
    const produtos = getProdutos();
    const container = document.getElementById('produtos-container');
    container.innerHTML = '';

    if (produtos.length === 0) {
        container.innerHTML = '<p>Nenhum produto cadastrado.</p>';
        return;
    }

    produtos.forEach(produto => {
        const div = document.createElement('div');
        div.className = 'produto';
        div.innerHTML = `
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <p>Preço: R$ ${produto.preco}</p>
        `;
        container.appendChild(div);
    });
}

// Chame exibirProdutos() no onload da página de produtos
window.onload = exibirProdutos;

/*
Na página de produtos, adicione um elemento com id="produtos-container" onde os produtos serão exibidos:
<div id="produtos-container"></div>
*/

// Exemplo de cadastro de produto (use isso ao cadastrar via formulário)