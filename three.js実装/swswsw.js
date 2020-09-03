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