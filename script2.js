function disableScroll(event) { //スマホの縦スクロールを制限
    event.preventDefault();
}
document.addEventListener('touchmove', disableScroll, { passive: false });

let theta=0,n,size,sw=1;
let select,check;
let selectword=[
    '正十二面体',                   //0
    '正十二面体面なし',             //1
    '正十二面体と長方形',           //2
    '正十二面体と３長方形',         //3
    '正十二面体・長方形・立方体',   //4
    '正十二面体と立方体',           //5
    '正十二面体と５立方体',         //6
    '正十二面体と正四面体',         //7
    '正十二面体と５正四面体'        //8
];

let list=[0];
let poscopy;

function setup(){
    size=min(windowWidth,windowHeight);
    if(windowWidth>windowHeight)    size*=0.9;
    createCanvas(size,size,WEBGL);    //キャンバスのサイズ　正方形
    n=createVector(1,0,0);  //回転軸のベクトル

    select=createSelect();  //セレクトボックスの生成
    select.style('font-size',size/25+'px');
    for(let i=0;i<selectword.length;i++)    select.option(selectword[i]);
    select.changed(selectevent);

    poscopy=[];
    for(let i=0;i<list.length;i++){
        poscopy[i]=[];
        for(let j=0;j<pos[i].length;j++){
            poscopy[i][j]=pos[list[i]][j].concat();
        }
    }

}

//描写
function draw(){    

    background(backgroundcolor[0],backgroundcolor[1],backgroundcolor[2]);   //背景色
    ortho(-width/2,width/2,-height/2,height/2,0,size*scal*2);

    scale(size*scal*0.2);   //スケール

    for(let k=0;k<list.length;k++)  for(let i=0;i<facenum[list[k]].length;i++){  

        if(col[list[k]]==-1)    noFill();
        else  fill(col[list[k]]);
        strokeWeight(edgewei[list[k]]*size/500);
        if(edgecol[list[k]]==-1)    noStroke();
        else  stroke(edgecol[list[k]]);

        beginShape();
        for(let j=0;j<facenum[list[k]][i].length;j++){
            vertex(pos[list[k]][facenum[list[k]][i][j]-1][0], pos[list[k]][facenum[list[k]][i][j]-1][1], pos[list[k]][facenum[list[k]][i][j]-1][2]);
        }
        endShape(CLOSE);
        
    }


    //回転
    
    if(mouseIsPressed==false){  
        for(let k=0;k<list.length;k++){
            for(let i=0;i<pos[list[k]].length;i++){
                let v=createVector(pos[list[k]][i][0], pos[list[k]][i][1], pos[list[k]][i][2]);
                theta=constrain(theta,0,0.1);
                v=rot(v,n,theta*deltaTime*0.04);
                pos[list[k]][i][0]=v.x;
                pos[list[k]][i][1]=v.y;
                pos[list[k]][i][2]=v.z;
            }
        }
    }else   if(mouseY<size) mousedrag();

    //回転の減衰
    if(mouseIsPressed==false){  
        theta*=0.99;
    }
    
}

function mousedrag(){
    
    let angle=atan2(mouseY-pmouseY,mouseX-pmouseX)+PI/2;
    theta=map(dist(mouseX,mouseY,pmouseX,pmouseY),0,width,0,6);

    //回転軸の更新
    n.x=cos(angle); 
    n.y=sin(angle);

    //回転
    for(let k=0;k<list.length;k++){
        for(let i=0;i<pos[list[k]].length;i++){   
            let v=createVector(0,0,0);
        
            v=v.set(pos[list[k]][i][0],pos[list[k]][i][1],pos[list[k]][i][2]);
            
            v=rot(v,n,theta*deltaTime*0.04);
            pos[list[k]][i][0]=v.x;
            pos[list[k]][i][1]=v.y;
            pos[list[k]][i][2]=v.z;
        }  
    }  
    
}


function selectevent(){

    for(let i=0;i<list.length;i++)  for(let j=0;j<poscopy[i].length;j++)    pos[list[i]][j]=poscopy[i][j].concat();

    if(select.value()==selectword[0])   list=[0];
    if(select.value()==selectword[1])   list=[1];
    if(select.value()==selectword[2])   list=[1,2];
    if(select.value()==selectword[3])   list=[1,2,3,4];
    if(select.value()==selectword[4])   list=[1,2,3,4,5];
    if(select.value()==selectword[5])   list=[1,6];
    if(select.value()==selectword[6])   list=[1,6,7,8,9,10];
    if(select.value()==selectword[7])   list=[1,11];
    if(select.value()==selectword[8])   list=[1,11,12,13,14,15];

    poscopy=[];
    for(let i=0;i<list.length;i++){
        poscopy[i]=[];
        for(let j=0;j<pos[i].length;j++){
            poscopy[i][j]=pos[list[i]][j].concat();
        }
    }
    
}


function rot(v,n,theta){

    let temx=v.x,temy=v.y,temz=v.z,x,y,z;
    n=n.normalize();

    x=(n.x*n.x*(1-cos(theta))+cos(theta))*temx+(n.x*n.y*(1-cos(theta))-n.z*sin(theta))*temy+(n.x*n.z*(1-cos(theta))+n.y*sin(theta))*temz;
    y=(n.x*n.y*(1-cos(theta))+n.z*sin(theta))*temx+(n.y*n.y*(1-cos(theta))+cos(theta))*temy+(n.y*n.z*(1-cos(theta))-n.x*sin(theta))*temz;
    z=(n.x*n.z*(1-cos(theta))-n.y*sin(theta))*temx+(n.y*n.z*(1-cos(theta))+n.x*sin(theta))*temy+(n.z*n.z*(1-cos(theta))+cos(theta))*temz;

    let result=createVector(x,y,z);
    return result;
}

