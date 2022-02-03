prediction = "";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_url){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_url+'"/>';
    });
}

console.log('ml5 version:', ml5.version);
classifier = ml5.ImageClassifier('https://teachablemachine.withgoogle.com/models/sxOMWrgQW/model.json',modelLoded);

function modelLoded(){
    console.log('Model Loded!');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = "The Prediction Is"+prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
   synth.speak(utterThis);
}

function check(){
    img=document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error,results){
   if(error){
       console.error(error);
   }
   else{
       console.log(results);
       document.getElementById("result_emotion_name").innerHTML = results[0].label;
       prediction = results[0].label;
       speak();
       if (results[0].label == "Amazing"){
           document.getElementById("update_emoji").innerHTML = "&#128076;";
       }
       if (results[0].label == "Best"){
        document.getElementById("update_emoji").innerHTML = "&#128532;";
       }
       if (results[0].label == "Victory"){
        document.getElementById("update_emoji").innerHTML = "&#9996;";
       }
   }
}

