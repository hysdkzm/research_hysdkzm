from mayavi import mlab
from tvtk.api import tvtk

def sphere_plot(image_file):

    # 図形ウィンドウをジェネレート
    fig = mlab.figure(size=(800, 800))

    # マップ画像をテクスチャにロードする
    img = tvtk.JPEGReader()
    img.file_name = image_file
    texture = tvtk.Texture(input_connection=img.output_port, interpolate=1)



    R = 1 # 球の半径
    Nrad = 1000 # テクスチャの分割数

    # テクスチャをマッピングする半径Rの球面を生成
    sphere = tvtk.TexturedSphereSource(radius=R, theta_resolution=Nrad,
                                       phi_resolution=Nrad)

    # 図形ウィンドウにテクスチャのマッパーとアクターを紐づける
    sphere_mapper = tvtk.PolyDataMapper(input_connection=sphere.output_port)
    sphere_actor = tvtk.Actor(mapper=sphere_mapper, texture=texture)
    fig.scene.add_actor(sphere_actor)

    mlab.show()



if __name__ == "__main__":

    # 5400x2700
    image_file = 'world.topo.bathy.200412.3x5400x2700.jpg'
    sphere_plot(image_file)
