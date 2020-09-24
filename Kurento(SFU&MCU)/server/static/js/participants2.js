/*
 * (C) Copyright 2014 Kurento (http://kurento.org/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
/////////////THREEJSの変数/////////////////////////////////////////
let positionX = 700;
let positionY = 800;
let positionZ = 900;
var count=0;
var scene = ['リンゴ', 'バナナ', 'イチゴ','マンゴー',"a","b","c","d","e"];
var camera = ['リンゴ', 'バナナ', 'イチゴ','マンゴー',"a","b","c","d","e"];
var renderer = ['リンゴ', 'バナナ', 'イチゴ','マンゴー',"a","b","c","d","e"];
var controls= ['リンゴ', 'バナナ', 'イチゴ','マンゴー',"a","b","c","d","e"];
var element = ['リンゴ', 'バナナ', 'イチゴ','マンゴー',"a","b","c","d","e"];
var material = ['リンゴ', 'バナナ', 'イチゴ','マンゴー',"a","b","c","d","e"];
var geometry = ['リンゴ', 'バナナ', 'イチゴ','マンゴー',"a","b","c","d","e"];
var sphere = ['リンゴ', 'バナナ', 'イチゴ','マンゴー',"a","b","c","d","e"];
var texture = ['リンゴ', 'バナナ', 'イチゴ','マンゴー',"a","b","c","d","e"];
var VR_bt = ['リンゴ', 'バナナ', 'イチゴ','マンゴー',"a","b","c","d","e"];
var VR_bt_cl = ['リンゴ', 'バナナ', 'イチゴ','マンゴー',"a","b","c","d","e"];
const a = document.getElementsByClassName("stage");
var width =  window.outerWidth;
var height = window.outerHeight+40;
var cnt=0;
var num=1;
let fov = 60,
isUserInteracting = false,
onMouseDownMouseX = 0, onMouseDownMouseY = 0,
lon = 0, onMouseDownLon = 0,
lat = 0, onMouseDownLat = 0,
phi = 0, theta = 0;
var text2;
//////////////////////////////////////////////////////////////////
const PARTICIPANT_MAIN_CLASS = 'participant main';
const PARTICIPANT_CLASS = 'participant';

/**
 * Creates a video element for a new participant
 *
 * @param {String} name - the name of the new participant, to be used as tag
 *                        name of the video element.
 *                        The tag of the new element will be 'video<name>'
 * @return
 */
function Participant(name) {
	this.name = name;
	//this.name.style.color = "red";
	var container = document.createElement('div');
	container.className = isPresentMainParticipant() ? PARTICIPANT_CLASS : PARTICIPANT_MAIN_CLASS;
	container.id = name;
	var span = document.createElement('span');
	var video = document.createElement('video');
	var rtcPeer;

	container.appendChild(video);
	container.appendChild(span);
	container.onclick = switchContainerClass;
	document.getElementById('participants').appendChild(container);


	text2="user"+(count+1)+" :";
	//VR_bt_cl[count]=document.getElementsByClassName("btn")[cnt+1];
	//console.log("ディスプレイはね"+VR_bt[count].value);
	//console.log("btncntは：：：：：：：："+(cnt)+"です！！！");

	//container.appendChild( VR_bt[count] );
	//container.appendChild( VR_bt_cl[count] );
	span.appendChild(document.createTextNode(text2));
	span.appendChild(document.createElement("br"));
	span.appendChild(document.createTextNode(name));

	video.id = 'video-' + name;
	video.autoplay = true;
	video.controls = true;
	video.name=cnt;
    //video.style.border = 'solid black 1px';
	//video.style.margin = '2px';
	

	this.getElement = function() {
		return container;
	}

	this.getVideoElement = function() {
		return video;
	}

	function switchContainerClass() {
		if (container.className === PARTICIPANT_CLASS) {
			var elements = Array.prototype.slice.call(document.getElementsByClassName(PARTICIPANT_MAIN_CLASS));
			elements.forEach(function(item) {
				item.className = PARTICIPANT_CLASS;
			});
			container.className = PARTICIPANT_MAIN_CLASS;
		} else {
			container.className = PARTICIPANT_CLASS;
		}
	}

	function isPresentMainParticipant() {
		return ((document.getElementsByClassName(PARTICIPANT_MAIN_CLASS)).length != 0);
	}

	this.offerToReceiveVideo = function(error, offerSdp, wp){
		if (error) return console.error ("sdp offer error")
		console.log('Invoking SDP offer callback function');
		var msg =  {
				id : "receiveVideoFrom",
				sender : name,
				sdpOffer : offerSdp
		};
		sendMessage(msg);
	}


	this.onIceCandidate = function (candidate, wp) {
		  console.log("Local candidate" + candidate);

		  var message = {
		    id: 'onIceCandidate',
		    candidate: candidate,
		    sender: name
		  };
		  sendMessage(message);
	}

	Object.defineProperty(this, 'rtcPeer', { writable: true});

	this.dispose = function() {
		console.log('Disposing participant ' + this.name);
		this.rtcPeer.dispose();
		container.parentNode.removeChild(container);
	};


}