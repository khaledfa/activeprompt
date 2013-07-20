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

function draggyModule(studentUrl) {
	
  var module = firebaseModule(studentUrl),
      handleImageUrl = '/assets/red_dot.png',
      halfHandleW,
      halfHandleH,
      handle;
  
  $(window).load(function() {
    var sampleHandle = $('#sample_handle');
    halfHandleW = sampleHandle.width() / 2;
    halfHandleH = sampleHandle.height() / 2;
  });
  
  function makeHandle() {
    return jQuery('<img/>', {
     src: handleImageUrl,
   });
  }
  
  module.loadTeacherView = function() {
    $(window).load(function() {
      module.responses.on('child_added', function(snapshot) {
        var handle = makeHandle();
        handle.attr('style', "opacity: 0.7; filter:alpha(opacity=70); z-index: 1; position: absolute");
        handle.appendTo(module.promptImageContainer);

        snapshot.ref().on('value', function(snapshot) {
          if (!!snapshot.val()) {
            handle.css("left", ((snapshot.val().left * module.promptImageW) - halfHandleW) + "px");
            handle.css("top", ((snapshot.val().top * module.promptImageH) - halfHandleH) + "px");
          } else {
            handle.remove();
          }
        });
      });
      
      // Clicking on the body hides the tools window, clicking inside the tools
      //  window doesn't hide it. Clicking on the tools button toggles the
      //  tools window.
      $('body').click(function() { $('#toolsWindow').hide() });
      $('#toolsWindow').click(function(event) { event.stopPropagation(); });
      $('#toolsButton').click(function(event) {
        $('#toolsWindow').toggle();
        // Don't let this click count as a <body> click for closing the tools.
        event.stopPropagation();
      });
      
      // Tool window functions
      $('#clearOld').click(function() {
        module.responses.remove();
      });
      $('#editText').click(function() {
        var edit = $(this);
        var newText = prompt("Enter a new prompt:\nDrag the red dot to...",
          edit.data('current'));
        
        if (newText !== null) {
          $.ajax({
            type: 'POST',
            url: '/prompts/'+edit.data('id'),
            data: {
              '_method': 'put',
              'prompt[text]': newText
            },
            dataType: 'text' // So we don't interpret any HTML
          }).always(function() {
            // We do this even if it fails, because most failures should result
            //  from bad network connectivity. Reloading should make that
            //  obvious to the user if it fails, and is halfway a cop-out to
            //  avoid needing to explain the issue.
            // Of course, if everything works, this will update the text and
            //  somewhat indicate that a page reload might be beneficial for
            //  the student pages (which won't have the updated text if they
            //  were loaded earlier).
            document.location.reload();
          });
        }
      });
      $('#studentView').click(function() {
        window.open('/'+studentUrl, '_blank')
      });
   });
  }
  
  module.loadStudentView = function() {
    var myResponse,
        myLeft = 0,
        myTop = 0;
    
    $(window).load(function() {
      myResponse = module.responses.push();
      
      var handle = makeHandle();
      handle.attr('style', "z-index: 1; top: 0px; left: 0px; position: absolute");
      handle.attr('id', 'handle');
      module.promptImageContainer.append(handle);
      
      handle.draggable({
        containment: "#prompt_image_container",
        drag: function(event, ui) {
          myLeft = (ui.position.left + halfHandleW) / module.promptImageW;
          myTop = (ui.position.top + halfHandleH) / module.promptImageH;
          myResponse.set({ left: myLeft, top: myTop });
        }
      });
      
      myResponse.on('value', function(snapshot) {
        if (!snapshot.val()) {
          myResponse.set({ left: myLeft, top: myTop });
        }
      });
    });
  }
  
  return module;
}
