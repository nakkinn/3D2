function disableScroll(event) { //スマホの縦スクロールを制限
    event.preventDefault();
}
document.addEventListener('touchmove', disableScroll, { passive: false });

let theta=0,n;

function setup(){
    let s=min(windowWidth,windowHeight);
    createCanvas(s,s,WEBGL);
    n=createVector(1,0,0);
}

function draw(){    //描写
    background(220);

    scale(80);

    for(let k=0;k<geonum;k++)   for(let i=0;i<facenum[k].length;i++){
        stroke(255);
        fill(col[k][0],col[k][1],col[k][2]);
        beginShape();
        for(let j=0;j<facenum[k][i].length;j++){
            vertex(pos[k][facenum[k][i][j]-1][0],pos[k][facenum[k][i][j]-1][1],pos[k][facenum[k][i][j]-1][2]);
        }
        endShape(CLOSE);
    }

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

    if(mouseIsPressed==false){
        theta*=0.99;
    }
}

function mouseDragged(){
    let angle=atan2(mouseY-pmouseY,mouseX-pmouseX)+PI/2;
    theta=map(dist(mouseX,mouseY,pmouseX,pmouseY),0,width,0,6);

    n.x=cos(angle);
    n.y=sin(angle);

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

