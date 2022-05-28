function disableScroll(event) { //スマホの縦スクロールを制限
    event.preventDefault();
}
document.addEventListener('touchmove', disableScroll, { passive: false });

let theta=0,n,size,sw=1;
let select,check;

function setup(){
    size=min(windowWidth,windowHeight);
    createCanvas(size,size,WEBGL);    //キャンバスのサイズ　正方形
    n=createVector(1,0,0);  //回転軸のベクトル

    /*
    let url=createA('https://google.com','Google'); //リンクの生成　('url','リンクの名前')
    url.position(0,size);   
    url.style('font-size',size/25+'px');
    */

    select=createSelect();  //セレクトボックスの生成
    select.style('font-size',size/25+'px');
    select.option('正十二面体');
    select.option('正十二面体２');
    select.option('正十二面体と長方形');
    select.option('正十二面体と長方形２');
    select.option('正十二面体と立方体');

    select.selected('正十二面体');

    ortho(-width/2,width/2,-height/2,height/2,0,size*scal*2);
}

//描写
function draw(){    
    background(220);   //背景色

    scale(size*scal*0.2);   //スケール

    let list=[];
    if(select.value()=='正十二面体'||select.value()=='正十二面体２')    list=[0];
    if(select.value()=='正十二面体と長方形')    list=[0,1];
    if(select.value()=='正十二面体と長方形２')    list=[0,1,2,3];
    if(select.value()=='正十二面体と立方体')    list=[0,1,2,3,4];

    
    for(let k=0;k<list.length;k++)  for(let i=0;i<facenum[list[k]].length;i++){  
        strokeWeight(size/100);
        if(select.value()=='正十二面体'){
            fill(255,100,100);
            stroke(0);
        }

        if(select.value()=='正十二面体２'){
            noFill();
            stroke(0);
        }

        if(select.value()=='正十二面体と長方形'||select.value()=='正十二面体と長方形２'||select.value()=='正十二面体と立方体'){
            if(k==0){
                noFill();
                stroke(0);
            }
            if(k==1){
                fill(255,0,0);
                noStroke();
            }
            if(k==2){
                fill(0,255,0);
                noStroke();
            }
            if(k==3){
                fill(0,0,255);
                noStroke();
            }
            if(k==4){
                noFill();
                stroke(255,155,0);
            }
        }

        beginShape();
        for(let j=0;j<facenum[list[k]][i].length;j++){
            vertex(pos[facenum[list[k]][i][j]-1][0],pos[facenum[list[k]][i][j]-1][1],pos[facenum[list[k]][i][j]-1][2]);
        }
        endShape(CLOSE);
        
        if((select.value()=='正十二面体２'||select.value()=='正十二面体と長方形'||select.value()=='正十二面体と長方形２'||select.value()=='正十二面体と立方体')&&k==0){
            stroke(255);
            strokeWeight(size*1.5/100);
            beginShape();
            for(let j=0;j<facenum[list[k]][i].length;j++){
                vertex(pos[facenum[list[k]][i][j]-1][0]*0.98, pos[facenum[list[k]][i][j]-1][1]*0.98, pos[facenum[list[k]][i][j]-1][2]*0.98);
            }
            endShape(CLOSE);  
        }
    }


    //回転
    if(mouseIsPressed==false){  
        for(let i=0;i<pos.length;i++){
            let v=createVector(pos[i][0],pos[i][1],pos[i][2]);
            theta=constrain(theta,0,0.1);
            v=rot(v,n,theta*deltaTime*0.04);
            pos[i][0]=v.x;
            pos[i][1]=v.y;
            pos[i][2]=v.z;
        }
    }else   mousedrag();

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
    for(let i=0;i<pos.length;i++){   
        let v=createVector(0,0,0);
    
        v=v.set(pos[i][0],pos[i][1],pos[i][2]);
        
        v=rot(v,n,theta*deltaTime*0.04);
        pos[i][0]=v.x;
        pos[i][1]=v.y;
        pos[i][2]=v.z;
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

