const mysql = require("mysql2");
const express = require("express");
const app = express();
const cors = require("cors");

// Middleware para habilitar JSON no express
app.use(express.json());

const allowCors = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  next();
};

// Aplicando o middleware de CORS personalizado
app.use(allowCors);

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({ 
  host: 'autorack.proxy.rlwy.net',
  user: 'root',
  password: 'OYOYuIszNSrTdpvDXrFDYMifRLFIKlsZ',
  database: 'financeiro',
  port: 53180
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySql Connected...");
});

// Rotas GET
app.get("/", (req, res) => {
  res.setHeader("Access-Controll-Alow-Origin", "http://localhost:3000");
  res.json("backend");
});

app.get("/servicos", (req, res) => {
  const sql = "SELECT * FROM servicos where status = 'ativo'";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/produtos", (req, res) => {
  const sql = "SELECT * FROM produtos where status = 'ativo'";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/operacoes", (req, res) => {
  const sqlSelect =
    "SELECT o.IdOperacao, o.dataOperacao, o.categoria, o.precoTotal, o.nome_cliente, p.Nome AS NomeProduto, s.Nome AS NomeServico " +
    "FROM operacoes o " +
    "LEFT JOIN produtos p ON o.IdProduto = p.IdProduto " +
    "LEFT JOIN servicos s ON o.IdServico = s.IdServico ";

  db.query(sqlSelect, (err, results) => {
    if (err) {
      console.error("Erro ao buscar operações:", err);
      return res.status(500).json({ message: "Erro ao buscar operações" });
    }

    res.status(200).json(results);
  });
});

