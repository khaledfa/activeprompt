function firebaseModule(firebaseRoot) {
	var module = {};
	
    module.responses = new Firebase('https://activeprompt.firebaseio.com/' + firebaseRoot);
  
  	function getPromptImageSize() {
    	module.promptImageW = module.promptImage.width();
    	module.promptImageH = module.promptImage.height();
  	}

	$(window).load(function(){
		module.promptImageContainer = $("#prompt_image_container");
		module.promptImage = $('#prompt_image');
	    getPromptImageSize();
	});

    $(window).resize(getPromptImageSize);

	return module;
}

function draggyModule(firebaseId) {
	
	var module = firebaseModule(firebaseId);
	
	var handleImageUrl = '/assets/red_dot.png';
	
  	var halfHandleW,
      	halfHandleH,
      	handle;

	$(window).load(function() {
		var sampleHandle = $('#sample_handle');
		halfHandleW = sampleHandle.width() / 2;
		halfHandleH = sampleHandle.height() / 2;
	});
	
	module.loadTeacherView = function() {
		$(window).load(function() {

		    module.responses.on('child_added', function(snapshot) {
		      var ref = snapshot.ref();

		      jQuery('<img/>', {
		        id: ref.name(),
		        src: handleImageUrl,
		        style: "opacity: 0.7; filter:alpha(opacity=70); z-index: 1; position: absolute",
		        text: snapshot.val().top + ' ' + snapshot.val().left,
		      }).appendTo("#prompt_image_container");

		      ref.on('value', function(snapshot) {
		        var response = $("#" + snapshot.ref().name());

		        if (!!snapshot.val()) {
		          response.text(snapshot.val().top + ' ' + snapshot.val().left);

		          response.css("left", ((snapshot.val().left * module.promptImageW) - halfHandleW) + "px");
		          response.css("top", ((snapshot.val().top * module.promptImageH) - halfHandleH) + "px");
		        } else {
		          response.remove();
		        }
		      });
		    });
		  });
	}
	
	module.loadStudentView = function() {
		var myResponse;
		
  		$(window).load(function() {
    
    		myResponse = module.responses.push();
    		myResponse.removeOnDisconnect();

    		module.promptImageContainer.append("<img id=\"handle\" style=\"z-index: 1; top: 0px; left: 0px; position: absolute\" src=\"" + handleImageUrl + "\" />");
    
    		handle = $('#handle');
    
    		handle.draggable({
      			containment: "#prompt_image_container",
      
      			drag: function(event, ui) {
        			myResponse.set({
          				left: (ui.position.left + halfHandleW) / module.promptImageW,
          				top: (ui.position.top + halfHandleH) / module.promptImageH
        			});
      			}
    		});
  		});
	}

	return module;
}