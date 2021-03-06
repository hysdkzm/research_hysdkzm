from ctypes import *
import math, random, os, cv2, time, sys
import numpy as np
import json
import requests



sys.path.insert(1, '/home/hayashida/darknet/')
import darknet

res=None

def convertBack(x, y, w, h):
    xmin = int(round(x - (w / 2)))
    xmax = int(round(x + (w / 2)))
    ymin = int(round(y - (h / 2)))
    ymax = int(round(y + (h / 2)))
    return xmin, ymin, xmax, ymax


def cvDrawBoxes(detections, img):
#    y_ = darknet.network_width(netMain)
 #   x_ = darknet.network_height(netMain)
  #  x_scale = img.shape[1] / x_
   # y_scale = img.shape[0] / y_


    for detection in detections:
       # x, y, w, h = detection[2][0],\
       #     detection[2][1],\
       #     detection[2][2],\
       #     detection[2][3]
       # xmin, ymin, xmax, ymax = convertBack(float(x), float(y), float(w), float(h))
        #scale to image, this is bad ... i know
       # xscale = (xmax / 800) + xmax
       # yscale = (ymax / 600) + ymax
       # pt1 = (int(xmin), int(ymin))
       # pt2 = (int(xmax + xscale), int(ymax + yscale))
       # cv2.rectangle(img, pt1, pt2, (0, 0, 0), -1)
        y_ = darknet.network_width(netMain)
        x_ = darknet.network_height(netMain)
        #print(img.shape)
        x_scale = img.shape[1] / x_
        y_scale = img.shape[0] / y_
        #print(x_scale)
        x, y, w, h = detection[2][0],\
            detection[2][1],\
            detection[2][2],\
            detection[2][3]
        xmin, ymin, xmax, ymax = convertBack(
            float(x), float(y), float(w), float(h))
        pt1 = (xmin, ymin)
        pt2 = (xmax, ymax)
        xmin = int(np.round(pt1[0] * x_scale))
        ymin = int(np.round(pt1[1] * y_scale))
        xmax = int(np.round(pt2[0] * x_scale))
        ymax = int(np.round(pt2[1] * y_scale))
        #print(xmin)
        pt1 = (xmin, ymin)
        pt2 = (xmax, ymax)
        cv2.rectangle(img, pt1, pt2, (0, 255, 0), 1)
        cv2.putText(img,
                    detection[0].decode() +
                    " [" + str(round(detection[1] * 100, 2)) + "]",
                    (pt1[0], pt1[1] - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5,
                    [0, 255, 0], 2)
    return img



def cvDrawBoxes2(detections, img):
    for detection in detections:
        y_ = darknet.network_width(netMain)
        x_ = darknet.network_height(netMain)
        #print(img.shape)
        x_scale = img.shape[1] / x_
        y_scale = img.shape[0] / y_
        #print(x_scale)
        x, y, w, h = detection[2][0],\
            detection[2][1],\
            detection[2][2],\
            detection[2][3]
        xmin, ymin, xmax, ymax = convertBack(
            float(x), float(y), float(w), float(h))
        pt1 = (xmin, ymin)
        pt2 = (xmax, ymax)
        xmin = int(np.round(pt1[0] * x_scale))
        ymin = int(np.round(pt1[1] * y_scale))
        xmax = int(np.round(pt2[0] * x_scale))
        ymax = int(np.round(pt2[1] * y_scale))
        cv2.rectangle(img, pt1, pt2, (0, 255, 0), 1)
        cv2.putText(img,
                    detection[0].decode() +
                    " [" + str(round(detection[1] * 100, 2)) + "]",
                    (pt1[0], pt1[1] - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5,
                    [0, 255, 0], 2)
    return img






netMain = None
metaMain = None
altNames = None
darknet_image = None

def InitialiseYOLO():
    print('YOLO Init')
    global metaMain, netMain, altNames, darknet_image

    #configPath = "./cfg/yolov4.cfg"
    configPath = "/home/hayashida/darknet/cfg/yolov3.cfg"
    #weightPath = "./yolov4.weights"
    weightPath = "/root/tmp/darknet/yolov3.weights"
    #metaPath = "./cfg/coco.data"
    metaPath = "/home/hayashida/darknet/cfg/coco.data"

    if not os.path.exists(configPath):
        raise ValueError("Invalid config path `" +
                         os.path.abspath(configPath)+"`")
    if not os.path.exists(weightPath):
        raise ValueError("Invalid weight path `" +
                         os.path.abspath(weightPath)+"`")
    if not os.path.exists(metaPath):
        raise ValueError("Invalid data file path `" +
                         os.path.abspath(metaPath)+"`")
    if netMain is None:
        netMain = darknet.load_net_custom(configPath.encode(
            "ascii"), weightPath.encode("ascii"), 0, 1)  # batch size = 1
    if metaMain is None:
        metaMain = darknet.load_meta(metaPath.encode("ascii"))
    if altNames is None:
        try:
            with open(metaPath) as metaFH:
                metaContents = metaFH.read()
                import re
                match = re.search("names *= *(.*)$", metaContents,
                                  re.IGNORECASE | re.MULTILINE)
                if match:
                    result = match.group(1)
                else:
                    result = None
                try:
                    if os.path.exists(result):
                        with open(result) as namesFH:
                            namesList = namesFH.read().strip().split("\n")
                            altNames = [x.strip() for x in namesList]
                except TypeError:
                    pass
        except Exception:
            pass

    darknet_image = darknet.make_image(darknet.network_width(netMain),
                                    darknet.network_height(netMain),3)    
    return netMain, metaMain

def Inference(img):
    #print(img.shape)   #240 320
    frame_resized = cv2.resize(img,
                               (darknet.network_width(netMain),
                                darknet.network_height(netMain)),
                                interpolation=cv2.INTER_LINEAR)
    #print(type(frame_resized))
    framebytes = frame_resized.tobytes()
    darknet.copy_image_from_bytes(darknet_image, framebytes)
    detections = darknet.detect_image(netMain, metaMain, darknet_image, thresh=0.5)

#    print("resize1",darknet.network_width(netMain))
#    print("resize2",darknet.network_height(netMain))

    #print("3333333333333",frame_resized[1])
    #print(detections.shape)    #list-type
    #frame_resized = cv2.resize(img,
      #                          (darknet.network_width(netMain),
       #                         darknet.network_height(netMain)),
    #print(type(detections))   
    #print(detections)
    #StrA = " ".join(detections)
    #print(detections)
    #response = requests.post(
     #  'http://localhost:8080/index.html',
      #  json.dumps(detections),
       # headers={'Content-Type': 'application/json'})
    #print(response.text)
    global res
    res=detections
    #print("result1",res)

   #                        interpolation=cv2.INTER_LINEAR)    
    image = cvDrawBoxes2(detections, frame_resized)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
   # cv2.imshow('Demo', image)
    #print(image.shape)
   # cv2.waitKey(3)

   # print("33333",detections.plane)
    #print(detections)
    return image
    #return detections

def Inference2(img):
    #print(img.shape)   #240 320
    frame_resized = cv2.resize(img,
                               (darknet.network_width(netMain),
                                darknet.network_height(netMain)),
                                interpolation=cv2.INTER_LINEAR)
    #print(type(frame_resized))
    framebytes = frame_resized.tobytes()
    darknet.copy_image_from_bytes(darknet_image, framebytes)
    detections = darknet.detect_image(netMain, metaMain, darknet_image, thresh=0.5)
    #print(darknet.network_width(netMain))

    #print("3333333333333",frame_resized[1])
    #print(detections.shape)    #list-type
    #frame_resized = cv2.resize(img,
      #                          (darknet.network_width(netMain),
       #                         darknet.network_height(netMain)),
    #print(type(detections))   
    #print(detections)
    #StrA = " ".join(detections)
    #print(detections)

    return detection



#As we are calling it during videoTransform just init
InitialiseYOLO()