app.get("/operacoes/anual", (req, res) => {
  const sql =
    "SELECT YEAR(dataOperacao) as ano, SUM(CASE WHEN categoria = 1 THEN precoTotal ELSE 0 END) as totalEntrada, SUM(CASE WHEN categoria = 2 THEN precoTotal ELSE 0 END) as totalSaida FROM operacoes GROUP BY YEAR(dataOperacao) ORDER BY ano";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Erro ao buscar dados anuais:", err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.get("/operacoes/mensal", (req, res) => {
  const sql =
    "SELECT MONTH(dataOperacao) as mes, SUM(CASE WHEN categoria = 1 THEN precoTotal ELSE 0 END) as totalEntrada, SUM(CASE WHEN categoria = 2 THEN precoTotal ELSE 0 END) as totalSaida FROM operacoes WHERE YEAR(dataOperacao) = ? GROUP BY MONTH(dataOperacao) ORDER BY mes";

  db.query(sql, [req.query.ano], (err, data) => {
    if (err) {
      console.error("Erro ao buscar dados mensais:", err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.get("/operacoes/semanal", (req, res) => {
  const sql =
    "SELECT WEEK(dataOperacao, 3) - WEEK(DATE_SUB(dataOperacao, INTERVAL DAYOFMONTH(dataOperacao) - 1 DAY), 3) + 1 AS semana, SUM(CASE WHEN categoria = 1 THEN precoTotal ELSE 0 END) as totalEntrada, SUM(CASE WHEN categoria = 2 THEN precoTotal ELSE 0 END) as totalSaida FROM operacoes WHERE   MONTH(dataOperacao) = ? AND YEAR(dataOperacao) = ? GROUP BY   semana ORDER BY MIN(dataOperacao)";
  db.query(sql, [req.query.mes, req.query.ano], (err, data) => {
    if (err) {
      console.error("Erro ao buscar dados semanais:", err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.get("/operacoes/diario", (req, res) => {
  const sql =
    "SELECT DAY(dataOperacao) as dia, MONTH(dataOperacao) as mes, YEAR(dataOperacao) as ano, SUM(CASE WHEN categoria = 1 THEN precoTotal ELSE 0 END) as totalEntrada, SUM(CASE WHEN categoria = 2 THEN precoTotal ELSE 0 END) as totalSaida FROM operacoes WHERE MONTH(dataOperacao) = ? AND YEAR(dataOperacao) = ? GROUP BY dia, mes, ano ORDER BY dia";

  db.query(sql, [req.query.mes, req.query.ano], (err, data) => {
    if (err) {
      console.error("Erro ao buscar dados diários:", err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.get("/operacoes/tables", (req, res) => {
  const { dataInicio, dataFim, categoria } = req.query;

  let sql = `SELECT 
      o.IdOperacao, 
      o.dataOperacao, 
      o.categoria, 
      o.precoTotal, 
      p.Nome AS Produtos, 
      s.Nome AS Servicos, 
      o.outros
    FROM operacoes o 
    LEFT JOIN produtos p ON o.IdProduto = p.IdProduto 
    LEFT JOIN servicos s ON o.IdServico = s.IdServico`;

  const filters = [];

  if (categoria) {
    filters.push(`o.categoria = ${db.escape(categoria)}`);
  }

  if (dataInicio && !dataFim) {
    filters.push(`o.dataOperacao = ${db.escape(dataInicio)}`);
  } else if (dataInicio && dataFim) {
    filters.push(
      `o.dataOperacao BETWEEN ${db.escape(dataInicio)} AND ${db.escape(
        dataFim
      )}`
    );
  }

  if (filters.length > 0) {
    sql += " WHERE " + filters.join(" AND ");
  }

  sql += " GROUP BY o.IdOperacao";
  sql += " ORDER BY o.dataOperacao ASC";

  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/clientes", (req, res) => {
  const sql = "select * from clientes";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar agendamentos:", err);
      return res.status(500).json({ message: "Erro ao buscar agendamentos" });
    }

    res.json(results);
  });
});

app.get("/agendamentos", (req, res) => {
  const sql = "select * from agendamentos";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar agendamentos:", err);
      return res.status(500).json({ message: "Erro ao buscar agendamentos" });
    }

    res.json(results);
  });
});

// Rotas POST
app.post("/servicos", (req, res) => {
  const sql = "insert into servicos (nome, preco) values(?, ?)";

  db.query(sql, [req.body.nome, req.body.preco], (err, result) => {
    if (err) return res.json(err);
    return res.json({
      message: "Servico adicionado com sucesso",
      id: result.insertId,
    });
  });
});

app.post("/produtos", (req, res) => {
  const sql = "insert into produtos (nome, preco) values(?, ?)";

  db.query(sql, [req.body.nome, req.body.preco], (err, result) => {
    if (err) return res.json(err);
    return res.json({
      message: "Produto adicionado com sucesso",
      id: result.insertId,
    });
  });
});

app.post("/operacoes", (req, res) => {
  const { dataOperacao, categoria, precoTotal, Produtos, Servicos, Outros, nomeCliente } =
    req.body;

  const sqlInsertOperacao =
    "INSERT INTO operacoes (dataOperacao, categoria, precoTotal, IdProduto, IdServico, Outros, nome_cliente) VALUES (?, ?, ?, ?, ?, ?, ?)";

  // Pega o primeiro produto e serviço, ou null se não houver
  const produtoId = Produtos.length > 0 ? Produtos[0] : null;
  const servicoId = Servicos.length > 0 ? Servicos[0] : null;

  // Executa a query de inserção
  db.query(
    sqlInsertOperacao,
    [dataOperacao, categoria, precoTotal, produtoId, servicoId, Outros, nomeCliente],
    (err, result) => {
      if (err) {
        console.error("Erro ao inserir operação:", err);
        return res.status(500).json({ message: "Erro ao inserir operação" });
      }

      const operacaoId = result.insertId;

      // Se houver mais de um produto ou serviço, faz a atualização
      if (Produtos.length > 1 || Servicos.length > 1) {
        const sqlUpdateOperacao =
          "UPDATE operacoes SET IdProduto = ?, IdServico = ? WHERE IdOperacao = ?";

        const updatedProdutoId = Produtos.length > 1 ? Produtos[1] : null;
        const updatedServicoId = Servicos.length > 1 ? Servicos[1] : null;

        db.query(
          sqlUpdateOperacao,
          [updatedProdutoId, updatedServicoId, operacaoId],
          (err, result) => {
            if (err) {
              console.error("Erro ao atualizar operação:", err);
              return res
                .status(500)
                .json({ message: "Erro ao atualizar operação" });
            }

            res.json({ message: "Operação atualizada com sucesso" });
          }
        );
      } else {
        res.json({ message: "Operação criada com sucesso" });
      }
    }
  );
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
