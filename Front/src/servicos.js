import React, { useEffect, useState } from "react";
import {
  Container,
  Content,
  Header,
  InputContainer,
} from "./Styles/servicosstyles";
import Input from "./Components/Inputs/index";
import Button from "./Components/Buttons/index";
import { Reg_operacoesButtonContainer } from "./Components/Buttons/style";
import { Link } from "react-router-dom";

const Servicos = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/servicos")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  const [servico, setServico] = useState("");
  const [produto, setProduto] = useState("");
  const [servicosOptions, setServicosOptions] = useState([]);
  const [produtosOptions, setProdutosOptions] = useState([]);
  const [preco, setPreco] = useState("");

  const handleSubmit = () => {
    const newRegister = {
      preco: preco,
    };
    let url = "";

    if (!preco) {
      alert("O campo preço não pode estar em branco.");
      return;
    }

    if (!servico && !produto) {
      alert("Preencha um dos campos *serviço ou *produto");
      return;
    }

    if (servico) {
      newRegister.nome = servico;
      url = "http://localhost:3001/servicos";
    } else if (produto) {
      newRegister.nome = produto;
      url = "http://localhost:3001/produtos";
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRegister),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Dados inseridos com sucesso", data);
        alert("Dados inseridos com sucesso");
        setData([...data, newRegister]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch("http://localhost:3001/api/index")
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

  return (
    <Container>
      <Header>
        <Link to={"/"}>
          <Button iconType={"return"} />
        </Link>
        <div className="excluirButton">
          <Link to={"/deleteservicos"} style={{ textDecoration: "none" }}>
            <Button
              type={`submit`}
              Label={"REMOVER PRODUTO"}
              Container={Reg_operacoesButtonContainer}
            />
          </Link>
        </div>
      </Header>
      <div className="containermain">
        <h1 className="titulo">Adicione Podutos e Serviços</h1>
        <Content>
          <div className="servicosForm">
            <form onSubmit={handleSubmit}>
              <div className="inputRow">
                <InputContainer>
                  <h1>Serviço</h1>
                  <Input
                    type={"text"}
                    value={servico}
                    onChange={(e) => setServico(e.target.value)}
                  />
                </InputContainer>

                <InputContainer>
                  <h1>Produto</h1>
                  <Input
                    type={"text"}
                    value={produto}
                    onChange={(e) => setProduto(e.target.value)}
                  />
                </InputContainer>

                <InputContainer>
                  <h1>Valor</h1>
                  <Input
                    type={"number"}
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                  />
                </InputContainer>
              </div>

              <div className="formButtonContainer">
                <Button
                  type={`submit`}
                  Label={"CADASTRAR"}
                  onClick={handleSubmit}
                  Container={Reg_operacoesButtonContainer}
                />
              </div>
            </form>
          </div>
        </Content>
      </div>
    </Container>
  );
};

export default Servicos;
