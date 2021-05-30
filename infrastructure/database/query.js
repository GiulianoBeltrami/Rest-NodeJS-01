const conection = require('./connection');

const executeQuery = (query, parametros = '') => {
    return new Promise((resolve,reject) =>{
        conection.query(query,parametros,(erros,resultados,campos) =>{
            if(erros){
                reject(erros);
            }
            else{
                resolve(resultados);
            }
        });
    });
};

module.exports = executeQuery;