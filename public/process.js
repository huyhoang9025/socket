//var socket = io("https://hoang-socket.herokuapp.com/client");
var socket = io("localhost:3000/client");
var x;
$(document).ready(function(){
    
    $("#CREATE-ROOM").click(function(){
        x = $("#ROOM-NAME").val();
        socket.emit("CREATE-ROOM", x);
        
        socket.on('CREATE-RIGHT-ROOM',function(data){
             alert(data);
        });
        
        socket.on('CREATE-WRONG-ROOM',function(data){
             alert(data);
        });
        
        socket.on('SERVER-SEND-CLIENT',function(data){
        
            var state = (data.split(","));
            for(i=0; i<5; i++){

                switch(i){
                    case 0: 
                        if(state[i] == 0){
                            document.getElementById("status0").innerHTML="<b>ON</b>";
                        }
                        else{
                            document.getElementById("status0").innerHTML="OFF";
                        }
                    case 1: 
                        if(state[i] == 0){
                            document.getElementById("status1").innerHTML="<b>ON</b>";
                        }
                        else{
                            document.getElementById("status1").innerHTML="OFF";
                        }
                    case 2: 
                        if(state[i] == 0){
                            document.getElementById("status2").innerHTML="<b>ON</b>";
                        }
                        else{
                            document.getElementById("status2").innerHTML="OFF";
                        }
                    case 3: 
                        if(state[i] == 0){
                            document.getElementById("status3").innerHTML="<b>ON</b>";
                        }
                        else{
                            document.getElementById("status3").innerHTML="OFF";
                        }
                    case 4: 
                        if(state[i] == 0){
                            document.getElementById("status4").innerHTML="<b>ON</b>";
                        }
                        else{
                            document.getElementById("status4").innerHTML="OFF";
                        }
                }
            }
        });

    $("#device0").click(function() {
        if(this.checked){
            data = x + " " + "0 1";
            document.getElementById("off0").innerHTML="<b>ON</b>";
        }
        else {
            data = x + " " + "0 0";
            document.getElementById("off0").innerHTML="OFF";
        }     
        socket.emit("CLIENT-SEND-SERVER",data);
    });
    
    $("#device1").click(function() {
       if(this.checked){
            data = x + " " + "1 1";
            document.getElementById("off1").innerHTML="<b>ON</b>";
        }
        else {
            data = x + " " + "1 0";
            document.getElementById("off1").innerHTML="OFF";
        }
        socket.emit("CLIENT-SEND-SERVER",data);
    });
    
    $("#device2").click(function() {
        if(this.checked){
            data = x + " " + "2 1";
            document.getElementById("off2").innerHTML="<b>ON</b>";
        }
        else {
            data = x + " " + "2 0";
            document.getElementById("off2").innerHTML="OFF";
        }
        socket.emit("CLIENT-SEND-SERVER",data);
    });
    
    $("#device3").click(function() {
        if(this.checked){
            data = x + " " + "3 1";
            document.getElementById("off3").innerHTML="<b>ON</b>";
        }
        else {
            data = x + " " + "3 0";
            document.getElementById("off3").innerHTML="OFF";
        }
        socket.emit("CLIENT-SEND-SERVER",data);
    });
    
    $("#device4").click(function() {
        if(this.checked){
            data = x + " " + "4 1";
            document.getElementById("off4").innerHTML="<b>ON</b>";
        }
        else {
            data = x + " " + "4 0";
            document.getElementById("off4").innerHTML="OFF";
        }
        socket.emit("CLIENT-SEND-SERVER",data);
    });
});
});

