class tables{
    init(connection){
        console.log("[+]Executando criação de tabelas");
        this.connection = connection;

        this.createAtendimentos();
        this.createPets();
    }

    createAtendimentos(){
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos(id INT NOT NULL  AUTO_INCREMENT, cliente VARCHAR(11) NOT NULL, pet VARCHAR(20), servico VARCHAR(20) NOT NULL, data DATETIME NOT NULL , dataCriacao DATETIME NOT NULL, status VARCHAR(20) NOT NULL, observacoes text, PRIMARY KEY(id))';

        this.connection.query(sql, (error)=>{
            if(error){
                console.log(error);
            }
            else{
                console.log('[+]Tabela atendimentos criada com sucesso')
            }
        });
    }

    createPets(){
        const sql = 'CREATE TABLE IF NOT EXISTS Pets(id int NOT NULL AUTO_INCREMENT , nome VARCHAR(50) , imagem VARCHAR(200), PRIMARY KEY (id))';

        this.connection.query(sql, (error)=>{
            if(error){
                console.log(error);
            }
            else{
                console.log('[+]Tabela pets criada com sucesso')
            }
        });
    }
}

module.exports = new tables;