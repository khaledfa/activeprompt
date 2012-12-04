var halfHandleW,
    halfHandleH,
    promptImage,
    promptImageW,
    promptImageH,
    responses,
    handle,
    myResponse;

function getPromptImageSize() {
  promptImageW = promptImage.width();
  promptImageH = promptImage.height();
}

$(window).load(function() {
  var sampleHandle = $('#sample_handle');
  halfHandleW = sampleHandle.width() / 2;
  halfHandleH = sampleHandle.height() / 2;
  
  promptImage = $('#prompt_image');
  getPromptImageSize();
  $(window).resize(getPromptImageSize);
})

function studentSetup(firebaseId) {
  $(window).unload(function() {
    myResponse.remove();
  });
  
  $(window).load(function() {
    responses = new Firebase('https://activeprompt.firebaseio.com/'+firebaseId);
    myResponse = responses.push();
    
    $("#prompt_image_container").append("<img id=\"handle\" style=\"z-index: 1; top: 0px; left: 0px; position: absolute\" src=\"/assets/red_dot.png\"/>");
    
    handle = $('#handle');
    
    handle.draggable({
      containment: "#prompt_image_container",
      
      drag: function(event, ui) {
        myResponse.set({
          left: (ui.position.left + halfHandleW) / promptImageW,
          top: (ui.position.top + halfHandleH) / promptImageH
        });
      }
    });
  });
}

function teacherSetup(firebaseId) {
  $(window).load(function() {
    responses = new Firebase('https://activeprompt.firebaseio.com/'+firebaseId);
    
    responses.on('child_added', function(snapshot) {
      var ref = snapshot.ref();
      
      jQuery('<img/>', {
        id: ref.name(),
        src: "/assets/red_dot.png",
        style: "opacity: 0.7; filter:alpha(opacity=70); z-index: 1; position: absolute",
        text: snapshot.val().top + ' ' + snapshot.val().left,
      }).appendTo("#prompt_image_container");
      
      ref.on('value', function(snapshot) {
        var response = $("#" + snapshot.ref().name());
        
        if (!!snapshot.val()) {
          response.text(snapshot.val().top + ' ' + snapshot.val().left);
          
          response.css("left", ((snapshot.val().left * promptImageW) - halfHandleW) + "px");
          response.css("top", ((snapshot.val().top * promptImageH) - halfHandleH) + "px");
        } else {
          response.remove();
        }
      });
    });
  });
}