function VR() {	////////////////////////THREE.JS START!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!///////////////////////////////////////////
	scene[count]=new THREE.Scene();
	camera[count]=new THREE.PerspectiveCamera(75, width / height, 1, 1000);
	geometry[count]=new THREE.SphereGeometry(5, 60, 40);
	renderer[count]= new THREE.WebGLRenderer();
	if(count==0){
		window.addEventListener("resize", handleResize, false);}
	else if(count==1){
		window.addEventListener("resize", handleResize1, false);}
	else if(count==2){	
    window.addEventListener("resize", handleResize2, false);}
	else if(count==3){	
    window.addEventListener("resize", handleResize3, false);}
	else if(count==4){	
    window.addEventListener("resize", handleResize4, false);}
	else if(count==5){	
    window.addEventListener("resize", handleResize5, false);}
	else if(count==6){	
		window.addEventListener("resize", handleResize6, false);}
// カメラの作成
    //camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
	camera[count].position.set(0, 0, 0);
	scene[count].add(camera[count]);
	geometry[count].scale(-1, 1, 1);
// 球体の形状を作成
//　マテリアルの作成

	//texture = new THREE.VideoTexture(video);
	texture[count].minFilter = THREE.LinearFilter;
	texture[count].magFilter = THREE.LinearFilter;
	texture[count].format = THREE.RGBFormat;

	material[count] = new THREE.MeshBasicMaterial({
  // 画像をテクスチャとして読み込み
map: texture[count]
	});

// 球体(形状)にマテリアル(質感)を貼り付けて物体を作成
	sphere[count] = new THREE.Mesh(geometry[count], material[count]);
//　シーンに追加
	scene[count].add(sphere[count]);
// レンダラーをwindowサイズに合わせる
	renderer[count].setSize(window.innerWidth,window.innerHeight);
	renderer[count].setClearColor({color: 0x000000});
	element[count] = renderer[count].domElement;
    //a=document.getElementsByClassName("stage");
	a[count].appendChild(element[count]);
	renderer[count].render(scene[count], camera[count]);
	controls[count] = new THREE.OrbitControls(camera[count], element[count]);
	controls[count].target.set(
	camera[count].position.x + 0.15,
	camera[count].position.y,
	camera[count].position.z
);
// 視点操作のイージングをONにする
	controls[count].enableDamping = true;
// 視点操作のイージングの値
	controls[count].dampingFactor = 0.2;
// 視点変更の速さ
	controls[count].rotateSpeed = 0.1;
// ズーム禁止
	controls[count].enableZoom = false;
// パン操作禁止
	controls[count].enablePan= false;
    
	if(count==0){
  	  render();
	}
	else if(count==1){
  	  render1();
	}
	else if(count==2){
      render2();
  }
	else if(count==3){
    render3();
}
	else if(count==4){
    render4();
}
	else if(count==5){
    render5();
}
	else if(count==6){
    render6();
}
	count=count+1;
	cnt=cnt+2;
  
  return;
}
///////////////////////THREE.JS ENDENDEND!!!!!!!!!!!!!!!!!!!!!!!!!!!/////////////////////////////////////////


$("[name=1]").click(function(){
     // フルスクリーンにするオブジェクト
    var btnOpen  = document.getElementsByClassName("btn")[0]; 
    var btnClose = document.getElementsByClassName("btn")[1];
    var x=0;
    var album = a[x]; 
    a[x].style.display='block';

  //--------------------------------
  // [event] 開始ボタンをクリック
  //--------------------------------
  //btnOpen.addEventListener("click", ()=>{
    if( ! enabledFullScreen() ){
      alert("フルスクリーンに対応していません");
      return(false);
    }
    // フルスクリーンを開始
    //renderer[x].setSize(1280, 720);
    //btnClose.style.zIndex = "20";
    console.log("window.innerWidthは"+window.innerWidth+"でありwindow.innerHeightは" +window.innerHeight);
    //a[x].style.height="100%";
   // a[x].style.width="100%";
    goFullScreen(album);
    btnClose.style.display = "block";
    //btnClose.style.zIndex = "20";
    
  //});
  //-------------------------------
  // [event] 閉じるボタンをクリック
  //--------------------------------
  btnClose.addEventListener("click", ()=>{
    // フルスクリーンを解除
    //renderer[x].setSize(700, 350);
    a[x].style.display='none';
    cancelFullScreen(album);
    
  });
  //--------------------------------
  // フルスクリーンイベント
  //--------------------------------
  eventFullScreen( ()=>{
      // ボタンを入れ替える
    if( getFullScreenObject() ){
      console.log("フルスクリーン開始");
      btnOpen.style.display  = "none";    // OpenをOFF
      btnClose.style.display = "block";   // CloseをON
      btnClose.style.zIndex = "20";
    }
    else{
      console.log("フルスクリーン終了");
      btnClose.style.display = "none";    // CloseをOFF
      btnOpen.style.display  = "block";   // OpenをON
    }
  });
});

