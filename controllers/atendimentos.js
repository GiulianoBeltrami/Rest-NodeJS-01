const Atendimento = require('../models/atendimento');

module.exports = app => {
    
    //Creating routes
    app.get('/atendimentos',(req,res) =>{
        Atendimento.lista()
            .then(resultados => res.json(resultados))
            .catch(erros => res.status(400).json(erros));
    });

    app.get('/atendimentos/:id', (req,res) =>{
        const id = parseInt(req.params.id);
        Atendimento.buscaPorId(id)
            .then(resultados => res.json(resultados))
            .catch(erros => res.status(400).json(erros));
    });

    app.post('/atendimentos',(req,res) => {
        Atendimento.adciona(req.body)
            .then(atendimentoCadastrado => res.status(201).json(atendimentoCadastrado))
            .catch(erros => res.status(404).json(erros));
    });

    app.patch('/atendimentos/:id',(req,res) =>{
        const id = parseInt(req.params.id);
        const valores = req.body;
        Atendimento.altera(id,valores)
            .then(resultados => res.json(resultados))
            .catch(erros => res.status(400).json(erros));

    });

    app.delete('/atendimentos/:id',(req,res) => {
        const id = parseInt(req.params.id);
        Atendimento.deleta(id)
            .then(resultados => res.json(resultados))
            .catch(erros => res.status(400).json(erros));
    });
}