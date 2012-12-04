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
      	handle,
      	myResponse;

	module.loadStudentView = function() {
  		$(window).load(function() {
    		var sampleHandle = $('#sample_handle');
    		halfHandleW = sampleHandle.width() / 2;
    		halfHandleH = sampleHandle.height() / 2;
    
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