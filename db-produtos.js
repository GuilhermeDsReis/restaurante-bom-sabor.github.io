/**
 * Banco de dados de produtos usando localStorage
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

// Edita um produto pelo índice
function editarProduto(index, novoProduto) {
    const produtos = getProdutos();
    produtos[index] = novoProduto;
    setProdutos(produtos);
}

// Remove um produto pelo índice
function removerProduto(index) {
    const produtos = getProdutos();
    produtos.splice(index, 1);
    setProdutos(produtos);
}