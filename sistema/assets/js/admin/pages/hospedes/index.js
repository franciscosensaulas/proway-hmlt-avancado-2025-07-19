let tbody = document.getElementById("tbody-hospedes");

function carregarHospedesDoLocalStorage() {
    let hospedesString = localStorage.getItem("hospedes");
    let hospedes = [];
    if (hospedesString !== null) {
        hospedes = JSON.parse(hospedesString);
    }
    return hospedes;
}

function listarHospedes() {
    let hospedes = carregarHospedesDoLocalStorage();

    // Remover as linhas do tbody (tabela ficará vazia temporariamente)
    tbody.innerHTML = "";

    for (let i = 0; i < hospedes.length; i++) {
        let hospede = hospedes[i];
        // console.log(hospede);
        criarLinha(hospede);
    }
}

function criarLinha(hospede) {
    let linha = `<tr>
                    <td>${hospede.nome}</td>
                    <td>${hospede.cpf}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <a href="editar.html?id=${hospede.id}" class="btn"><i class="fa-solid fa-pencil"></i></a>
                        <button class="btn" onclick="apagarHospede('${hospede.id}')"><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>`;
    tbody.innerHTML += linha;
}

function apagarHospede(idHospede) {
    // Resgatar a lista de hóspedes do local storage
    let hospedes = carregarHospedesDoLocalStorage();
    // Filtrar o hóspede que tem o id que deve ser apagado
    let hospedeParaApagar = hospedes.filter(x => x.id === idHospede)[0];
    // Obter o indice do hóspede que deve ser apagado
    let indiceHospedeParaApagar = hospedes.findIndex(x => x.id === idHospede);

    if (hospedeParaApagar === undefined)
        return

    confirmarExclusao(hospedeParaApagar, indiceHospedeParaApagar, hospedes);
}

function salvarLocalStorage(hospedes) {
    let hospedesString = JSON.stringify(hospedes);
    localStorage.setItem("hospedes", hospedesString);
}

listarHospedes();


function confirmarExclusao(hospede, indiceHospedeParaApagar, hospedes) {
    const opcoesSwal = {
        title: `Deseja realmente apagar o Hóspede '${hospede.nome}'?`,
        text: "Não tem como voltar atrás!",
        icon: "warning",
        showDenyButton: true,
        confirmButtonColor: "#d33",
        denyButtonColor: "#3085d6",
        confirmButtonText: "Sim",
        denyButtonText: "Não",
        reverseButtons: true
    }

    Swal.fire(opcoesSwal).then((result) => {
        if (result.isConfirmed) {

            hospedes.splice(indiceHospedeParaApagar, 1);
            salvarLocalStorage(hospedes);
            listarHospedes();
            Swal.fire({
                title: "Apagado!",
                text: "Hóspede apagado com sucesso.",
                icon: "success"
            });
        }
    });
}