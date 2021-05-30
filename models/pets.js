const connection = require('../infrastructure/database/connection');
const uploadArquivo = require('../infrastructure/arquivos/uploadDeArquivos');

class pet {
    adiciona(pet,res){
        const sql = 'INSERT INTO Pets SET ?';

        uploadArquivo(pet.imagem,pet.nome,(erro,novoCaminho) => {
            if (erro){
                res.status(400).json(erro);
            }
            else{
                const novoPet = {nome:pet.nome , imagem:novoCaminho}

                connection.query(sql,novoPet, erro =>{
                    if(erro){
                        res.status(400).json({erro});
                    }
                    else{
                        res.status(200).json(novoPet);
                    }
                });
            }
        });
    }
}

module.exports = new pet;