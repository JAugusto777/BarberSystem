# BarberSystem

- #Correção de Bug#: Resolver o problema em que é necessário atualizar a página após registrar uma nova operação. Esse erro ocorre ao tentar registrar outra operação sem atualização, como se houvesse um campo obrigatório em branco.

- #Adicionar Histórico de Operações#: Incluir um histórico de operações ao lado do formulário principal, exibindo as últimas entradas e saídas para facilitar o acompanhamento.

- #Campo para Nome do Cliente#: Adicionar um campo para registrar o nome do cliente na tela de operações.

- #Facilidade de Identificação#: Facilitar a visualização de qual cliente foi registrado, uma vez que atualmente só são informados o tipo de serviço (como "cabelo") e o valor, o que leva a confusão.


Conexao com db em producao--------------------------------
const db = mysql.createConnection({
  host: 'autorack.proxy.rlwy.net',
  user: 'root',
  password: 'OYOYuIszNSrTdpvDXrFDYMifRLFIKlsZ',
  database: 'financeiro',
  port: 53180
});

Tabelas{
    agendamento{
        id_agendamento,
        id_cliente FOREIGN,
        servico_id FOREIGN,
        produto_id FOREIGN,
        Data_agendamento,
    }

    cliente{
        id_cliente,
        nome,
        email,
        senha,
        numero,
    }

    operacoes{
        add column
        id_cliente FOREIGN
    }
} 