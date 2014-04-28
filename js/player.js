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
	
	getfiles: function()
	{
		alert("called")
		window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) 
		{
		   fileSystem.root.getDirectory("Download", 
		   {
		           create: true
		       }, function(directory) {

		        var directoryReader = directory.createReader();
		        directoryReader.readEntries(function(entries) 
				{
		            var i;
					alert("entries.length")
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
		alert('Received Event: ' + id);
				
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
		var appname = document.getElementById("appname");

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
		appname.setAttribute('style', 'display:none;');

		player.getfiles();
        //console.log('Received Event: ' + id);
    }
}
