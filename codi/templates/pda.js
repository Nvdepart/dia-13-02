function checkPda(state) {
    let idPistola = localStorage.getItem("ID");
    alert("pistola " +idPistola);
    if (idPistola == null){ 
             if (state!=0)
             window.location.href = 'index.html';    
             return false;
    }
    return true;
}
function checkUser() {
    let Name = localStorage.getItem("NAME");
    let UsuId = localStorage.getItem("USUID");
    //alert(idPistola);
    if ((Name == null) || (UsuId == null)){ 
             window.location.href = 'usuario.html';    
             return false;
    }
    return true;
}
function checkIp(state) {
    let IP = localStorage.getItem("IP");
    let Port = localStorage.getItem("PORT");
    alert(IP + Port);
    if ((IP == null) || (Port== null)) { 
        if (state!=0)
        window.location.href = 'ip_port.html';    
         return false;
    }
    return true;
}