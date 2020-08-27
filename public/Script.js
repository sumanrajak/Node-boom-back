const videoGrid=document.getElementById('vid-grid');
let myVideo=document.createElement('video');
myVideo.muted = true;

let myVideoStream
var peer = new Peer(); 


navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream=>{
        myVideoStream=stream;
        addvideo(myVideo,stream);

      
        peer.on('call',call =>{
            call.answer(stream)
            const video = document.createElement('video')
            call.on('stream',userVideostram =>{
                addvideo(video,userVideostram)
                console.log('done')
            }   )     })


            socket.on('user-conected',(idu)=>{
                connecttonewuser(idu,stream);
    })
     
}
)
peer.on('open',(idu)=>{
    console.log(idu+'___id');
    socket.emit('join-room',id,idu);

})



const connecttonewuser = (idu,stream)=>{
 console.log('new user__'+idu);
 const call=peer.call(idu,stream)
 const video= document.createElement('video');
 call.on('stream',userVideostram =>{
     addvideo(video,userVideostram)
     console.log('done')

 })

}

const addvideo=(video,stream)=>{
    video.srcObject=stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play();
    }

    )
    
  videoGrid.append(video);
}

document.getElementById('demo').innerHTML = id2;
document.getElementById('links').value = id2;


const Copy=() => {
    var copyText =document.getElementById("links");
   
   //console.log(copyText.value);
    copyText.select();
    document.execCommand("copy");
  
    //alert("Copied the text: " + copyText.value);
  }
  const closeWin=()=> {
    var win = window.open("about:blank", "_self");
    win.close();

  }
  
  const muteUnmute = () => {
    console.log('mute')

    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
      myVideoStream.getAudioTracks()[0].enabled = false;
      setUnmuteButton();
    } else {
      setMuteButton();
      myVideoStream.getAudioTracks()[0].enabled = true;
    }
  }
  
  const playStop = () => {
    console.log('video')
    let enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
      myVideoStream.getVideoTracks()[0].enabled = false;
      setPlayVideo()
    } else {
      setStopVideo()
      myVideoStream.getVideoTracks()[0].enabled = true;
    }
  }
  
  const setMuteButton = () => {
    const html = `
      <i class="fas fa-microphone"></i>
      <span>Mute</span>
    `
    document.querySelector('.main__mute_button').innerHTML = html;
  }
  
  const setUnmuteButton = () => {
    const html = `
      <i class="unmute fas fa-microphone-slash"></i>
      <span>Unmute</span>
    `
    document.querySelector('.main__mute_button').innerHTML = html;
  }
  
  const setStopVideo = () => {
    const html = `
      <i class="fas fa-video"></i>
      <span>Stop Video</span>
    `
    document.querySelector('.main__video_button').innerHTML = html;
  }
  
  const setPlayVideo = () => {
    const html = `
    <i class="stop fas fa-video-slash"></i>
      <span>Play Video</span>
    `
    document.querySelector('.main__video_button').innerHTML = html;
  }
  