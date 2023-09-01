function setup() {
  canvas = crateCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet',modelLoaded);
}

function modelLoaded() {
    console.log('Modle Loaded!');
}

function draw() {
    image(viedo, 0, 0, 300, 300);
    classifier.classify(video, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else/**/{
        if ((results[0].confidence > 0.5) && (previousResult!= results[0].label)){
            console.log(results);
            previousResult = results[0].label;
            var synth = window.speechSynthesis;
            speakData = 'O objeto detectado é - '+results[0].label;
            var utterThis = new SpeechSynthesisUtterance(speakData);
            synth.speak(utterThis);

            document.getElementBId("resultObjectname").innerHTML = results[0].label;
            document.getElementBId("resultObjectAccuracy").innerHTML = results[0].confidence.toFixed(3);

        }
    }
}