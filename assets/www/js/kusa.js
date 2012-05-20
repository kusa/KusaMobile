var connectionType = "Unknown";

/*Device ready*/
document.addEventListener("deviceready", onDeviceReady, false);
 function onDeviceReady() {
     setInterval("checkConnection()", 30000);
     checkConnection();
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
 var fitnessStart = false;
 var fInterval = null;
 
 $(document).bind('pageinit', function(){
	 $("#fitnessPhases li").addClass("hide");
 })
 
 $("#fitnessSave").live("vclick", function(){
	 fitness.saveOption();
 })
 
  $("[name='fitnessStart']").live("vclick", function(){
	 fitness.start();
 })
 

 function fitness() 
 {
	 
 }
 
 fitness.start = function()
 {
	 if (fitnessDef.length == 0) {navigator.notification.alert("Není definován žádný interval");return;}
	 
	 fitnessStart = (fitnessStart?false:true);
	 console.log("fitnessStart " +fitnessStart)
	 if (!fitnessStart) {
		 $("#fitnessPhases li").addClass("hide");
		 $("#fTime").text("00:00");
		 $("#fTime").removeClass("falarm");
		 $("#fstop").addClass("hide");$("#fstart").removeClass("hide");
	 } else {
		 
		 $("#fstop").removeClass("hide");$("#fstart").addClass("hide");
		 fEtap = 0;
		 fSeconds = 0;
		 
		 fitness.runFitness();
	 }
 }
 
 fitness.runFitness = function()
 {
	 if (!fitnessStart) return;
	 clearTimeout(fInterval);
	 console.log("Seconds "+fSeconds);
	 fSeconds++;
	 var virtEtap = fEtap + 1;
	 if (fSeconds > fitnessDef[fEtap] && typeof fitnessDef[virtEtap] != "undefined") {
		 fSeconds = 0;
		 fEtap++;console.log("Stav " +1);
	 } else if (fSeconds > fitnessDef[fEtap] && typeof fitnessDef[virtEtap] == "undefined" && fitnessRepeat) {
		 fSeconds = 0;
		 fEtap = 0;console.log("Stav " +2);
	 }  else if (fSeconds > fitnessDef[fEtap] && typeof fitnessDef[virtEtap] == "undefined" && !fitnessRepeat) {
		 fSeconds = 0;
		 fEtap = 0;console.log("Stav " + 3);
		 $("#fstop").trigger("vclick");
		 clearTimeout(fInterval);
		 return;
	 }
	 
	 
	 for(var x=0;x<fitnessDef.length;x++) {
	
		 $("#fitnessPhases li").eq(x).removeClass("ui-body-c").addClass("ui-body-"+ (x == fEtap?'a':"c") ).text(fitnessDef[x] +" sekund").removeClass("hide");
	 }
	 
	 var minute = parseInt(Math.floor(fSeconds/60));
	 var seconds = (fSeconds-(minute*60));
	 
	 if ((fitnessDef[fEtap]-fSeconds) < 10) $("#fTime").addClass("falarm");
	 else  $("#fTime").removeClass("falarm");
		 
	 if (minute.toString().length < 2) minute = "0" + minute.toString();
	 if (seconds.toString().length < 2) seconds = "0" + seconds.toString();
	 $("#fTime").text(minute + ":"+ seconds);
	 
	 fInterval = setTimeout("fitness.runFitness()", 1000);
 }
 
 fitness.saveOption = function()
 {
	 fitnessDef = [];

	 if (!isNaN(parseInt($("#phase1").val())) && parseInt($("#phase1").val()) != 0) fitnessDef.push(parseInt($("#phase1").val()));
	 if (!isNaN(parseInt($("#phase2").val())) && parseInt($("#phase2").val()) != 0) fitnessDef.push(parseInt($("#phase2").val()));
	 if (!isNaN(parseInt($("#phase3").val())) && parseInt($("#phase3").val()) != 0) fitnessDef.push(parseInt($("#phase3").val()));
	 if (!isNaN(parseInt($("#phase4").val())) && parseInt($("#phase4").val()) != 0) fitnessDef.push(parseInt($("#phase4").val()));
	 
	 fitnessRepeat = ($("#repeat option:selected").eq(0).val() == "on"?true:false);
	 $('.ui-dialog').dialog('close');
 }
 
 fitness.test = function()
 {
	 alert(fitnessDef[0])
 }