vts1=[[3.23607, 1.23607, 0. ], [0., -3.23607, -1.23607], [-1.23607, 0.,  3.23607], [-2., 2., -2.]]
vts2=[[2., 2., -2.] , [2., -2., 2. ], [-2.,  2., 2.] , [-2., -2., -2.]]
vts3=[[-3.23607, -1.23607,  0.] , [0., 3.23607, -1.23607] , [1.23607, 0.,  3.23607] , [2., -2., -2.]]
vts4=[[3.23607, -1.23607, 0.] , [0., 3.23607, 1.23607] , [-1.23607, 0., -3.23607], [-2., -2., 2.]]
vts5=[[-3.23607, 1.23607, 0.] , [0., -3.23607,  1.23607] , [1.23607, 0., -3.23607] , [2., 2., 2.]]
faces=[[1,3,2],[1,4,3],[2,3,4],[4,1,2]]

addData(vts1,faces);
addData(vts2,faces,[255,255,0]);
addData(vts3,faces,[255,0,255]);
addData(vts4,faces,[0,255,255]);
addData(vts5,faces,[150,255,150]);

