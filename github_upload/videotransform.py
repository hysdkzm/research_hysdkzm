import cv2, sys, random
from aiortc import MediaStreamTrack, RTCPeerConnection, RTCSessionDescription
from av import VideoFrame
from PIL import Image
import numpy as np

#Use the local version of darknet_video
import darknet_video





#sys.path.insert(1, '/home/hayashida/darknet/')
import darknet
netMain = None
metaMain = None
altNames = None
darknet_image = None
    

class VideoTransform(MediaStreamTrack):
    kind = "video"
    boxes = None

    def __init__(self, track, transform):
        super().__init__()
        self.track = track
        self.transform = transform
        self.busy = True

    async def recv(self):
        #Grab frame from stream
        frame = await self.track.recv()
        #print(frame.width)
        #print(type(frame))   #av.videoframe

        img = frame.to_ndarray(format="rgb24")
        #print(img.shape)# (240, 320, 3)
        #img2 = cv2.resize(img,
         #                      (darknet.network_width(netMain),
          #                      darknet.network_height(netMain)),
       
    #                     interpolation=cv2.INTER_LINEAR)
     
  # cv2.imshow("Test", img)
       # key=cv2.waitKey(1)

        #print("1:                  ",img.shape)
        #cv2.resize(img , (416,416))
        #take every ~1/10 frames to feed darknet, this can be done better
        #i'll probably make it adaptive
       

       # if(random.randint(0,10) == 0):
        #    self.boxes = darknet_video.Inference(img)
        ##If we have any detections add them to frame
        #if(self.boxes):
            #img = darknet_video.cvDrawBoxes(self.boxes, img)
      
        image = darknet_video.Inference(img)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        #frame_resized = cv2.resize(img, (darknet.network_width(netMain),darknet.network_height(netMain)))
        #framebytes = frame_resized.tobytes()
        #darknet.copy_image_from_bytes(darknet_image, framebytes)
        #detections = darknet.detect_image(netMain, metaMain, darknet_image, thresh=0.5)  
        #image = cvDrawBoxes(detections, frame_resized)
        #image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        #cv2.imshow('Demo', image)
        #cv2.waitKey(3)
        

#        image_re = image.resize((320, 240))


        #print("2:                   ",self)

        #Convert frame back to stream
        new_frame = VideoFrame.from_ndarray(image,format="rgb24")#default=img, rgb24
        #cv2.imshow("Test", new_frame)
        #key=cv2.waitKey(1)

        new_frame.pts = frame.pts
        new_frame.time_base = frame.time_base

        #new_frame_re = new_frame.resize((320, 240))




#        frame_resized = cv2.resize(new_frame,
 #                                 (darknet.network_width(netMain),
  #                               darknet.network_height(netMain)),
   #                               interpolation=cv2.INTER_LINEAR)
        #image = cvDrawBoxes(new_frame, frame_resized)
        #image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        #cv2.imshow('Demo', image)
        #print(frame_resized)
        #cv2.waitKey(3)







        #print(new_frame.planes)   
        #new_frame = cv2.resize(np.float32(new_frame), dsize=(240, 320))
        #print("3              :",new_frame)
        return new_frame

