from PIL import Image
from PIL import Image, ImageDraw
import cv2
import glob
import os
import shutil
import math
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
import pandas as pd
import numpy as np
import matplotlib as mpl
import matplotlib.pyplot as plt

# list_2d = [[0, 1, 2], [3, 4, 5]]
# sns.heatmap(list_2d)
# plt.figure()
# #sns.heatmap(list_2d)
# plt.show()
# plt.close('all')

p2=np.loadtxt("def-0518.txt",delimiter="	")

# arr_2d = np.arange(-36, 36).reshape((9, 8))

# [[-8 -7 -6 -5]
#  [-4 -3 -2 -1]
#  [ 0  1  2  3]
#  [ 4  5  6  7]]

# plt.figure()
# sns.heatmap(arr_2d)
# plt.show()




# df = pd.DataFrame(data=arr_2d, index=['a', 'b', 'c', 'd'], columns=['A', 'B', 'C', 'D'])
# print(df)
# #    A  B  C  D
# # a -8 -7 -6 -5
# # b -4 -3 -2 -1
# # c  0  1  2  3
# # d  4  5  6  7

# plt.figure()
# sns.heatmap(df)
# plt.savefig('data/dst/seaborn_heatmap_dataframe.png')


# p2=np.loadtxt("C:/Users/kazum/python/im_ndarray.txt",delimiter="	")

yy,zz=[],[]
y=p2[0,:]
z=p2[:,0]
y=y[1:]
z=z[1:]
print(yy,zz,z,y)
for num in range(len(y)):
    yy.append(y)
for num in range(len(z)):
    zz.append(z)
Y=np.array(yy)
Z=np.array(zz).T
print(yy,zz,z,y)

p2 = np.delete(p2,0,1)
p2 = np.delete(p2,0,0)

print(p2)
plt.rcParams["font.size"] = 30
plt.contourf(Y,Z,p2,100 , cmap='Spectral_r')
plt.xlabel(r"$\bf{" + "longitude" + "}$")
plt.xlim(0,360)
plt.ylabel(r"$\bf{" + "latitude" + "}$")
plt.ylim(-90,90)
plt.colorbar()
plt.show()
#                         #print(type(d))

        #print(len(a),len(b))
