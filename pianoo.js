const ttnotes=["Do","Re","Mi","Fa","Sol","La","Si","Dod","Redi","Fad","Sold","Lad"];
function getCheminAudio(idNote){
    const soundType=document.getElementById("soundType").value;
    const octave=parseInt(document.getElementById("octave").value);
    return `audio/${soundType}/${idNote}${octave}.m4a`
}
//jouer avec des clicks
function jouerNote(idNote){
    const cheminAudio=getCheminAudio(idNote);
    const audio=new Audio(cheminAudio);
    audio.play();
    if(sustain){
        notesEnSustain.push(audio);
    }else{
            audio.onended=()=>{
                audio.currentTime=0;
            }
        };
    }
document.addEventListener("DOMContentLoaded",()=>{
    const touches =document.querySelectorAll(".toucheblanche, .touchenoire");
    touches.forEach(touche=>{
        touche.addEventListener("click",()=>{
            jouerNote(touche.id);
            touche.classList.add("active");
            setTimeout(()=>touche.classList.remove("active"),180);
        });
    });
});
//jouer avec le clavier
const manNote={
    "d":"Do",
    "f":"Re",
    "g":"Mi",
    "h":"Fa",
    "j":"Sol",
    "k":"La",
    "l":"Si",
    "r":"Dod",
    "t":"Redi",
    "u":"Fad",
    "i":"Sold",
    "o":"Lad",
};
document.addEventListener("keydown",(event)=>{
    const note=event.key.toLowerCase();
    if (manNote[note]){
        const idNote=manNote[note];
        jouerNote(idNote);
        const touche=document.getElementById(idNote);
        if(touche){
            touche.classList.add("active");
            setTimeout(()=>touche.classList.remove("active"),180);
        }
    }
});
//pédale sustain
let sustain=false;
let notesEnSustain= [];
function toggleSustain(){
    sustain=!sustain;
    if(!sustain){
        notesEnSustain.forEach(a=>{
            a.pause();
            a.currentTime=0;
        });
    notesEnSustain=[];
    document.getElementById("sustains").textContent="Sustain désactivé";
    document.getElementById("sustain").style.backgroundColor="rgb(82,201,136)";
    }else{
        document.getElementById("sustains").textContent="Sustain activé";
        document.getElementById("sustain").style.backgroundColor="green";
    }
}
document.getElementById("sustain").addEventListener("click",toggleSustain);
document.addEventListener("keydown",(event)=>{
    if (event.key.toLowerCase()==="s"){
        toggleSustain();
    }
});
//métronome
let metroo=false;
let metroInterval=null;
function jouerTick(){
    const tick=new Audio("audio/Metronome.m4a");
    tick.currentTime=0;
    tick.play();
    const led=document.getElementById("metro")
    led.classList.add("metronome-active");
    setTimeout(()=>led.classList.remove("metronome-active"),120);
}
function startMetronome(){
    if (metroo)return;
    metroo=true;
    metroInterval=setInterval(jouerTick,1000);
    jouerTick();
}
function stopMetronome(){
    metroo=false;
    clearInterval(metroInterval);
}
document.getElementById("metronomeBtn").addEventListener("click",()=>{
    if(metroo)stopMetronome();
    else startMetronome();
});
//lecture des chansons
const choixChanson=document.getElementById("presetSongs");
const audioPlay=document.getElementById("audiop");
const btnLect=document.getElementById("lecturebtn");
const btnStop=document.getElementById("stpbtn");
btnLect.addEventListener("click",()=>{
    const chanson=choixChanson.value;
    if(!chanson){
        alert("Veuillez choisir une chanson!");
        return;
    }
    audioPlay.src=chanson;
    audioPlay.play();
});
btnStop.addEventListener("click",()=>{
    audioPlay.pause();
    audioPlay.currentTime=0;
});
//enregistrement des chansons
let mediaRecorder;
let morceauAudio=[];
const enregBtn=document.getElementById("enreg");
const stopEnregBtn=document.getElementById("stopEnreg");
const listeEnreg=document.getElementById("listeEnreg");

enregBtn.addEventListener("click",async()=>{
    try{
    const stream=await navigator.mediaDevices.getUserMedia({audio:true});
    mediaRecorder= new MediaRecorder(stream);
    morceauAudio=[];
    mediaRecorder.ondataavailable=(event)=>{
        morceauAudio.push(event.data);
    };
    mediaRecorder.onstop=()=>{
            const audioBlob=new Blob(morceauAudio,{ type:"audio/mp3" });
            const audioURL=URL.createObjectURL(audioBlob);
            const li=document.createElement("li");
            const audio=new Audio(audioURL);
            const playBtn=document.createElement("button");
            playBtn.textContent = "Lecture";
            const stopBtn = document.createElement("button");
            stopBtn.textContent = "Stop";
            playBtn.addEventListener("click",()=>{
                audio.currentTime=0;
                audio.play();
            });
            stopBtn.addEventListener("click",()=>{
                audio.pause();
                audio.currentTime=0;
            });
            li.textContent="Enregistrement: ";
            li.appendChild(playBtn);
            li.appendChild(stopBtn);
            listeEnreg.appendChild(li);
    };
    mediaRecorder.start();
    console.log("Enregistrement démarré!");
    }catch(error){
    console.log("erreur micro:",error);
    alert("Accès au micro refusé");
    }
});

stopEnregBtn.addEventListener("click",()=>{
    if (mediaRecorder && mediaRecorder.state==="recording"){
        mediaRecorder.stop();
        console.log("Enregistrement arrêté");
    }
});
//changement d'octave avec les touches clavier
document.addEventListener("keydown",(event)=>{
    const octaveInput=document.getElementById("octave");
    let octave=parseInt(octaveInput.value);
    if (event.key==="+"){
        if(octave<2){
            octave++;
            octaveInput.value=octave;
        }
    }
    if(event.key==="-"){
        if(octave>-2){
            octave--;
            octaveInput.value=octave;
        }
    }
});