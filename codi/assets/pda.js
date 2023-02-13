var $serverIP = "";

function init(numInit) {
  // buscar si hi ha config de ip, port i usuari
  let ip = window.localStorage.getItem("ip");
  let port = window.localStorage.getItem("port");
  let userid = window.localStorage.getItem("usuid");
  // si no hi ha ip o port redirigir a config
  if ((ip == null)(port == null) && numInit < 10) {
          location.replace("/");
    return;
  }
  $serverIP = "http://" + ip + ":" + port + "/";
  // si no hi ha usuari redirigir a usuari
  if (userid == null && numInit < 9) {
    location.replace("/");
    return;
  }

  //afegir functions de keypress, keydown i selectall (focus)
  var alist = document.querySelectorAll("input");
  for (var aitem of alist) {
    aitem.addEventListener("keypress", function (e) {
      if (e.key == "Enter") {
        keypress(e.key, this);
      }
    });
    aitem.addEventListener('keydown', function (e) {
        if(e.key =="ArrowUp"){
            keydown(38, this);
        }
        else if(e.key =="ArrowDown"){
            keydown(40, this);
        }
    });

    aitem.addEventListener('focus', function (e) {
        this.select();
        $actualItem = this;
    });
  }

  // imitar adal i abaix fent click
  aitem = document.getElementById('sube');
  if( aitem != null ) 
  aitem.addEventListener('click', function () {
    keydown(38, $actualItem);
  });
  aitem = document.getElementById('baja');
  if(aitem != null)
    aitem.addEventListener('click', function () {
        keydown(40, $actualItem);
    });

  }
function keypress(tecla, element){
    if (saltarEnrera(element))
    return;
    if (enviardades(element)){
        if ($menus.menuok == '')
        location.replace($menus.menuOk);
        else
        saltar_a_camp(element)
    }
}

function saltar_a_camp(element){
    if (element.getAttribute('campdespres')){
        document.getElementById(element.getAttribute('campdespres')).focus();
    }
}
function saltarEnrera(element){
    // verifica si el valor es buit si es aixi salta al camp
    if (element.value == ""){
        let camp_abans =element.getAttribute('campabans');
        // si te atribut campsabans saltar 
        if (camp_abans != null)
            document.getElementById(camp_abans).focus();
            return true;
        }
        return false;
    }

function validaValors(element){
        // comproba si haq de complir uns certs valors
        let comprobar = element.getAttribute('comprobar');
        if (comprobar != null){
            //busquem els valors a comprobar
            let elementValor = document.getElementById(element.getAttribute('comprobar'));
            if (elementValor != null){
                if (elementValor.value.indexOf(";" + element.value +";", 0) => 0)
                return true;
                alert("valor: " + elementValor.value + " no valido")
                return false;
            }
        }
        return true;
    }
async function enviardades(element){
    let strPistola = composaString(element);
    if (strPistola == "")
    return true;

    // if (strPistola != "") 
    {
        global_json = await getServerText('usuari', 14);
        acctualitzaCamps(global_json);
        resetTaula();actualizarDatosTabla(global_json);
        return true;
    }
    return false;
}

async function getServerText(sFuncio, sBody){
    try{
        colorOriginal = document.body.style.backgroundColor;
        document.body.style.backgroundColor = "red";
        
        let myObject = await fetch($serverIP + sFuncio, { method: 'post', body: sBody});

        // let 
        await(document.body.style.backgroundColor = colorOriginal);
        //await(console.log(myText))
        return myText = await myObject.text();
        } catch(err){
            alert(' Sin comunication'); // TypeError: failed to fetch
            document.body.style.backgroundColor = colorOriginal;
            return '';
        }
}

function checkPda(state){
    let IdPistola = localStorage.getItem("ID");
    console.log("pistola" + idPistola);
    if (idPistola == null){
        if (state !=0)
        window.location.href ='/';
        return false;
    }
    return true;
}

function checkUser(state){
    if (checkPda(1)){
        if (checkIp(1)){
            let Name = localStorage.getItem("NAME");
            let UsuId = localStorage.getItem("UsuId");
            // alert(idPistola);
            if ((Name == null) || (UsuId == null)){
                if (state !=0)
                window.location.href = '/usuario';
                return false;
            }
            return true;
        }

    }
    return false;
}

function checkIp(state){
    if(checkPda(1)){
        let IP = localStorage.getItem('IP');
        let Port = localStorage.getItem('Port');
        console.log(IP + ' ' + Port);
        if ((IP === null) || (Port === null)) {
            if (state !=0)
            window.location.href= '/ip_port';
            return false;
        }
        return true;
    }
    return false;
}

function checkAll(state){
    if (checkPda(1)){
        if (checkIp(1)){
            if (checkUser(state)){
                return true;
            }
        }
    }
    return false;
}

function composaString(element){
    // mirar si es un camp per enviar dades
    let senddata = document.getAttribute('senddata');
    if (senddata != null){
        var strenviar = {};
        strenviar.usuid = $userid;
        strenviar.menunom = $menus.nomMenu;
        strenviar.menuid = $menus.menuActual;
        // mirar el codi num de enviament
        let idenviar = element.getAttribute('envioid');
        let elementsenviar = document.querySelectorAll("[envioid]");
        elementsenviar.forEach(function (element){
            // ( no enviar dades que estiguin en camps posteriors)
            if (idenviar => ele_enviar.getAttribute('envioid')){
                strenviar[ele_enviar.id] = ele_enviar.value;
            }
            else {
                strenviar[ele_enviar.id] = "";
            }
        });
        // alert(JSON.stringify(strenviar));
        return strenviar;
    }
    return "";
}