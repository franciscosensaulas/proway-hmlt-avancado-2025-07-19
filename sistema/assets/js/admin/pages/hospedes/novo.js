function armazenarDadosHospede($event){
    $event.preventDefault();
    
    let campoNome = document.getElementById("nome");
    let campoCpf = document.getElementById("cpf");
    let campoNascimento = document.getElementById("nascimento");    
    let campoObservacoes = document.getElementById("observacoes");

    let nome = campoNome.value;
    let cpf = campoCpf.value;
    let nascimento  = campoNascimento.value;
    let observacoes = campoObservacoes.value;

    let hospede = {
        nome: nome,
        cpf: cpf,
        nascimento: nascimento,
        observacoes: observacoes
    }
    console.log(hospede);
    
}
