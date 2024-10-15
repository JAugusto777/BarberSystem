import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Container } from "./Styles/financeirostyles";
import {
  Content,
  Header,
  MetricasContainer,
  TableContainer,
  InputContainer,
} from "./Styles/tablesstyles";
import { Link } from "react-router-dom";
import DatePickerValue from "./Components/Inputs/DataInput/index";
import Button from "./Components/Buttons/index";
import Dropdown from "./Components/Dropdowns/index";
import { DropdownContainer } from "./Components/Dropdowns/style";

const Table = () => {
  const [operacoes, setOperacoes] = useState([]);
  const [dataOperacao, setDataOperacao] = useState(null);
  const [dataOperacaoFinal, setDataOperacaoFinal] = useState(null);
  const [selectedOption, setSelectedOption] = useState("0");
  const [filteredOperacoes, setFilteredOperacoes] = useState([]);

  const produtosOptions = [
    { value: "0", label: "Geral" },
    { value: "1", label: "Entradas" },
    { value: "2", label: "Saídas" },
  ];

  // Função para buscar dados da API
  const fetchOperacoes = async () => {
    try {
      const response = await fetch("http://localhost:3001/operacoes/tables");
      const data = await response.json();
      setOperacoes(data);
    } catch (error) {
      console.error("Erro ao buscar operações:", error);
    }
  };

  useEffect(() => {
    fetchOperacoes();
  }, []);

  // Função para filtrar operações com base em data e tipo
  useEffect(() => {
    const filterTableData = () => {
      let filtered = [...operacoes]; // Clonar o array de operações

      // Filtro por tipo de operação (ajustado para categorias "entrada" e "saida" como strings)
      if (selectedOption === "1") {
        filtered = filtered.filter((operacao) => operacao.categoria === "entrada");
      } else if (selectedOption === "2") {
        filtered = filtered.filter((operacao) => operacao.categoria === "saida");
      }

      // Filtro por intervalo de datas
      if (dataOperacao && dataOperacaoFinal) {
        const start = dayjs(dataOperacao).startOf("day");
        const end = dayjs(dataOperacaoFinal).endOf("day");

        filtered = filtered.filter((operacao) => {
          const operacaoDate = dayjs(operacao.dataOperacao);
          return operacaoDate.isBetween(start, end, null, "[]");
        });
      }

      setFilteredOperacoes(filtered);
    };

    filterTableData();
  }, [dataOperacao, dataOperacaoFinal, selectedOption, operacoes]);

  // Função para calcular métricas
 // Função para calcular métricas
const calculateMetrics = () => {
  let totalEntradas = 0;
  let totalSaidas = 0;

  filteredOperacoes.forEach((operacao) => {
    const preco = parseFloat(operacao.precoTotal) || 0; // Converte o preço para número

    if (operacao.categoria === "entrada") {
      totalEntradas += preco;
    } else if (operacao.categoria === "saida") {
      totalSaidas += preco;
    }
  });

  // Calcula o lucro, garantindo que não seja negativo
  const lucro = Math.max(0, totalEntradas - totalSaidas);

  console.log("Operações:", operacoes);
  console.log("Operações Filtradas:", filteredOperacoes);

  return { totalEntradas, totalSaidas, lucro };
};


  const { totalEntradas, totalSaidas, lucro } = calculateMetrics();

  return (
    <Container>
      <Header>
        <Link to={"/financeiro"}>
          <Button iconType={"return"} />
        </Link>

        <Dropdown
          style={{ textDecoration: "none" }}
          Container={DropdownContainer}
          options={produtosOptions}
          placeholder={"Selecionar"}
          onChange={(option) => setSelectedOption(option.value)}
          defaultValue={produtosOptions[0]}
        />
      </Header>

      <Content>
        <MetricasContainer>
          <div className="metricasTitle">
            <h1>Faturamento</h1>
            <h2>R$ {totalEntradas.toFixed(2)}</h2>

            <h1>Lucro</h1>
            <h2 style={{ color: "greenyellow" }}>R$ {lucro.toFixed(2)}</h2>

            <h1>Saídas</h1>
            <h2 style={{ color: "red" }}>
              R$ {Math.abs(totalSaidas).toFixed(2)}
            </h2>
          </div>

          <InputContainer>
            <h3>De: </h3>
            <DatePickerValue
              value={dataOperacao}
              onChange={(date) => setDataOperacao(date)}
            />
            <h3>Até: </h3>
            <DatePickerValue
              value={dataOperacaoFinal}
              onChange={(date) => setDataOperacaoFinal(date)}
            />
          </InputContainer>
        </MetricasContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>DATA</th>
                <th>Aquisição / Pagamento</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {filteredOperacoes.map((operacao) => (
                <tr key={operacao.IdOperacao}>
                  <td>{dayjs(operacao.dataOperacao).format("DD/MM/YYYY")}</td>
                  <td>
                    {operacao.Produtos} <br /> {operacao.Servicos}
                  </td>
                  <td>R$ {parseFloat(operacao.precoTotal).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Content>
    </Container>
  );
};

export default Table;
