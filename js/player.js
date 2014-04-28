var player = {
	
    // Application Constructor
    initialize: function() 
	{
		alert("initialize");
        this.bindEvents();
    },
	
    bindEvents: function() {
		alert("binding");
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
	
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() 
	{
		alert("on Ready");
        player.receivedEvent('deviceready');
    },
	
	findmp3s: function(filesystem)
	{
		alert("find files");
	    fileSystem.root.getDirectory("Downloads", 
		{
	     	create: true
	    }, 
		function(directory) 
		{
			alert("function(directory)");
	         var directoryReader = directory.createReader();
	         directoryReader.readEntries(function(entries) 
			 {
				 alert("entries length"+entries.length);
	             var i;
	             for (i=0; i<entries.length; i++) 
				 {
	                 alert(entries[i].name);
	             }
	         }, 
			 function (error) 
			 {
	             alert(error.code);
	         });

		 });
		 alert("DONE...")
	},
	
	getfiles: function()
	{
		alert("called")
		window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
		function gotFS(fileSystem) {
		    alert("got filesystem"); 
		    alert(fileSystem.root.fullPath);   
			player.findmp3s(filesystem);
		}
		function fail() {
		   alert("failed to get filesystem");
		}
		window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
		//http://stackoverflow.com/questions/8298124/list-files-inside-www-folder-in-phonegap
	},
	
	
    // Update DOM on a Received Event
    receivedEvent: function(id) 
	{
		alert('Received Event: ' + id);
				
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
