import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FornecedorForm = () => {
    const [fornecedores, setFornecedores] = useState ([]);  
    const [nome, setNome] = useState('');  
    const [cnpj, setCnpj] = useState('');  

    useEffect(() => {  
        const fetchFornecedores = async () => {  
            const response = await axios.get('http://localhost:5000/api/fornecedores');  
            setFornecedores(response.data);  
        };  
        fetchFornecedores();  
    }, []);  

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        try {  
            await axios.post('http://localhost:5000/api/fornecedores', { nome, cnpj });  
            setNome('');  
            setCnpj('');  
            const response = await axios.get('http://localhost:5000/api/fornecedores');  
            setFornecedores(response.data);  
        } catch (error) {  
            alert(error.response.data.message);  
        }  
    };  

    const handleDelete = async (id) => {  
        try {  
            await axios.delete(`http://localhost:5000/api/fornecedores/${id}`);  
            const response = await axios.get('http://localhost:5000/api/fornecedores');  
            setFornecedores(response.data);  
        } catch (error) {  
            alert('Erro ao desassociar fornecedor.');  
        }  
    };  

    return (  
        <div>  
            <h2>Cadastrar Fornecedor</h2>  
            <form onSubmit={handleSubmit}>  
                <input  
                    type="text"  
                    placeholder="Nome"  
                    value={nome}  
                    onChange={(e) => setNome(e.target.value)}  
                    required  
                />  
                <input  
                    type="text"  
                    placeholder="CNPJ"  
                    value={cnpj}  
                    onChange={(e) => setCnpj(e.target.value)}  
                    required  
                />  
                <button type="submit">Cadastrar</button>  
            </form>  
            <h2>Fornecedores Cadastrados</h2>  
            <ul>  
                {fornecedores.map((fornecedor) => (  
                    <li key={fornecedor._id}>  
                        {fornecedor.nome} - {fornecedor.cnpj}  
                        <button onClick={() => handleDelete(fornecedor._id)}>Desassociar</button>  
                    </li>  
                ))}  
            </ul>  
        </div>  
    );  
};  

export default FornecedorForm;  