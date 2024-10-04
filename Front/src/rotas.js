import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import Financeiro from './financeiro';
import Reg_operacoes from './reg_operacoes';
import Table from './tables';
import Servicos from './servicos';
import DeleteServicos from './deleteservicos';


const Rotas = () =>{
    return(
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/financeiro" element={<Financeiro/>}/>
                <Route path="/servicos" element={<Servicos/>}/>
                <Route path="/reg_operacoes" element={<Reg_operacoes/>}/>
                <Route path="/tables" element={<Table/>}/>
                <Route path="/deleteservicos" element={<DeleteServicos/>}></Route>
            </Routes>
        </Router>
    )
};

export default Rotas;