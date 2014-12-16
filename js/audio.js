function muteAudio() {
    var audio =  document.getElementById('audio');
    audio.muted = !audio.muted;
    var icon = document.getElementById('sound-icon');
    var btnAudio = document.getElementById('audioControl');

    icon.src = (audio.muted === false) ? 'images/unmuted.png' : 'images/muted.png';
}