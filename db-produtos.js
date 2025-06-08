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

// Produtos pré-cadastrados
(function () {
    const produtosExistentes = JSON.parse(localStorage.getItem('produtos') || "[]");
    if (!produtosExistentes || produtosExistentes.length === 0) {
        const produtos = [
            {
                nome: "Camiseta Star Wars",
                preco: 59.90,
                descricao: "Camiseta preta com estampa exclusiva Star Wars.",
                imagem: "https://images.tcdn.com.br/img/img_prod/460977/camiseta_masculina_unissex_darth_vader_the_dark_side_star_wars_preta_ev_80659_1_0206e0be384095077065d7ad4188fd3e.jpg",
                categoria: "camiseta"
            },
            {
                nome: "Caneca Marvel",
                preco: 39.90,
                descricao: "Caneca temática dos Vingadores, perfeita para fãs da Marvel.",
                imagem: "https://down-br.img.susercontent.com/file/br-11134201-7qukw-lfrkhzbo3ex2ec",
                categoria: "caneca"
            },
            {
                nome: "Funko Pop Harry Potter",
                preco: 99.90,
                descricao: "Colecionável Funko Pop do Harry Potter com uniforme de Hogwarts.",
                imagem: "https://m.media-amazon.com/images/I/71Wuad1-F8L._AC_UF894,1000_QL80_.jpg",
                categoria: "colecionavel"
            }
        ];
        localStorage.setItem('produtos', JSON.stringify(produtos));
    }
})();
