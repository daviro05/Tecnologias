var i=0;
var j=0;
var puntos=0;
var puntos_letras=0;
var puntos_ciencias=0;
var bandera=0;
leerPuntuacion()

var pre = ["./preguntas/trivial.xml", "./preguntas/trivial2.xml"];
var num = suerte();
var modo_juego=" ";

function modo(cadena){
	if(cadena == "disney"){
		pre = ["./preguntas/disney.xml"];
		num = 0;
		modo_juego = "disney";
		document.getElementById('modos').innerHTML="<span id='m_disney'>Modo DISNEY</span>";
	}
	if(cadena == "clasico"){
		pre = ["./preguntas/trivial.xml", "./preguntas/trivial2.xml"];
		num = suerte();
		document.getElementById('modos').innerHTML="<span id='m_clasico'>Modo CLÁSICO</span>";
	}

	ocultar();
}

function ocultar(){
	var elems = document.getElementsByClassName('b_modo');
	for (var i=0;i<elems.length;i++){
  		elems[i].style.display = 'none';
	}
}

function muestra_info(){
	ocultar();
	if(modo_juego==" ")
			document.getElementById('modos').innerHTML="<span id='m_clasico'>Modo CLÁSICO</span>";

	document.getElementById("botoncomprobar").style.display="inline";
	document.getElementById("botonterminar").style.display="inline";
	document.getElementById("texto").style.display="inline";
	document.getElementById("respuesta").style.display="none";
	
	document.getElementById("botonsiguiente").style.display="none";
	document.getElementById("botonempezar").style.display="none";
	
	if(bandera>1)
	{
		return;
		window.location.reload();
	}

	if(window.XMLHttpRequest)
	{
		xhttp=new XMLHttpRequest();
	}
	else
	{
		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xhttp.open("GET",pre[num],false);
	xhttp.send("");
	var fichero=xhttp.responseXML;
	var clase=fichero.getElementsByTagName("pregunta");
	var enunciado=fichero.getElementsByTagName("enunciado");
	var respuesta=fichero.getElementsByTagName("respuesta");
	
	if((document.getElementById('texto').value=="") && i>0)
	{
		alert("Debes contestar");
	}
	else
	{
		texto=enunciado[i].childNodes[0].nodeValue;
		document.getElementById('pregunta').innerHTML=texto;
		i++;
		document.getElementById('texto').value="";
	}
	
	if(i>0 && i<2)
	{
		bandera+=1;
	}
	
}

function suerte() {
	var aleatorio = Math.round(Math.random()*1);
	return aleatorio;
}

function limpiarTildes(cadena){
   cadena = cadena.replace(/á/gi,"a");
   cadena = cadena.replace(/é/gi,"e");
   cadena = cadena.replace(/í/gi,"i");
   cadena = cadena.replace(/ó/gi,"o");
   cadena = cadena.replace(/ú/gi,"u");
   return cadena;
}

function acabar()
{	
	var r = confirm("Seguro que quieres terminar la partida?");
	if(r){
		guardarPuntuacion();
		window.location.reload();
	}
}

function siguiente()
{
	if(document.getElementById('texto').value != ""){
		document.getElementById("texto").disabled=false;
		document.getElementById("respuesta").innerHTML="";
		muestra_info();
	}
}

function comprobar()
{
	if(document.getElementById('texto').value != "")
		document.getElementById("texto").disabled=true;
	
	if(i<=0)
	{
		alert("Debes empezar la partida!");
		return;		
	}
	
	if(window.XMLHttpRequest)
	{
		xhttp=new XMLHttpRequest();
	}
	else
	{
		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET",pre[num],false);
	xhttp.send("");
	var fichero=xhttp.responseXML;
	//var clase=fichero.getElementsByTagName('pregunta');
	var enunciado=fichero.getElementsByTagName("enunciado");
	var respuesta=fichero.getElementsByTagName("respuesta");
	var contesta = document.getElementById('texto').value;
	
	var buena = respuesta[j].childNodes[0].nodeValue.toUpperCase();
	contesta = limpiarTildes(contesta);

	if(contesta =="" && i>0)
	{
		alert("Debes contestar!");
		return;
	}
	
	if(buena == contesta.toUpperCase() || contesta.toUpperCase().indexOf(buena) != -1)
	{
		puntos+=10;
		document.getElementById('puntos').innerHTML=puntos;
		if(i<14)
			puntos_ciencias+=10;
		if(i>13)
			puntos_letras+=10;
			
		document.getElementById("respuesta").style.display="inline";
		document.getElementById("respuesta").innerHTML="Correcto";
		document.getElementById("respuesta").className="correcta";
		j++;
		document.getElementById("botoncomprobar").style.display="none";
		document.getElementById("botonsiguiente").style.display="inline";
	}
	else
	{
		document.getElementById("respuesta").style.display="inline";
		document.getElementById("respuesta").innerHTML="Incorrecto, la respuesta es: "+respuesta[j].childNodes[0].nodeValue;
		document.getElementById("respuesta").className="incorrecta";
		j++;
		document.getElementById("botoncomprobar").style.display="none";
		document.getElementById("botonsiguiente").style.display="inline";
	}
	
	if(i>=0 && i<=13)
	{
			document.getElementById('pciencia').innerHTML="Ciencias: "+puntos_ciencias+" puntos";
	}
	else if(i>13)
	{
			document.getElementById('pletras').innerHTML="Letras: "+puntos_letras+" puntos";
	}
}

function guardarPuntuacion(){
	//Mediante esta funcion enviamos los datos a la funcion de php de guardar.php
    //var person = prompt("Introduce tu nombre (Máx 8 caracteres)", "");
      var person=prompt("Introduce tu nombre (Máx 8 caracteres)","");
      while(person.length > 8)
      {
         alert("No más de 8 caracteres")
         person=prompt("Introduce tu nombre (Máx 8 caracteres)","");
      }


    if(person!=null)
	{
	    $.ajax({
	       url: "guardar.php",
	       type: "post",
	       data: {"persona" : "<span class=nombre_jugador>"+person+"</span>", 
		   "puntos" :"<span class=tit>Ciencias: </span><span class=puntosp>"+puntos_ciencias+"</span><span class=tit>Letras: </span><span class=puntosp>"+puntos_letras+
		   "</span><span class=tit>Total: </span><span class=puntosp>"+puntos+"</span><br>"},
	       	       success: function(data){
	       	           //$("#puntuaciones").text(data);'
	       }
	    });
	}
}

function leerPuntuacion(){

    $.ajax({
       url: "leer.php",
       type: "post",
       data: "data",
       success: function(data){
           $("#puntuaciones").html(data);
       }
    });
}

$(document).ready(function(){
		var texto = "Mostrar Puntuaciones";
		$(".arrow").on( "click", function() {
			$('#puntuaciones').toggle(); //muestro mediante clase
			if(texto=="Mostrar Puntuaciones"){
				texto = "Ocultar Puntuaciones";
			}
			else
				texto = "Mostrar Puntuaciones";
			$(".arrow").attr('value', texto);
			
		 });
});