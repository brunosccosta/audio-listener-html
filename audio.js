jQuery(document).ready(function(){
    var audio = document.getElementsByTagName("audio")[0];

    jQuery(document).bind('keydown', 'ctrl+p', function(event){
        audio.play();
        event.preventDefault();
    });

    jQuery(document).bind('keydown', 'ctrl+o', function(event){
        audio.pause();
        event.preventDefault();
    });

    var holder = document.getElementById('holder');
    holder.ondragover = function () { this.className = 'hover'; return false; };
    holder.ondragend = function () { this.className = ''; return false; };
    holder.ondrop = function (e) {
      this.className = '';
      e.preventDefault();

      var file = e.dataTransfer.files[0],
          reader = new FileReader();
      reader.onload = function (event) {
        audio.src = event.target.result
      };
      reader.readAsDataURL(file);

      return false;
    };
});