$("[name=2]").click(function(){
  // フルスクリーンにするオブジェクト
 var btnOpen  = document.getElementsByClassName("btn")[2]; 
 var btnClose = document.getElementsByClassName("btn")[3];
 var x=1;
 var album = a[x]; 
 a[x].style.display='block';

//--------------------------------
// [event] 開始ボタンをクリック
//--------------------------------
//btnOpen.addEventListener("click", ()=>{
 if( ! enabledFullScreen() ){
   alert("フルスクリーンに対応していません");
   return(false);
 }
 // フルスクリーンを開始
 //renderer[x].setSize(1280, 720);
 //btnClose.style.zIndex = "20";
 console.log("window.innerWidthは"+window.innerWidth+"でありwindow.innerHeightは" +window.innerHeight);
 //a[x].style.height="100%";
// a[x].style.width="100%";
 goFullScreen(album);
 btnClose.style.display = "block";
 //btnClose.style.zIndex = "20";
 
//});
//-------------------------------
// [event] 閉じるボタンをクリック
//--------------------------------
btnClose.addEventListener("click", ()=>{
 // フルスクリーンを解除
 //renderer[x].setSize(700, 350);
 a[x].style.display='none';
 cancelFullScreen(album);
 
});
//--------------------------------
// フルスクリーンイベント
//--------------------------------
eventFullScreen( ()=>{
   // ボタンを入れ替える
 if( getFullScreenObject() ){
   console.log("フルスクリーン開始");
   btnOpen.style.display  = "none";    // OpenをOFF
   btnClose.style.display = "block";   // CloseをON
   btnClose.style.zIndex = "20";
 }
 else{
   console.log("フルスクリーン終了");
   btnClose.style.display = "none";    // CloseをOFF
   btnOpen.style.display  = "block";   // OpenをON
 }
});
});

$("[name=3]").click(function(){
  // フルスクリーンにするオブジェクト
 var btnOpen  = document.getElementsByClassName("btn")[4]; 
 var btnClose = document.getElementsByClassName("btn")[5];
 var x=2;
 var album = a[x]; 
 a[x].style.display='block';

//--------------------------------
// [event] 開始ボタンをクリック
//--------------------------------
//btnOpen.addEventListener("click", ()=>{
 if( ! enabledFullScreen() ){
   alert("フルスクリーンに対応していません");
   return(false);
 }
 // フルスクリーンを開始
 //renderer[x].setSize(1280, 720);
 //btnClose.style.zIndex = "20";
 console.log("window.innerWidthは"+window.innerWidth+"でありwindow.innerHeightは" +window.innerHeight);
 //a[x].style.height="100%";
// a[x].style.width="100%";
 goFullScreen(album);
 btnClose.style.display = "block";
 //btnClose.style.zIndex = "20";
 
//});
//-------------------------------
// [event] 閉じるボタンをクリック
//--------------------------------
btnClose.addEventListener("click", ()=>{
 // フルスクリーンを解除
 //renderer[x].setSize(700, 350);
 a[x].style.display='none';
 cancelFullScreen(album);
 
});
//--------------------------------
// フルスクリーンイベント
//--------------------------------
eventFullScreen( ()=>{
   // ボタンを入れ替える
 if( getFullScreenObject() ){
   console.log("フルスクリーン開始");
   btnOpen.style.display  = "none";    // OpenをOFF
   btnClose.style.display = "block";   // CloseをON
   btnClose.style.zIndex = "20";
 }
 else{
   console.log("フルスクリーン終了");
   btnClose.style.display = "none";    // CloseをOFF
   btnOpen.style.display  = "block";   // OpenをON
 }
});
});

