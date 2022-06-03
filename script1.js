let pos=[];
let facenum=[];
let col=[];
let edgecol=[];
let edgewei=[];
let geonum=0;  

function addData(v,f,c,ec,ew){
    pos[geonum]=new Array(v.length);
    for(let i=0;i<pos[geonum].length;i++)   pos[geonum][i]=[];
    for(let i=0;i<v.length;i++) for(let j=0;j<3;j++)    pos[geonum][i][j]=v[i][j];
    
    facenum[geonum]=new Array(f.length);
    for(let i=0;i<facenum[geonum].length;i++)   facenum[geonum][i]=[];
    for(let i=0;i<f.length;i++)   for(let j=0;j<f[i].length;j++) facenum[geonum][i][j]=f[i][j];

    col[geonum]=c;
    edgecol[geonum]=ec;
    edgewei[geonum]=ew;

    geonum++;
}