let pos=[];
let facenum=[];
let geonum=0;  

function addData(v,f){
    /*pos[geonum]=new Array(v.length);
    for(let i=0;i<pos[geonum].length;i++)   pos[geonum][i]=[];*/
    if(geonum==0){
        for(let i=0;i<v.length;i++) pos[i]=[];
        for(let i=0;i<v.length;i++) for(let j=0;j<3;j++)    pos[i][j]=v[i][j];
    }
    facenum[geonum]=new Array(f.length);
    for(let i=0;i<facenum[geonum].length;i++)   facenum[geonum][i]=[];
    for(let i=0;i<f.length;i++)   for(let j=0;j<f[i].length;j++) facenum[geonum][i][j]=f[i][j];

    geonum++;
}