$("[name=4]").click(function(){
  // フルスクリーンにするオブジェクト
 var btnOpen  = document.getElementsByClassName("btn")[6]; 
 var btnClose = document.getElementsByClassName("btn")[7];
 var x=3;
 var album = a[x]; 
 a[x].style.display='block';

//--------------------------------
// [event] 開始ボタンをクリック
//--------------------------------
//btnOpen.addEventListener("click", ()=>{
 if( ! enabledFullScreen() ){
   alert("フルスクリーンに対応していません");
   return(false);
 }
 // フルスクリーンを開始
 //renderer[x].setSize(1280, 720);
 //btnClose.style.zIndex = "20";
 console.log("window.innerWidthは"+window.innerWidth+"でありwindow.innerHeightは" +window.innerHeight);
 //a[x].style.height="100%";
// a[x].style.width="100%";
 goFullScreen(album);
 btnClose.style.display = "block";
 //btnClose.style.zIndex = "20";
 
//});
//-------------------------------
// [event] 閉じるボタンをクリック
//--------------------------------
btnClose.addEventListener("click", ()=>{
 // フルスクリーンを解除
 //renderer[x].setSize(700, 350);
 a[x].style.display='none';
 cancelFullScreen(album);
 
});
//--------------------------------
// フルスクリーンイベント
//--------------------------------
eventFullScreen( ()=>{
   // ボタンを入れ替える
 if( getFullScreenObject() ){
   console.log("フルスクリーン開始");
   btnOpen.style.display  = "none";    // OpenをOFF
   btnClose.style.display = "block";   // CloseをON
   btnClose.style.zIndex = "20";
 }
 else{
   console.log("フルスクリーン終了");
   btnClose.style.display = "none";    // CloseをOFF
   btnOpen.style.display  = "block";   // OpenをON
 }
});
});

$("[name=5]").click(function(){
  // フルスクリーンにするオブジェクト
 var btnOpen  = document.getElementsByClassName("btn")[8]; 
 var btnClose = document.getElementsByClassName("btn")[9];
 var x=4;
 var album = a[x]; 
 a[x].style.display='block';

//--------------------------------
// [event] 開始ボタンをクリック
//--------------------------------
//btnOpen.addEventListener("click", ()=>{
 if( ! enabledFullScreen() ){
   alert("フルスクリーンに対応していません");
   return(false);
 }
 // フルスクリーンを開始
 //renderer[x].setSize(1280, 720);
 //btnClose.style.zIndex = "20";
 console.log("window.innerWidthは"+window.innerWidth+"でありwindow.innerHeightは" +window.innerHeight);
 //a[x].style.height="100%";
// a[x].style.width="100%";
 goFullScreen(album);
 btnClose.style.display = "block";
 //btnClose.style.zIndex = "20";
 
//});
//-------------------------------
// [event] 閉じるボタンをクリック
//--------------------------------
btnClose.addEventListener("click", ()=>{
 // フルスクリーンを解除
 //renderer[x].setSize(700, 350);
 a[x].style.display='none';
 cancelFullScreen(album);
 
});
//--------------------------------
// フルスクリーンイベント
//--------------------------------
eventFullScreen( ()=>{
   // ボタンを入れ替える
 if( getFullScreenObject() ){
   console.log("フルスクリーン開始");
   btnOpen.style.display  = "none";    // OpenをOFF
   btnClose.style.display = "block";   // CloseをON
   btnClose.style.zIndex = "20";
 }
 else{
   console.log("フルスクリーン終了");
   btnClose.style.display = "none";    // CloseをOFF
   btnOpen.style.display  = "block";   // OpenをON
 }
});
});


