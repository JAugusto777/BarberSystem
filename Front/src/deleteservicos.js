import React from "react";
import { useEffect, useState } from "react";
import {
  Container,
  Content,
  Header,
  InputContainer,
} from "./Styles/deleteservicosstyles";
import Button from "./Components/Buttons/index";
import { Reg_operacoesButtonContainer } from "./Components/Buttons/style";
import Dropdown from "./Components/Dropdowns/index";
import { Link } from "react-router-dom";
import {
  DropdownContainer
} from "./Components/Dropdowns/style";

const DeleteServicos = () => {
  const [data, setData] = useState([]);
  const [produtosOptions, setProdutosOptions] = useState([]);
  const [servicosOptions, setServicosOptions] = useState([]);
  const [produtosSelecionados, setProdutosSelecionados] = useState([""]);
  const [servicosSelecionados, setServicosSelecionados] = useState([""]);

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

    //
  const handleDelete = (e) => {
    e.preventDefault();

    const itemToDelete = {
      servico: servicosSelecionados,
      produto: produtosSelecionados,
    };

    // Verifica se um serviço ou produto foi selecionado
    if (!itemToDelete.servico && !itemToDelete.produto) {
      alert("Selecione um serviço ou produto para excluir.");
      return;
    }

    const url = "http://localhost:3001/servicos-e-produtos";

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemToDelete),
    })
      .then((response) => {
        console.log("Resposta do servidor:", response);
        return response.json();
      })
      .then((data) => {
        setData(data);
        console.log("Item inativado com sucesso:", data);
        alert("Item excluído com sucesso");
      })
      .catch((error) => {
        console.error("Erro ao inativar o item:", error);
      });
  };

  

  return (
    <Container>
      <Header>
        <Link to={"/servicos"}>
          <Button type={`button`} iconType={"return"} />
        </Link>
      </Header>
      <Content>
        <form className="deleteForm" onSubmit={handleDelete}>
          <h1 className="titulo">Remova seus produtos e serviços</h1>
          <InputContainer>
            <div className="blocos">
              <h1>Serviço</h1>
              <Dropdown
                options={servicosOptions}
                Container={DropdownContainer}
                value={servicosSelecionados}
                onChange={(selected) => setServicosSelecionados(selected.value)}
              />
            </div>
            <div className="blocos">
              <h1>Produto</h1>
              <Dropdown
                options={produtosOptions}
                Container={DropdownContainer}
                value={produtosSelecionados}
                onChange={(selected) => setProdutosSelecionados(selected.value)}
              />
            </div>
          </InputContainer>
            <Button
              type={`submit`}
              Label={"Excluir"}
              Container={Reg_operacoesButtonContainer}
            />
        </form>
      </Content>
    </Container>
  );
};

export default DeleteServicos;
