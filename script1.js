let pos=[];
let facenum=[];
let facecolor=[];
let transparency=[];
let edgeweight=[];
let edgecolor=[];
let geonum=0;  

function addData(v,f,c=[255,255,255],t,ew,ec){
    pos[geonum]=new Array(v.length);
    for(let i=0;i<pos[geonum].length;i++)   pos[geonum][i]=[];
    for(let i=0;i<v.length;i++) for(let j=0;j<3;j++)    pos[geonum][i][j]=v[i][j];
    facenum[geonum]=new Array(f.length);
    for(let i=0;i<facenum[geonum].length;i++)   facenum[geonum][i]=[];
    for(let i=0;i<f.length;i++)   for(let j=0;j<f[i].length;j++) facenum[geonum][i][j]=f[i][j];

    facecolor[geonum]=c;
    transparency[geonum]=t;
    edgeweight[geonum]=ew;
    edgecolor[geonum]=ec;

    geonum++;
}