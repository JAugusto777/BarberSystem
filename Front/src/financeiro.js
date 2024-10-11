import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import {
  Container,
  Content,
  MonthLabel,
  DayLabel,
  GraphToggleButton,
  Header,
  HeaderNavButtons,
  MetricasContainer,
  Grafico,
  YearLabel,
} from "./Styles/financeirostyles";
import Button from "./Components/Buttons/index";
import { HeaderFinanceiroButtonContainer } from "./Components/Buttons/style";
import Dropdown from "./Components/Dropdowns";
import { DropdownContainer } from "./Components/Dropdowns/style";
import Input from "./Components/Inputs/index";
import { Link } from "react-router-dom";

const Financeiro = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showDiaDropdown, setShowDiaDropdown] = useState(false);

  const [chartData, setChartData] = useState({
    totalEntrada: 0,
    totalSaida: 0,
    totalLucro: 0,
  });

  const [selectedPeriod, setSelectedPeriod] = useState("Mensal");

  const [chartState, setChartState] = useState({
    series: [],
    options: {
      chart: {
        type: "bar",
        height: "100%",
        width: "100%",
        toolbar: { show: true },
      },
      plotOptions: {
        bar: { dataLabels: { position: "top" }, columnWidth: "70%" },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: { show: true, width: 1, colors: ["#fff"] },
      grid: { borderColor: "#444", padding: { left: 0, right: 0 } },
      xaxis: {
        categories: [],
        labels: {
          style: { fontSize: "10px", colors: "#fff" },
          offsetY: 0, // Adiciona espaço entre o eixo X e os rótulos
        },
      },
      yaxis: {
        labels: {
          style: { fontSize: "10px", colors: "#fff" },
          offsetX: -10,
        }
      },
      tooltip: { style: { fontSize: "15px" }, theme: "dark" },
      colors: ["#00E396", "#FF4560"],
    },
  });

  const fetchData = async (period) => {
    try {
      let url = `http://localhost:3001/operacoes/${period}`;

      if (period === "mensal") {
        url += `?ano=${selectedYear}`;
      }

      if (period === "semanal" && selectedMonth) {
        url += `?mes=${selectedMonth}&ano=${selectedYear}`;
      }

      if (period === "diario" && selectedMonth) {
        url += `?mes=${selectedMonth}&ano=${selectedYear}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      const entradaData = data.map((item) => Number(item.totalEntrada));
      const saidaData = data.map((item) => Number(item.totalSaida));
      const totalData = entradaData - saidaData;

      const monthNames = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ];

      const semanaLabels = [
        "Semana 1",
        "Semana 2",
        "Semana 3",
        "Semana 4",
        "Semana 5",
      ];

      const categories = data.map((item) => {
        if (period === "anual") {
          return `${item.ano}`;
        } else if (period === "mensal") {
          return monthNames[item.mes - 1];
        } else if (period === "semanal") {
          return semanaLabels[item.semana - 1];
        } else {
          return `${item.dia}`;

        }
      });

      setChartState({
        ...chartState,
        series: [
          { name: "Entradas", data: entradaData },
          { name: "Saídas", data: saidaData },
        ],
        options: {
          ...chartState.options,
          xaxis: { categories },
        },
      });

      const totalEntrada = entradaData.reduce((acc, value) => acc + value, 0);
      const totalSaida = saidaData.reduce((acc, value) => acc + value, 0);
      const totalLucro = totalEntrada - totalSaida;
      setChartData({ totalEntrada, totalSaida, totalLucro });
    } catch (error) {
      console.error(`Erro ao buscar dados ${period}:`, error);
    }
  };

  useEffect(() => {
    fetchData(selectedPeriod.toLowerCase());
  }, [selectedPeriod, selectedMonth, selectedYear]);

  const handlePeriodChange = (option) => {
    setSelectedPeriod(option.label);
    setShowYearDropdown(option.value === "mensal");
    setShowMonthDropdown(option.value === "semanal");
    setShowDiaDropdown(option.value === "diario");
  };

  const graficosOptions = [
    { label: "diario", value: "diario" },
    { label: "Semanal", value: "semanal" },
    { label: "Mensal", value: "mensal" },
    { label: "Anual", value: "anual" },
  ];

  const mesOptions = [
    { label: "Janeiro", value: "1" },
    { label: "Fevereiro", value: "2" },
    { label: "Março", value: "3" },
    { label: "Abril", value: "4" },
    { label: "Maio", value: "5" },
    { label: "Junho", value: "6" },
    { label: "Julho", value: "7" },
    { label: "Agosto", value: "8" },
    { label: "Setembro", value: "9" },
    { label: "Outubro", value: "10" },
    { label: "Novembro", value: "11" },
    { label: "Dezembro", value: "12" },
  ];

  return (
    <Container>
      <Header>
        <Link to={"/"}>
          <Button iconType={"return"} />
        </Link>
        <HeaderNavButtons>
          <Link to={"/reg_operacoes"} style={{ textDecoration: "none" }}>
            <Button
              Label={"NOVA OPERACAO"}
              Container={HeaderFinanceiroButtonContainer}
            />
          </Link>
          <Link to={"/tables"} style={{ textDecoration: "none" }}>
            <Button
              Label={"ENTRADA / SAIDA"}
              Container={HeaderFinanceiroButtonContainer}
            />
          </Link>
        </HeaderNavButtons>

        <GraphToggleButton>
          <Dropdown
            Container={DropdownContainer}
            options={graficosOptions}
            placeholder={"Selecionar"}
            onChange={handlePeriodChange}
          />
        </GraphToggleButton>
      </Header>

      <Content>
        <MetricasContainer>
          <div className="metricas">
            <div className="movimentacao">
              <h1>Faturamento</h1>
              <p>R$ {chartData.totalEntrada.toFixed(2)}</p>
            </div>
            <div className="Saída">
              <h1>Saída</h1>
              <p>R$ {chartData.totalSaida.toFixed(2)}</p>
            </div>
            <div className="Lucro">
              <h1>Lucro</h1>
              <p>R$ {chartData.totalLucro.toFixed(2)}</p>
            </div>
          </div>

          {showMonthDropdown && (
            <MonthLabel>
              <h1>Selecione o Mês</h1>
              <div className="mesDropdown">
                <Input
                  type="month"
                  value={selectedMonth && selectedYear}
                  label="Selecione o mês e o ano"
                  onChange={(e) => {
                    setSelectedMonth(e.target.value.split("-")[1]);
                    setSelectedYear(e.target.value.split("-")[0]);
                  }}
                />
              </div>
            </MonthLabel>
          )}
          {showDiaDropdown && (
            <DayLabel>

              <h1>Selecione mês e ano</h1>
              <Input
                type="month"
                value={selectedMonth && selectedYear}
                onChange={(e) => {
                  setSelectedMonth(e.target.value.split("-")[1]);
                  setSelectedYear(e.target.value.split("-")[0]);
                }}
              />

            </DayLabel>
          )}
          {showYearDropdown && (
            <YearLabel>
              <h1>Selecione o Ano</h1>
              <Input
                type="number"
                min="2020"
                max="2100"
                step="1"
                value={selectedYear}
                placeholder="YYYY"
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  console.log(selectedYear);
                }}
              />
            </YearLabel>
          )}
        </MetricasContainer>
        <Grafico>
          <ReactApexChart
            options={chartState.options}
            series={chartState.series}
            type="bar"
            height="auto"
            width="100%"
          />
        </Grafico>
      </Content>
    </Container>
  );
};

export default Financeiro;
