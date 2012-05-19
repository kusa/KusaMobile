var connectionType = "Unknown";

/*Device ready*/
document.addEventListener("deviceready", onDeviceReady, false);
 function onDeviceReady() {
     setInterval("checkConnection()", 30000);
     checkConnection()
 }

 /** Connection **/
 function checkConnection()
 {
     var networkState = navigator.network.connection.type;

     var states = {};
     states[Connection.UNKNOWN]  = 'Unknown connection';
     states[Connection.ETHERNET] = 'Ethernet connection';
     states[Connection.WIFI]     = 'WiFi connection';
     states[Connection.CELL_2G]  = 'Cell 2G connection';
     states[Connection.CELL_3G]  = 'Cell 3G connection';
     states[Connection.CELL_4G]  = 'Cell 4G connection';
     states[Connection.NONE]     = 'No network connection';

     connectionType = states[networkState];
     $(".connection span").text(connectionType);
     if (networkState == Connection.NONE)
    	 $(".connection span").attr("class", "none");
     else
    	 $(".connection span").attr("class", "");
 }

 /** Fitness **/
 var fitnessDef = []; /*Pocet sekund pro kazdou fazy*/
 var fitnessRepeat = false; /*Opakovani cyklu*/
 
 $("#fitnessSave").live("vclick", function(){
	 fitness.saveOption();
 })
 
  $("#fitnessStart").live("vclick", function(){
	 fitness.start();
 })
 

 function fitness() 
 {
	 
 }
 
 fitness.start = function()
 {
	 fitness.test()
 }
 
 fitness.saveOption = function()
 {
	 fitnessDef = [];

	 if (!isNaN($("#phase1").val()) && parseInt($("#phase1").val()) != 0) fitnessDef.push(parseInt($("#phase1").val()));
	 if (!isNaN($("#phase2").val()) && parseInt($("#phase2").val()) != 0) fitnessDef.push(parseInt($("#phase2").val()));
	 if (!isNaN($("#phase3").val()) && parseInt($("#phase3").val()) != 0) fitnessDef.push(parseInt($("#phase3").val()));
	 if (!isNaN($("#phase4").val()) && parseInt($("#phase4").val()) != 0) fitnessDef.push(parseInt($("#phase4").val()));
	 
	 fitnessRepeat = ($("#repeat option:selected").eq(0).val() == "on"?true:false);
	 $('.ui-dialog').dialog('close');
 }
 
 fitness.test = function()
 {
	 alert(fitnessDef[0])
 }