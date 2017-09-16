
var http = require('http'),
	express  = require('express'),
	bodyParser   = require('body-parser');

var multer = require('multer'); 
const pg    = require('pg');

pg.defaults.ssl = true;
var conString = "postgres://fdeoarftywhsep:a297f182dd4f8b4f4ddb3cf22b21d412d20351d47aa99731f99a769d697ee83e@ec2-23-23-227-188.compute-1.amazonaws.com:5432/d6219mkvfnfmum";

var express = require('express');
var http = require('http'),
    formidable = require('formidable'),
    util = require('util'),
    fs   = require('fs-extra');
function permitirCrossDomain(req, res, next) {
  //en vez de * se puede definir SÓLO los orígenes que permitimos
  res.header('Access-Control-Allow-Origin', '*'); 
  //metodos http permitidos para CORS
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));
app.use(permitirCrossDomain);
app.get('/listarCuentoPorUsuario/:id', (req, res) => {
   
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query('SELECT * FROM cuento WHERE idusuario='+ req.params.id +';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);
            
           
        });
        
    });
    
   
});


app.put('/editarCuento', (req, res, next) => {
    var client = new pg.Client(conString);
     //console.log("miau "+util.inspect(req,false,null));
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query("UPDATE cuento SET nombre='"+ req.body.cuento.nombre +"',descripcion='"+ req.body.cuento.descripcion +"',creditos='"+ req.body.cuento.credito +"' WHERE idcuento="+ req.body.idcuento +";", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);
            
           
        });
        
    });
    
   
});


app.delete('/eliminarPagPorId', (req, res, next) => {
    var client = new pg.Client(conString);
     //console.log("miau "+util.inspect(req,false,null));
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query("DELETE FROM cuento WHERE idcuento="+ req.body.idcuento +";", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);
            
           
        });
        
    });
    
   
});

app.delete('/eliminarPregPorId', (req, res, next) => {
    var client = new pg.Client(conString);
     //console.log("miau "+util.inspect(req,false,null));
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query("DELETE FROM cuento WHERE idcuento="+ req.body.idcuento +";", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);
            
           
        });
        
    });
    
   
});


app.get('/listarCuentoPorId/:id', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query('SELECT * FROM cuento WHERE idcuento='+ req.params.id +';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);
            
           
        });
        
    });
    
   
});

app.get('/listarUsuarios', (req, res, next) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM usuario', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});


app.get('/listarPreguntas/:id', (req, res, next) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM pregunta WHERE idcuento='+req.params.id+';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            //console.log(result);
            client.end();
            return res.json(result.rows);
            
           
        });
        
    });
    
   
});

app.post('/listarImg/:id', (req, res) => {
    var client = new pg.Client(conString);
    //console.log("miau "+util.inspect(req,false,null));
    //console.log("chibi: "+req.body.idcuento);
    var idcuento=req.params.id;
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM pagina WHERE idcuento=' + idcuento + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
             client.end();
            return res.json(result.rows);
            
           
        });
        
    });
    
   
});

app.post('/guardarCuento', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
        client.query("INSERT INTO  cuento  (nombre ,  descripcion ,  creditos ,  idusuario) VALUES ('"+req.body.nombre+"', '"+req.body.descripcion+"', '"+req.body.credito+"', 1);", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            client.end();
            return res.json(result);
        });
        
    });
    
    
   
   
});

app.post('/guardarPregunta', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
        //console.log("nombre "+req.body.nombre+', descrip '+req.body.descripcion+', credito'+req.body.credito);
        client.query("INSERT INTO  pregunta  (img1 ,  img2 ,  audio ,  respuesta , idcuento) VALUES ('"+req.body.pregunta.img1+"', '"+req.body.pregunta.img2+"', '"+req.body.pregunta.audio+"', '"+req.body.pregunta.respuesta+"',"+req.body.id+");", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            client.end();
            return res.json(req.body);
        });
        
    });
    
    
   
   
});
app.get('/ultimoid', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        client.query('SELECT idcuento FROM cuento ORDER BY idcuento DESC ;', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            console.log("mi: "+result.rows[0].idcuento);
            client.end();
            return res.json(result.rows);
            
            
        });
        
        
    });
   
   
});

