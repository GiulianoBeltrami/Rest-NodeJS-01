const connection = require('../infrastructure/connection');
const moment = require('moment');
const axios = require('axios');

class Atendimento{
    adciona(atendimento,res){
        const sql = 'INSERT INTO atendimentos SET ?';

        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data,'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

        const dateIsValid = moment(data).isSameOrAfter(dataCriacao);
        const clientIsValid = atendimento.cliente.length >= 5;

        const validations = [
            {
                nome: 'data',
                valido: dateIsValid,
                menssagem:'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clientIsValid,
                menssagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ];

        const erros = validations.filter(campo => !campo.valido);

        const existemErros = erros.length;

        if(existemErros){
            res.status(400).json(erros)
        }
        else{
            const atendimentoDatado = {...atendimento, dataCriacao, data}

            connection.query(sql,atendimentoDatado,(error,results)=>{
                if(error){
                    res.status(400).json(error);
                }
                else{
                    res.status(201).json(results);
                }
            });
        }
    }

    lista(res){
        const sql = 'SELECT * FROM atendimentos';

        connection.query(sql, (erro,resultados) => {
            if (erro){
                res.status(400).json(erro);
            }
            else{
                res.status(200).json(resultados);
            }
        
        });
    }

    buscaPorId(id,res){
        const sql = `SELECT * FROM atendimentos WHERE id=${id}`;
        
        connection.query(sql,async (erro,resultados) =>{
            //const atendimento = resultados[0];
            const cpf = resultados.cliente;

            if(erro){
                res.status(400).json(erro);
            }
            else{
                const {data} = await axios.get(`http://localhost:8082/${cpf}`);
                resultados.cliente = data;
                res.status(200).json(resultados);
            }

        });
    }
        
    altera(id,valores,res){
        const sql = 'UPDATE atendimentos SET ? WHERE id=?';

        if(valores.data){
            valores.data = moment(valores.data,'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        }
       
        connection.query(sql,[valores,id],(erro,resultados) =>{
            if(erro){
                res.status(400).json(erro);
            }
            else{
                res.status(200).json({...valores,id});
            }
       });
    }

    //DELETE FROM Customers WHERE CustomerName='Alfreds Futterkiste';
    deleta(id,res){
        const sql = 'DELETE FROM atendimentos WHERE id=?';

        connection.query(sql,id,(erro,resultados) => {
            if(erro){
                res.status(400).json(erro);
            }
            else{
                res.status(200).json(resultados);
            }
        });
    }
}

module.exports = new Atendimento;