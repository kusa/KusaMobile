var connectionType = "Unknown";

/*Device ready*/
document.addEventListener("deviceready", onDeviceReady, false);
 function onDeviceReady() {
     setInterval("checkConnection()", 30000);
     checkConnection()
 }

 /** Connection **/
 function checkConnection() {
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
