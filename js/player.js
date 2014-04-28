var player = {
	
    // Application Constructor
    initialize: function() {
		//console.log("initialize");
        this.bindEvents();
    },
	
    bindEvents: function() {
		//console.log("binding");
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
	
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() 
	{
		//console.log("on Ready");
        player.receivedEvent('deviceready');
    },
	
	getfiles: function()
	{
		alert("called")
		window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
		function gotFS(fileSystem) {
		    alert("got filesystem"); 
		    alert(fileSystem.root.fullPath);   
		}
		function fail() {
		   alert("failed to get filesystem");
		}
		//http://stackoverflow.com/questions/8298124/list-files-inside-www-folder-in-phonegap
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
		   fileSystem.root.getDirectory("Downloads", {
		           create: true
		       }, function(directory) {

		        var directoryReader = directory.createReader();
		        directoryReader.readEntries(function(entries) {
		            var i; 
		            for (i=0; i<entries.length; i++) {
		                alert(entries[i].name);
		            }
		        }, function (error) {
		            alert(error.code);
		        });

		       } );
		}, function(error) {
		   alert("can't even get the file system: " + error.code);
		});
	},
	
    // Update DOM on a Received Event
    receivedEvent: function(id) 
	{
		//console.log('Received Event: ' + id);
				
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
		var appname = document.getElementById("appname");

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:none;');
		appname.setAttribute('style', 'display:none;');

		player.getfiles();
        //console.log('Received Event: ' + id);
    }
}
