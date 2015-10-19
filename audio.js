jQuery(document).ready(function(){
    var localStorageKey = 'texto';

    if (localStorage.getItem(localStorageKey)) {
        $("#text").val(localStorage.getItem(localStorageKey));
    }

    $("#text").keyup(function() {
        localStorage.setItem(localStorageKey, $("#text").val());
    });

    var audio = document.getElementsByTagName("audio")[0];

    jQuery("#text").bind('keydown', 'ctrl+p', function(event){
        audio.play();
        event.preventDefault();
    });

    jQuery("#text").bind('keydown', 'ctrl+o', function(event){
        audio.pause();
        event.preventDefault();
    });

    jQuery("#text").bind('keydown', 'ctrl+l', function(event){
        audio.currentTime -= 5;
        event.preventDefault();
    });
    
    jQuery("#text").bind('keydown', 'ctrl+m', function(event){
        audio.playbackRate += 0.1
        event.preventDefault();
    });
    
    jQuery("#text").bind('keydown', 'ctrl+n', function(event){
        audio.playbackRate -= 0.1
        event.preventDefault();
    });

    var holder = document.getElementById('holder');
    holder.ondragover = function () { this.className = 'hover'; return false; };
    holder.ondragend = function () { this.className = ''; return false; };
    holder.ondrop = function (e) {
      e.preventDefault();
      
      this.className = '';
      this.innerHTML = 'Loading...';

      var text = '',
	  file = e.dataTransfer.files[0],
          reader = new FileReader();
      
      text += file.name;

      reader.onload = function (event) {
        audio.src = event.target.result;
      };
      reader.readAsDataURL(file);

      this.innerHTML = text;      

      return false;
    };
});

function setDuration() {
    var audio = document.getElementsByTagName("audio")[0];
    var holder = document.getElementById('holder');

    var s, m;
    s = Math.floor( audio.duration % 60 );
    m = Math.floor( audio.duration / 60 ) % 60;
    
    s = s < 10 ? "0"+s : s;
    m = m < 10 ? "0"+m : m;
    
    holder.innerHTML += ' - ' + m+":"+s;
}
