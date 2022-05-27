function disableScroll(event) { //スマホの縦スクロールを制限
    event.preventDefault();
}
document.addEventListener('touchmove', disableScroll, { passive: false });

let theta=0,n,size;
let select,check;

function setup(){
    size=min(windowWidth,windowHeight);
    createCanvas(size,size,WEBGL);    //キャンバスのサイズ　正方形
    n=createVector(1,0,0);  //回転軸のベクトル

    let url=createA('https://google.com','Google'); //リンクの生成　('url','リンクの名前')
    url.position(0,size);   
    url.style('font-size',size/25+'px');

    select=createSelect();  //セレクトボックスの生成
    select.position(width*0.7,size);
    select.style('font-size',size/25+'px');
    select.option('透視投影');
    select.option('平行投影');

    check=createCheckbox('輪郭線のみ',false);   //チェックボックスの生成
    check.position(width*0.7,size+size/15);
    check.style('font-size',size/25+'px');

}

//描写
function draw(){    
    background(backgroundcolor[0],backgroundcolor[1],backgroundcolor[2]);   //背景色

    scale(size*scal*0.1);   //スケール

    if(select.value()=='透視投影'){
        perspective();
        strokeWeight(1);
    }else{
        ortho(-width/2,width/2,-height/2,height/2,0,size*scal*2);
        strokeWeight(2);
    }
    
    //立体の描写
    stroke(0);  //輪郭の色
    for(let k=0;k<geonum;k++)   for(let i=0;i<facenum[k].length;i++){   
        if(check.checked())   noFill(); //面の色
        else    fill(col[k][0],col[k][1],col[k][2]);
        beginShape();
        for(let j=0;j<facenum[k][i].length;j++){
            vertex(pos[k][facenum[k][i][j]-1][0],pos[k][facenum[k][i][j]-1][1],pos[k][facenum[k][i][j]-1][2]);
        }
        endShape(CLOSE);
    }

    //回転
    if(mouseIsPressed==false){  
        for(let k=0;k<geonum;k++)   for(let i=0;i<pos[k].length;i++){
            let v=createVector(pos[k][i][0],pos[k][i][1],pos[k][i][2]);
            theta=constrain(theta,0,0.1);
            v=rot(v,n,theta*deltaTime*0.04);
            pos[k][i][0]=v.x;
            pos[k][i][1]=v.y;
            pos[k][i][2]=v.z;
        }
    }

    //回転の減衰
    if(mouseIsPressed==false){  
        theta*=0.99;
    }
}

function mouseDragged(){
    let angle=atan2(mouseY-pmouseY,mouseX-pmouseX)+PI/2;
    theta=map(dist(mouseX,mouseY,pmouseX,pmouseY),0,width,0,6);

    //回転軸の更新
    n.x=cos(angle); 
    n.y=sin(angle);

    //回転
    for(let k=0;k<geonum;k++)   for(let i=0;i<pos[k].length;i++){   
        let v=createVector(0,0,0);
    
        v=v.set(pos[k][i][0],pos[k][i][1],pos[k][i][2]);
        
        v=rot(v,n,theta*deltaTime*0.04);
        pos[k][i][0]=v.x;
        pos[k][i][1]=v.y;
        pos[k][i][2]=v.z;
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

