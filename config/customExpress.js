const express = require('express');
const consign = require('consign');

module.exports = () =>{
    const app = express();
    
    app.use(express.urlencoded({extended : true}));
    app.use(express.json());
    //Custom configuration
    //Create inside app all modules from another file
    consign()
        .include('controllers')
        .into(app);

    return app
}