app.post('/insertarImg', (req, res) => {
    //console.log("miau "+util.inspect(req,false,null));
    //console.log("img "+req.body.paginas.length);
    var id=req.body.id;
    var client = new pg.Client(conString);
    client.connect(function(err) {
        client.query("INSERT INTO pagina(imagen ,  audio ,  idcuento ) VALUES ('"+ req.body.imagen +"', '"+ req.body.audio +"', '"+ id +"');", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
           
            client.end();
            return res.json(result.rows);
            
            
        });
        
        
    });

});



app.delete('/eliminarPreguntasPorCuento', (req, res) => {
    var client = new pg.Client(conString);
     var idcuento=req.body.idcuento;
    
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query('DELETE FROM pregunta WHERE idcuento=' + req.body.idcuento + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);
        });
    });
});

app.delete('/eliminarPaginasPorCuento', (req, res) => {
    var client = new pg.Client(conString);
     var idcuento=req.body.idcuento;
    
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query('DELETE FROM pagina WHERE idcuento=' + req.body.idcuento + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result);
        });
    });
});

app.delete('/eliminarCuento',(req,res)=>{
     var client = new pg.Client(conString);
     var idcuento=req.body.idcuento;
    
     client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('DELETE FROM cuento WHERE idcuento=' + idcuento + ';', function(err, result) {
            
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
             client.end();
            return res.json(result);
        });
    });
});


//Usuario para actualizar y eliminar
app.get('/mostrarUsuario/:id',(req,res)=>{
     var client = new pg.Client(conString);
     var idusuario=req.params.id;
    
     client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM usuario WHERE idusuario=' + idusuario + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
             client.end();
            return res.json(result.rows);
        
        });
        
    });
    
    
});

app.put('/actualizarUsuario',(req,res)=>{
     var client = new pg.Client(conString);
     var idusuario=req.body.idusuario;
    

    
     client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("UPDATE usuario SET usuario ='"+req.body.usuario+"', pass='"+req.body.pass+"', nombre='"+req.body.nombre+"' WHERE idusuario='" + idusuario + "';", function(err, result) {
            
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
             client.end();
            return res.json(result);
        });
    });
    
    
});

app.delete('/eliminarUsuario',(req,res)=>{
     var client = new pg.Client(conString);
     var idusuario=req.body.idusuario;
    
     client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('DELETE FROM usuario WHERE idusuario=' + idusuario + ';', function(err, result) {
            
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
             client.end();
            return res.json(result);
        });
    });
    
    
});


app.get('/', function(req, res) {
    res.sendfile('index.html');
});


app.post('/GuardarUsuario', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        console.log("miau "+util.inspect(req,false,null));
        
        client.query("INSERT INTO  usuario  (usuario ,  pass ,  nombre ) VALUES ('"+req.body.usuario+"', '"+req.body.pass+"', '"+req.body.nombre+"');", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);
            
        });
        
    });
});

app.post('/subir', (req, res) => {
    req.fields; // contains non-file fields 
    req.files; // contains files 
    var form = new formidable.IncomingForm();
 
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});

    });

    form.on('end', function(fields, files) {
        /* Temporary location of our uploaded file */
        var temp_path = this.openedFiles[0].path;
        /* The file name of the uploaded file */
        var file_name = this.openedFiles[0].name;
        /* Location where we want to copy the uploaded file */
        var new_location = 'public/images/cuentos/';
        fs.copy(temp_path, new_location + file_name, function(err) {  
            if (err) {
                console.error(err);
            } else {
                console.log("success!")
            }
        });
        res.end(file_name);
    });
    

});


console.log("Servidor iniciado");
    // escuchar
    app.listen(process.env.PORT || 8080, function(){console.log("the server is running");});

