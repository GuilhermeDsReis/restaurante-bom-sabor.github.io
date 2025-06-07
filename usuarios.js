function getUsuarios() {
    return JSON.parse(localStorage.getItem('usuarios')) || [];
}
function setUsuarios(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function atualizarTabelaUsuarios() {
    const usuarios = getUsuarios();
    const tabela = document.getElementById('tabelaUsuariosBody');
    tabela.innerHTML = '';
    if (usuarios.length === 0) {
        tabela.innerHTML = '<tr><td colspan="12" class="text-center">Nenhum usuário cadastrado.</td></tr>';
    } else {
        usuarios.forEach((u, idx) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <button class="btn btn-warning btn-sm btn-editar-usuario me-1" data-idx="${idx}">
                        <span class="bi bi-pencil"></span> Editar
                    </button>
                    <button class="btn btn-danger btn-sm btn-excluir-usuario" data-idx="${idx}">
                        <span class="bi bi-trash"></span> Excluir
                    </button>
                </td>
                <td>${u.nome || ''}</td>
                <td>${u.email || ''}</td>
                <td>${u.telefone || ''}</td>
                <td>${u.cpf || ''}</td>
                <td>${u.endereco?.rua || ''}</td>
                <td>${u.endereco?.numero || ''}</td>
                <td>${u.endereco?.cidade || ''}</td>
                <td>${u.endereco?.estado || ''}</td>
                <td>${u.endereco?.cep || ''}</td>
                <td>${u.tipo || ''}</td>
            `;
            tabela.appendChild(tr);
        });

        // Eventos de excluir
        document.querySelectorAll('.btn-excluir-usuario').forEach(btn => {
            btn.addEventListener('click', function () {
                const idx = this.getAttribute('data-idx');
                excluirUsuario(idx);
            });
        });

        // Eventos de editar
        document.querySelectorAll('.btn-editar-usuario').forEach(btn => {
            btn.addEventListener('click', function () {
                const idx = this.getAttribute('data-idx');
                preencherModalEditar(idx);
            });
        });
    }
}

function excluirUsuario(idx) {
    const usuarios = getUsuarios();
    usuarios.splice(idx, 1);
    setUsuarios(usuarios);
    atualizarTabelaUsuarios();
    exibirPopupSucesso('Usuário excluído com sucesso!');
}

// Cadastro de usuário via modal
document.getElementById('formCadastroUsuario').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nomeUsuario').value.trim();
    const email = document.getElementById('emailUsuario').value.trim();
    const telefone = document.getElementById('telefoneUsuario').value.trim();
    const cpf = document.getElementById('cpfUsuario').value.trim();
    const rua = document.getElementById('ruaUsuario').value.trim();
    const numero = document.getElementById('numeroUsuario').value.trim();
    const cidade = document.getElementById('cidadeUsuario').value.trim();
    const estado = document.getElementById('estadoUsuario').value.trim();
    const cep = document.getElementById('cepUsuario').value.trim();
    const tipo = document.getElementById('tipoUsuario').value;

    if (!nome || !email || !telefone || !cpf || !rua || !numero || !cidade || !estado || !cep || !tipo) return;

    const usuarios = getUsuarios();
    usuarios.push({
        nome,
        email,
        telefone,
        cpf,
        endereco: {
            rua,
            numero,
            cidade,
            estado,
            cep
        },
        tipo
    });
    setUsuarios(usuarios);
    this.reset();
    bootstrap.Modal.getInstance(document.getElementById('modalCadastroUsuario')).hide();
    document.getElementById('tabelaUsuariosContainer').style.display = 'none';

    // Exibe popup de sucesso
    exibirPopupSucesso('Usuário cadastrado com sucesso!');
});

function preencherModalEditar(idx) {
    const usuarios = getUsuarios();
    const u = usuarios[idx];
    document.getElementById('editarIdx').value = idx;
    document.getElementById('editarNomeUsuario').value = u.nome || '';
    document.getElementById('editarEmailUsuario').value = u.email || '';
    document.getElementById('editarTelefoneUsuario').value = u.telefone || '';
    document.getElementById('editarCpfUsuario').value = u.cpf || '';
    document.getElementById('editarRuaUsuario').value = u.endereco?.rua || '';
    document.getElementById('editarNumeroUsuario').value = u.endereco?.numero || '';
    document.getElementById('editarCidadeUsuario').value = u.endereco?.cidade || '';
    document.getElementById('editarEstadoUsuario').value = u.endereco?.estado || '';
    document.getElementById('editarCepUsuario').value = u.endereco?.cep || '';
    document.getElementById('editarTipoUsuario').value = u.tipo || '';
    const modal = new bootstrap.Modal(document.getElementById('modalEditarUsuario'));
    modal.show();
}

document.getElementById('formEditarUsuario').addEventListener('submit', function(e) {
    e.preventDefault();
    const idx = document.getElementById('editarIdx').value;
    const usuarios = getUsuarios();
    usuarios[idx] = {
        nome: document.getElementById('editarNomeUsuario').value.trim(),
        email: document.getElementById('editarEmailUsuario').value.trim(),
        telefone: document.getElementById('editarTelefoneUsuario').value.trim(),
        cpf: document.getElementById('editarCpfUsuario').value.trim(),
        endereco: {
            rua: document.getElementById('editarRuaUsuario').value.trim(),
            numero: document.getElementById('editarNumeroUsuario').value.trim(),
            cidade: document.getElementById('editarCidadeUsuario').value.trim(),
            estado: document.getElementById('editarEstadoUsuario').value.trim(),
            cep: document.getElementById('editarCepUsuario').value.trim()
        },
        tipo: document.getElementById('editarTipoUsuario').value
    };
    setUsuarios(usuarios);
    bootstrap.Modal.getInstance(document.getElementById('modalEditarUsuario')).hide();
    atualizarTabelaUsuarios();
    exibirPopupSucesso('Usuário editado com sucesso!');
});

// Função para popup de sucesso
function exibirPopupSucesso(mensagem) {
    let popup = document.createElement('div');
    popup.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3 shadow';
    popup.style.zIndex = 2000;
    popup.style.minWidth = '300px';
    popup.style.textAlign = 'center';
    popup.textContent = mensagem;
    document.body.appendChild(popup);
    setTimeout(() => {
        popup.remove();
    }, 2000);
}

// Botão listar usuários (toggle)
document.getElementById('btnListarUsuarios').addEventListener('click', function() {
    const tabela = document.getElementById('tabelaUsuariosContainer');
    if (tabela.style.display === 'block') {
        tabela.style.display = 'none';
    } else {
        atualizarTabelaUsuarios();
        tabela.style.display = 'block';
    }
});

// Ao carregar a página, a tabela fica oculta
window.onload = function() {
    document.getElementById('tabelaUsuariosContainer').style.display = 'none';
};

// Máscara para telefone e CPF
function aplicarMascaraTelefone(input) {
    input.addEventListener('input', function () {
        let v = input.value.replace(/\D/g, '');
        if (v.length > 11) v = v.slice(0, 11);
        if (v.length > 6) {
            input.value = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
        } else if (v.length > 2) {
            input.value = `(${v.slice(0, 2)}) ${v.slice(2)}`;
        } else {
            input.value = v;
        }
    });
}
function aplicarMascaraCPF(input) {
    input.addEventListener('input', function () {
        let v = input.value.replace(/\D/g, '');
        if (v.length > 11) v = v.slice(0, 11);
        if (v.length > 9) {
            input.value = `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9)}`;
        } else if (v.length > 6) {
            input.value = `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6)}`;
        } else if (v.length > 3) {
            input.value = `${v.slice(0, 3)}.${v.slice(3)}`;
        } else {
            input.value = v;
        }
    });
}

// Máscara para CEP XXXXX-XXX
function aplicarMascaraCEP(input) {
    input.addEventListener('input', function () {
        let v = input.value.replace(/\D/g, '');
        if (v.length > 8) v = v.slice(0, 8);
        if (v.length > 5) {
            input.value = `${v.slice(0, 5)}-${v.slice(5)}`;
        } else {
            input.value = v;
        }
    });
}

// Aplicar máscaras nos campos de cadastro
aplicarMascaraTelefone(document.getElementById('telefoneUsuario'));
aplicarMascaraCPF(document.getElementById('cpfUsuario'));
aplicarMascaraCEP(document.getElementById('cepUsuario'));

// Aplicar máscaras nos campos de edição
aplicarMascaraTelefone(document.getElementById('editarTelefoneUsuario'));
aplicarMascaraCPF(document.getElementById('editarCpfUsuario'));
aplicarMascaraCEP(document.getElementById('editarCepUsuario'));