first_song="";
second_song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;

function preload(){
first_song=loadSound("music.mp3");
second_song=loadSound("music2.mp3");
}
function setup(){
    canvas=createCanvas(350,350);
    canvas.center();
    video=createCapture(350,350);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("posenet is initialized");
}
function draw(){
    image(video,0,0,350,350);
    song1_status = first_song.isPlaying();
	song2_status = second_song.isPlaying(); 
    fill("red");
    stroke("green");
    if(scoreLeftWrist>0.2){
    circle(leftWristX,leftWristY,10);
   second_song.stop();
    if(song1_status==false){
        first_song.play();
        document.getElementById("song_name").innerHTML= "Type of song = "+ first_song;
    }
}
    if(scoreRightWrist>0.2){
    circle(leftWristX,leftWristY,10);
    first_song.stop();
     }
     if(song2_status==false){
second_song.play();
document.getElementById("song_name").innerHTML="Type of song = "+second_song;
     }
}
function gotPoses(results){
    if (results.length>0){
        console.log(results);
        leftWristY=results[0].pose.leftWrist.y;
        leftWristX=results[0].pose.leftWrist.x;
        righttWristY=results[0].pose.rightWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        console.log(leftWristY);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreLeft =" + scoreLeftWrist);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("scoreRight =" + scoreRightWrist);
    }
}