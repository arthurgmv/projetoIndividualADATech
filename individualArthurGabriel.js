//Vendo os dias da semana
function pegarODiaDaSemanaAtual() {
    const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const diaAtual = new Date().getDay();
    return diasDaSemana[diaAtual];
}

// Função do corpo do email
function montarCorpoDoEmail() {
    return `
        Olá,
        Esta é a CarTop que oferece o que há de mais moderno em automóveis.
        Confira os novos modelos que acabaram de chegar em nossas lojas e nossos carros mais vendidos do mês passado.
        Não perca as nossas condições especiais de financiamento e opções de troca!
                
        Obrigado pela atenção,     
        Equipe CarTop.
    `;
}

const enviarEmail = require('./envia-email'); // Importa a função enviarEmail

// Lista de emails dos clientes
const listaDeClientes = [
    { email: 'cliente1@example.com', optIn: true },
    { email: 'cliente2@example.com', optIn: false },
    // Adicione mais clientes conforme necessário
];

function enviarEmailParaClientes() {
    const diaDaSemana = pegarODiaDaSemanaAtual();
    if (diaDaSemana !== 'Segunda-feira') {
        console.log('Hoje não é segunda-feira. Emails não serão enviados.');
        return;
    }

    const corpoDoEmail = montarCorpoDoEmail();

    listaDeClientes.forEach(cliente => {
        if (cliente.optIn) {
            const resultadoEnvio = enviarEmail(cliente.email, 'Novidades da CarStore', corpoDoEmail);
            if (resultadoEnvio.status === 'Success') {
                console.log(`E-mail enviado para ${cliente.email}`);
            } else {
                console.log(`Erro ao enviar e-mail para ${cliente.email}: ${resultadoEnvio.message}`);
            }
        } else {
            console.log(`O cliente ${cliente.email} optou por não receber comunicações de marketing.`);
        }
    });
}

enviarEmailParaClientes();
