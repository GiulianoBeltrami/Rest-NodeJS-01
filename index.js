const customExpress = require('./config/customExpress');
const connection = require('./infrastructure/database/connection');
const tables = require('./infrastructure/database/tables');

connection.connect(error =>{
    if(error){
        console.log(error);
    }
    else{
        console.log('[+]Conectado com sucesso');

        tables.init(connection);

        const app = customExpress();

        //Initialize express server -> localhost:3000
        app.listen(3000, () => console.log('[+]Servidor rodando na porta 3000'));
    }
});



