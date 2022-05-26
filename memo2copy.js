let n;
let p=
[
    [ [-1,-1,-1],[-1,-1, 1],[ 1,-1, 1],[ 1,-1,-1] ],
    [ [-1, 1,-1],[-1, 1, 1],[ 1, 1, 1],[ 1, 1,-1] ],
    [ [-1,-1,-1],[-1,-1, 1],[-1, 1, 1],[-1, 1,-1] ],
    [ [ 1,-1,-1],[ 1,-1, 1],[ 1, 1, 1],[ 1, 1,-1] ],
    [ [-1,-1,-1],[-1, 1,-1],[ 1, 1,-1],[ 1,-1,-1] ],
    [ [-1,-1, 1],[-1, 1, 1],[ 1, 1, 1],[ 1,-1, 1] ]
];


let c=['#555555','#ff4500','#b0c4de','#ffff00','#32cd32','#8b008b'];
let num=0,theta=0;

function setup(){
    createCanvas(windowWidth,windowHeight,WEBGL);
    n=createVector(1,0,0);
}

function draw(){
    background(20);
    orbitControl(5,5);

    scale(60);


    for(let i=0;i<p.length;i++){

        if(i<p.length-num){
            fill(c[i]);
            beginShape();
            for(let j=0;j<4;j++)    vertex(p[i][j][0],p[i][j][1],p[i][j][2]);
            endShape(CLOSE);
        }
    }
    

}
