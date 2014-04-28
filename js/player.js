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
		var listoffiles = new Array();
		alert("called");
		window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) 
		{
		   fileSystem.root.getDirectory("Music/WakeUpSongs", 
		   {
		           create: true
		       }, function(directory) {
		        var directoryReader = directory.createReader();
		        directoryReader.readEntries(function(entries) 
				{
		            var i;
					alert(""+entries.length);
					if(entries.length==0)
					{
						alert("Your TrashPlay-Folder is empty. There is no music to play")
					}
		            for (i=0; i<entries.length; i++) 
					{
						if(i==1)
						{
							alert("-"+i+" "+entries[i].name);
							alert("To uri "+entries[i].toURL());
						}
						//alert(entries[i].toURL());
						listoffiles.push(entries[i].toURL());
		            }
					alert("LENGTH"+listoffiles.length);
		        }, function (error) {
		            alert(error.code);
		        });

		       } );
		}, function(error) {
		   alert("can't even get the file system: " + error.code);
		});
		alert("LENGTH"+listoffiles.length);
        for (i=0; i<listoffiles.length; i++) 
		{
			alert("> "+listoffiles[i]);
        }
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
