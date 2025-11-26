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
