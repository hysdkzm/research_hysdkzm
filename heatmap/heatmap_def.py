from PIL import Image
import numpy as np
import matplotlib.pyplot as plt
import cv2


im = np.array(Image.open('C:/Users/kazum/ドキュメント/new.jpg').convert('L'))

# print(im)

# # PILでcat.jpgを開いてグレースケール画像に変換し、NumPy配列に変換
# im = np.array(Image.open('cat.jpg').convert('L'))

# NumPy配列のshapeと、要素のデータ型を表示
# print(im.shape, im.dtype)

# # グレースケール化した画像のNumPy配列に変換したものを表示
# print(im)

# # 上記NumPy配列をテキストで保存
# np.savetxt('im_ndarray.txt', im)


heatmap2 = cv2.resize(im, (600,300))
plt.matshow(heatmap2)
plt.show()
heatmapshow = None
heatmapshow = cv2.normalize(heatmap2, heatmapshow, alpha=0, beta=255, norm_type=cv2.NORM_MINMAX, dtype=cv2.CV_8U)
heatmapshow = cv2.applyColorMap(heatmapshow, cv2.COLORMAP_JET)
cv2.imshow("Heatmap", heatmapshow)
cv2.waitKey(0)