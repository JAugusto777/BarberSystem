import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Content,
  Header,
  InputContainer,
} from "./Styles/reg_operacoesstyles";
import Input from "./Components/Inputs/index";
import Dropdown from "./Components/Dropdowns/index";
import Button from "./Components/Buttons/index";
import { Reg_operacoesButtonContainer } from "./Components/Buttons/style";
import { DropdownContainer } from "./Components/Dropdowns/style";

const Reg_operacoes = () => {
  const [data, setData] = useState([]);
  const [dataOperacao, setDataOperacao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precoTotal, setPrecoTotal] = useState("");
  const [servicosOptions, setServicosOptions] = useState([]);
  const [produtosOptions, setProdutosOptions] = useState([]);
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);
  const [servicosSelecionados, setServicosSelecionados] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));

    const getServicos = async () => {
      try {
        const response = await fetch("http://localhost:3001/servicos");
        const data = await response.json();
        if (Array.isArray(data)) {
          const options = data.map((servicos) => ({
            value: servicos.IdServico,
            label: servicos.Nome,
          }));

          setServicosOptions(options);
        } else {
          console.error("Dados de serviços inválidos:", data);
        }
      } catch (err) {
        console.error("Erro ao buscar serviços:", err);
      }
    };

    const getProdutos = async () => {
      try {
        const response = await fetch("http://localhost:3001/produtos");
        const data = await response.json();
        if (Array.isArray(data)) {
          const options = data.map((produtos) => ({
            value: produtos.IdProduto,
            label: produtos.Nome,
          }));
          setProdutosOptions(options);
        } else {
          console.error("Dados de produtos inválidos:", data);
        }
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      }
    };

    getProdutos();
    getServicos();
  }, []);

  const categoriaOptions = [
    { value: "1", label: "Entrada" },
    { value: "2", label: "Saída" },
  ];

  const handleSubmit = (event) => {
    console.log("handleSubmit foi chamado!");
    event.preventDefault();

    if (!dataOperacao || !categoria || !precoTotal) {
      alert("Os campos de categoria, valor e data nao podem estar em branco.");
      console.log(dataOperacao, categoria, precoTotal);
      return;
    }

    const newRegister = {
      dataOperacao: dataOperacao,
      categoria: categoria,
      precoTotal: precoTotal,
      Produtos: produtosSelecionados, // Array de IDs de produtos
      Servicos: servicosSelecionados, // Array de IDs de serviços
    };

    console.log(newRegister);

    fetch("http://localhost:3001/operacoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRegister),
    })
      .then((response) => response.json())
      .then((data) => {
        fetch("http://localhost:3001/operacoes")
          .then((response) => response.json())
          .then((data) => {
            // Verifique se data é um array ou objeto
            if (Array.isArray(data)) {
              setData(data);
              alert("operacao registrada com sucesso!");
            } else {
              console.error("Esperava um array, mas obtive:", data);
            }
          })
          .catch((err) => console.error("Erro ao buscar operações:", err));
      });
  };

  return (
    <Container>
      <Header>
        <Link to={"/financeiro"}>
          <Button iconType={"return"} to={"/financeiro"} />
        </Link>
        <h1>Registro de Operações</h1>
        <div></div>
      </Header>
      <Content>
        <form className="Reg_operacoesForm" onSubmit={handleSubmit}>
          <InputContainer>
            <h1>Valor</h1>
            <Input
              type={"text"}
              value={precoTotal}
              onChange={(e) => setPrecoTotal(e.target.value)}
            />
          </InputContainer>

          <InputContainer>
            <h1>Categoria</h1>
            <Dropdown
              Container={DropdownContainer}
              options={categoriaOptions}
              value={categoria}
              placeholder={"selecionar"}
              onChange={(selected) => setCategoria(selected.value)}
            />
          </InputContainer>

          <InputContainer>
            <h1>Serviço</h1>
            <Dropdown
              Container={DropdownContainer}
              options={servicosOptions}
              multiple={true}
              value={servicosSelecionados}
              onChange={(selected) =>
                setServicosSelecionados(selected.map((option) => option.value))
              }
            />
          </InputContainer>

          <InputContainer>
            <h1>Data</h1>
            <Input
              type={"date"}
              value={dataOperacao}
              onChange={(e) => setDataOperacao(e.target.value)}
            />
          </InputContainer>

          <InputContainer>
            <h1>Produto</h1>
            <Dropdown
              Container={DropdownContainer}
              options={produtosOptions}
              multiple={true}
              value={produtosSelecionados}
              onChange={(selected) =>
                setProdutosSelecionados(selected.map((option) => option.value))
              }
            />
          </InputContainer>

          <InputContainer>
            <Button
              type={"submit"}
              Label={"Registrar"}
              Container={Reg_operacoesButtonContainer}
            />
          </InputContainer>
        </form>
      </Content>
    </Container>
  );
};

export default Reg_operacoes;