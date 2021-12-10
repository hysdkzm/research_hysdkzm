import numpy as np
# import point_estimation
# import point_interpolation3

def start(detections, width, height):
    #xy = np.array([[9999., 9999.]])
    gray_piece = []
    for x in detections:
        dec = x[0]
        if (dec == 'person'):
            a = [1]
            a.append(x[2][0]/width)
            a.append(x[2][1]/height)
            a.append(x[2][2]/width)
            a.append(x[2][3]/height)
            gray_piece.append(a)



    return gray_piece
