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
import { green } from "@mui/material/colors";

const Table = () => {
  const [operacoes, setOperacoes] = useState([]);
  const [dataOperacao, setDataOperacao] = useState(dayjs()); // Inicializar como dayjs
  const [dataOperacaoFinal, setDataOperacaoFinal] = useState(dayjs("")); // Inicializar como dayjs
  const [selectedOption, setSelectedOption] = useState("0");
  const [filteredOperacoes, setFilteredOperacoes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/operacoes/tables", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOperacoes(data);
        filterTableData(data);
      })
      .catch((error) => console.error("Erro ao buscar operações:", error));
  }, []);

  useEffect(() => {
    filterTableData(operacoes);
  }, [dataOperacao, dataOperacaoFinal, selectedOption]);

  const produtosOptions = [
    { value: "0", label: "Geral" },
    { value: "1", label: "Entradas" },
    { value: "2", label: "Saídas" },
  ];

  const filterTableData = (operacoes) => {
    let filtered = operacoes;

    if (selectedOption !== "0") {
      filtered = filtered.filter(
        (operacao) => operacao.categoria === parseInt(selectedOption)
      );
    }

    if (dataOperacao || dataOperacaoFinal) {
      const initialDate = dataOperacao.isValid()
        ? dataOperacao.startOf("day")
        : null;
      const finalDate = dataOperacaoFinal.isValid()
        ? dataOperacaoFinal.endOf("day")
        : null;

      filtered = filtered.filter((operacao) => {
        const operacaoDate = dayjs(operacao.dataOperacao);

        if (initialDate && !finalDate) {
          return operacaoDate.isSame(initialDate, "day");
        } else if (initialDate && finalDate) {
          return (
            operacaoDate.isSame(initialDate, "day") ||
            operacaoDate.isSame(finalDate, "day") ||
            (operacaoDate.isAfter(initialDate) &&
              operacaoDate.isBefore(finalDate))
          );
        } else {
          return true;
        }
      });
    }

    setFilteredOperacoes(filtered);
  };

  const handleDateChange = (date, finalDate) => {
    setDataOperacao(date ? dayjs(date) : null);
    setDataOperacaoFinal(finalDate ? dayjs(finalDate) : null);
  };

  const renderMetricas = () => {
    const totalEntradas = filteredOperacoes
      .filter((operacao) => operacao.categoria === 1)
      .reduce((total, operacao) => total + operacao.precoTotal, 0);

    const totalSaidas = filteredOperacoes
      .filter((operacao) => operacao.categoria === 2)
      .reduce((total, operacao) => total + operacao.precoTotal, 0);

    const lucro = totalEntradas - totalSaidas; // As saídas são negativas, então somamos para subtrair

    if (selectedOption === "1") {
      return (
        <div className="metricasTitle">
          <h1>Total de entradas</h1>
          <h2>R$ {totalEntradas.toFixed(2)}</h2>
        </div>
      );
    } else if (selectedOption === "2") {
      return (
        <div className="metricasTitle">
          <h1>Total de despesas</h1>
          <h2>R$ {Math.abs(totalSaidas).toFixed(2)}</h2>{" "}
          {/* Math.abs para mostrar valor positivo */}
        </div>
      );
    } else if (selectedOption === "0") {
      const totalEntradas = filteredOperacoes
        .filter((operacao) => operacao.categoria > 0)
        .reduce((total, operacao) => total + operacao.precoTotal, 0);

      return (
        <div className="metricasTitle">
          <h1>Movimentação</h1>
          <h2>R$ {totalEntradas.toFixed(2)}</h2>
          <h1>Saldo</h1>
          <h2 style={{ color: "greenyellow" }}>R$ {lucro.toFixed(2)}</h2>
          <h1>Saídas</h1>
          <h2 style={{ color: "red" }}>
            R$ {Math.abs(totalSaidas).toFixed(2)}
          </h2>
        </div>
      );
    }
  };

  return (
    <Container>
      <Header>
        <Link to={"/financeiro"}>
          <Button iconType={"return"}/>
        </Link>

        <Dropdown
          style={{ textDecoration: "none" }}
          Container={DropdownContainer}
          options={produtosOptions}
          placeholder={"selecionar"}
          onChange={(option) => setSelectedOption(option.value)}
          defaultValue={produtosOptions[0]}
        />
      </Header>
      <Content>
        <MetricasContainer>
          {renderMetricas()}
          <InputContainer>
            <h3>De: </h3>
            <DatePickerValue
              value={dataOperacao}
              onChange={(date) => handleDateChange(date, dataOperacaoFinal)}
            />
            <h3>Até: </h3>
            <DatePickerValue
              value={dataOperacaoFinal}
              onChange={(date) => handleDateChange(dataOperacao, date)}
            />
          </InputContainer>
        </MetricasContainer>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>DATA </th>
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
                  <td>R$ {operacao.precoTotal}</td>
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
