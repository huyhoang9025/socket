
var express = require("express");               //su dung thu vien express
var app = express();                            //tao doi tuong app trong express
app.use(express.static("public"));              //su dung thu muc public de chua cac du lieu, noi nguoi dung co the truy cap
app.set("view engine", "ejs");                  //su dung thu vien EJS de xu ly va tra cac trang HTML ve trinh duyet
app.set("views", "./views");                    //duong dan toi thu muc view chua trang se tra ve trinh duyet

var ip = require("ip");                         //su dung thu vien ip
                                             
var http = require("http").Server(app);         //su dung thu vien http
                                   
var io = require("socket.io")(http);            //su dung thu vien socketio

var PORT = process.env.PORT || 3000;            

var esp_nsp = io.of('/esp8266');
var client_nsp = io.of('/client');

http.listen(PORT, function(){                       //listen port 3000 hoac port cua moi truong heroku
    console.log("Server Run at: " +ip.address() + ":" + PORT);
});

var tempo;
var tempi=[];
var status;
var control = ["0", "0", "0", "0", "0"];
var state = [1, 1, 1, 1, 1];
var n=0;
var room = "default";

esp_nsp.on("connection", function(socket){                  //nhan biet ket noi cua ESP
    
    console.log("ESP CONNECTED: " + socket.id );    
    socket.join(room);
    socket.on('ESP-SEND-SERVER', function(data) {           //bat su kien tu ESP
//        console.log(data);

        tempi[0] = data.Local;                              //tach chuoi json nhan tu ESP
        tempi[1]= data.Status;                         
        
        if (state[tempi[0]] != tempi[1]){
            state[tempi[0]] = tempi[1];                     //cap nhat mang state neu co su thay doi
        var a = state.toString();
        console.log(a);
        client_nsp.to(room).emit('SERVER-SEND-CLIENT', a);  //gui du lieu cho client HTML
        }      
    });
});
client_nsp.on("connection", function(socket){               //nhan biet ket noi cua HTML
    
    console.log("CLIENT CONNECTED: " + socket.id );
    
    socket.on("CREATE-ROOM",function(x){
        if (x == "2018"){
            room = x;
            console.log('CLIENT JOIN ROOM CONTROL');
            socket.join(room);
            console.log(socket.adapter.rooms);
            client_nsp.to(room).emit('CREATE-RIGHT-ROOM', 'HELLO ' + x + '! YOU CAN CONTROL!');
            
            var a = state.toString();
            console.log(a);
            client_nsp.to(room).emit('SERVER-SEND-CLIENT', a);
            
            socket.on("CLIENT-SEND-SERVER", function(data){     //bat su kien tu HTML

                console.log("Receive Control " + data);        //xuat du lieu de debug
                tempo = (data.split(" "));                      //tach du lieu thanh cac phan tu cach nhau boi dau " "
                console.log(tempo[0]);
                console.log(tempo[1]);
                console.log(tempo[2]);
                if (tempo[0] == x){
                    control[tempo[1]] = tempo[2];                   //cap nhat mang control
            
                    var json = {                                    //tao chuoi json gom 2 bien dieu khien
                        local: tempo[1],
                        status: tempo[2]  
                    };
                    
                    esp_nsp.emit('SERVER-SEND-ESP', json);          //gui chuoi json ve ESP 
                }
            });
        }
        else{
            client_nsp.emit('CREATE-WRONG-ROOM','SORRY ' + x + '!PLEASE CONFIRM EXACTLY USER!');
        }
    });
});
app.get("/", function(req, res){                             //duong dan de truy cap trang tra ve trinh duyet
    res.render("trangchu");
});