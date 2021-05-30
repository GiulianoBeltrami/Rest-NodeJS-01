const connection = require('../infrastructure/database/connection');
const moment = require('moment');
const axios = require('axios');
const repositorio = require('../repositorios/atendimento');
class Atendimento{

    constructor(){
        this.dateIsValid = ({data,dataCriacao}) => moment(data).isSameOrAfter(dataCriacao);

        this.clientIsValid = ({tamanho})=> tamanho >= 5;

        this.valida = parametros =>this.validations.filter(campo =>{
            const {nome} = campo;
            const parametro = parametros[nome];
            return !campo.valido(parametro);
        });

        this.validations = [
            {
                nome: 'data',
                valido: this.dateIsValid,
                menssagem:'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.clientIsValid,
                menssagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ];
    }

    adciona(atendimento){
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data,'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

        const parameters = {
            data: {data,dataCriacao},
            cliente: {tamanho:atendimento.cliente.length}
        }

        const erros = this.valida(parameters);

        const existemErros = erros.length;

        if(existemErros){
            return new Promise((resolve,reject)=>reject(erros));
        }
        else{
            const atendimentoDatado = {...atendimento,dataCriacao,data};

            return repositorio.adiciona(atendimentoDatado)
            .then( (resultados) => {
                const id = resultados.insertId;
                return {...atendimento, id};
            });
        }    
    }

    lista(){
        return repositorio.lista();
    }

    buscaPorId(id){
        return repositorio.buscaPorId(id); 
    }
        
    altera(id,valores){
        
        if(valores.data){
            valores.data = moment(valores.data,'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        }
       return repositorio.altera(id,valores);
    }

    deleta(id){
        return repositorio.deleta(id);
    }
}

module.exports = new Atendimento;