$("[name=6]").click(function(){
  // フルスクリーンにするオブジェクト
 var btnOpen  = document.getElementsByClassName("btn")[10]; 
 var btnClose = document.getElementsByClassName("btn")[11];
 var x=5;
 var album = a[x]; 
 a[x].style.display='block';

//--------------------------------
// [event] 開始ボタンをクリック
//--------------------------------
//btnOpen.addEventListener("click", ()=>{
 if( ! enabledFullScreen() ){
   alert("フルスクリーンに対応していません");
   return(false);
 }
 // フルスクリーンを開始
 //renderer[x].setSize(1280, 720);
 //btnClose.style.zIndex = "20";
 console.log("window.innerWidthは"+window.innerWidth+"でありwindow.innerHeightは" +window.innerHeight);
 //a[x].style.height="100%";
// a[x].style.width="100%";
 goFullScreen(album);
 btnClose.style.display = "block";
 //btnClose.style.zIndex = "20";
 
//});
//-------------------------------
// [event] 閉じるボタンをクリック
//--------------------------------
btnClose.addEventListener("click", ()=>{
 // フルスクリーンを解除
 //renderer[x].setSize(700, 350);
 a[x].style.display='none';
 cancelFullScreen(album);
 
});
//--------------------------------
// フルスクリーンイベント
//--------------------------------
eventFullScreen( ()=>{
   // ボタンを入れ替える
 if( getFullScreenObject() ){
   console.log("フルスクリーン開始");
   btnOpen.style.display  = "none";    // OpenをOFF
   btnClose.style.display = "block";   // CloseをON
   btnClose.style.zIndex = "20";
 }
 else{
   console.log("フルスクリーン終了");
   btnClose.style.display = "none";    // CloseをOFF
   btnOpen.style.display  = "block";   // OpenをON
 }
});
});


/**
 * フルスクリーン開始/終了時のイベント設定
 *
 * @param {function} callback
 */
function eventFullScreen(callback){
  document.addEventListener("fullscreenchange", callback, false);
  document.addEventListener("webkitfullscreenchange", callback, false);
  document.addEventListener("mozfullscreenchange", callback, false);
  document.addEventListener("MSFullscreenChange", callback, false);
}

/**
 * フルスクリーンが利用できるか
 *
 * @return {boolean}
 */
function enabledFullScreen(){
  return(
    document.fullscreenEnabled || document.mozFullScreenEnabled || document.documentElement.webkitRequestFullScreen || document.msFullscreenEnabled
  );
}

/**
 * フルスクリーンにする
 *
 * @param {object} [element]
 */
function goFullScreen(element=null){
  const doc = window.document;
  const docEl = (element === null)?  doc.documentElement:element;
  let requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  requestFullScreen.call(docEl);

}

/**
 * フルスクリーンをやめる
 */
function cancelFullScreen(){
  const doc = window.document;
  const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
  cancelFullScreen.call(doc);
}

/**
 * フルスクリーン中のオブジェクトを返却
 */
function getFullScreenObject(){
  const doc = window.document;
  const objFullScreen = doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement;
  return(objFullScreen);
}
	////////////////////THREE.JS関数start/////////////////////////////////////////
  function handleResize() {
    renderer[0].setSize(width, height);
    camera[0].aspect = width / height;
    camera[0].updateProjectionMatrix();
        }   
function handleResize1() {
    renderer[1].setSize(width, height);
    camera[1].aspect = width / height;
    camera[1].updateProjectionMatrix();
        }   
function handleResize2() {
    renderer[2].setSize(width, height);
    camera[2].aspect = width / height;
    camera[2].updateProjectionMatrix();
        }   
function handleResize3() {
    renderer[3].setSize(width, height);
    camera[3].aspect = width / height;
    camera[3].updateProjectionMatrix();
        }   
function handleResize4() {
    renderer[4].setSize(width, height);
    camera[4].aspect = width / height;
    camera[4].updateProjectionMatrix();
        }   
function handleResize5() {
    renderer[5].setSize(width, height);
    camera[5].aspect = width / height;
    camera[5].updateProjectionMatrix();
        }   
function handleResize6() {
    renderer[6].setSize(width, height);
    camera[6].aspect = width / height;
    camera[6].updateProjectionMatrix();
        }   

function render() {
    requestAnimationFrame(render);
    renderer[0].render(scene[0], camera[0]);
    controls[0].update();
        }
function render1() {
    requestAnimationFrame(render1);
    renderer[1].render(scene[1], camera[1]);
    controls[1].update();
        }
function render2() {
    requestAnimationFrame(render2);
    renderer[2].render(scene[2], camera[2]);
    controls[2].update();
        }
function render3() {
    requestAnimationFrame(render3);
    renderer[3].render(scene[3], camera[3]);
    controls[3].update();
        }
function render4() {
    requestAnimationFrame(render4);
    renderer[4].render(scene[4], camera[4]);
    controls[4].update();
        }
function render5() {
    requestAnimationFrame(render5);
    renderer[5].render(scene[5], camera[5]);
    controls[5].update();
        }
function render6() {
    requestAnimationFrame(render6);
    renderer[6].render(scene[6], camera[6]);
    controls[6].update();
        }
////////////////THREE.JS関数end//////////////////////////////////////