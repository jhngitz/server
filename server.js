'use strict';

const express = require('express')
const app = express()
const server = require('http').createServer(app).listen(5000)
const io = require('socket.io').listen(server)
const bodyParser = require('body-parser');
  
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	const port = process.env.PORT || 3000;

	const router = express.Router();

/* Vamos colocar nosso Middleware aqui, depois */
	var noMeio = function(req, res, next){
	var token = req.query.token || ''; 
	var loja = req.query.loja || ''; 
	var number = req.query.number || ''; 
	var msg = req.query.msg|| ''; 
	if(token == 'tokencode'){	
		io.emit('notificacao', {loja: ''+loja+'', number: ''+number+'', msg: ''+msg+''});
	console.log(msg);
		next();
	} else {
		res.status(401).json({
			aviso: 'Erro!',
			message: 'Você não possui acesso.'
		})
		}
};

	app.use('/', router);

	router.route('/api') //inserimos noMeio como primeiro parâmetro
		.get(noMeio, function(req, res){
			if(!res.data){ res.data = {}; }
			res.data.message = "success"
			res.json(res.data);
			
	});


	app.listen(port);
	console.log('conectado a porta ' + port);