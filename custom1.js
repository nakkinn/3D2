vts1=[[3.23607, 1.23607, 0. ], [0., -3.23607, -1.23607], [-1.23607, 0.,  3.23607], [-2., 2., -2.]]
vts2=[[2., 2., -2.] , [2., -2., 2. ], [-2.,  2., 2.] , [-2., -2., -2.]]
vts3=[[-3.23607, -1.23607,  0.] , [0., 3.23607, -1.23607] , [1.23607, 0.,  3.23607] , [2., -2., -2.]]
vts4=[[3.23607, -1.23607, 0.] , [0., 3.23607, 1.23607] , [-1.23607, 0., -3.23607], [-2., -2., 2.]]
vts5=[[-3.23607, 1.23607, 0.] , [0., -3.23607,  1.23607] , [1.23607, 0., -3.23607] , [2., 2., 2.]]
faces=[[1,3,2],[1,4,3],[2,3,4],[4,1,2]]
lines=[[1,3],[1,4],[2,3],[4,1]];

addData(vts1,faces,[100,100,100],1,1,[0,0,0]);
addData(vts2,faces,[255,255,0],1,3,[255,255,255]);
addData(vts3,faces,[255,0,255],1,0,[255,0,0]);
addData(vts4,lines,[0,0,0],1,2,[0,150,255]);
addData(vts5,faces,[150,255,150],0,4,[0,255,0]);
//addData(頂点座標配列, 面番号配列, 面の色, 面の透明度(1:不透明,0:透明), 辺の太さ(0:辺なし,小数も可), 辺の色)




