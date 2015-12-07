
import {FireworkPoint} from './manager';
export function getFireworkPoints(x,y,color,type,ctx){
    let fire=[];
    let tmpNum;
    if(type==1){//正常
        tmpNum=Math.random()*200+200;
        for(var i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,Math.random()*0.5,Math.random()*2*Math.PI,color,Math.random()*2,Math.random()*400+800,0,0.0003,ctx));
    }
    else if(type==2){//同心圓
        tmpNum=360;
        for(i=0;i<6;i++)
            for(var j=0;j<tmpNum/6;j++)
                fire.push(new FireworkPoint(x,y,i/24+Math.random()*0.02,2*Math.PI*j/(tmpNum/6),color,Math.random()*2,Math.random()*200+800,0,0.00005,ctx));
    }
    else if(type==3){//圓
        tmpNum=360;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.5,2*Math.PI*i/tmpNum,color,Math.random()*2,Math.random()*200+800,0,0.0003,ctx));
    }
    else if(type==4){//大煙火
        tmpNum=1800;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,Math.random()*0.5,Math.random()*2*Math.PI,color,Math.random()*2,Math.random()*1000+600,0,0.0003,ctx));
    }
    else if(type==5){//破碎圓
        tmpNum=720;
        for(i=0;i<8;i++)
            for(j=0;j<tmpNum/8;j++)
                fire.push(new FireworkPoint(x,y,0.5,2*Math.PI* (i/8+(Math.random()*15+15)/360) ,color,Math.random()*2,Math.random()*200+800,0,0.0003,ctx));
    }
    else if(type==6){//太陽
        tmpNum=720;
        for(i=0;i<20;i++)
            for(j=0;j<tmpNum/20;j++)
                fire.push(new FireworkPoint(x,y,Math.random()*0.3,2*Math.PI*i/20 ,color,Math.random()*2,Math.random()*200+800,0,0.0003,ctx));
    }
    else if(type==7){//放射狀
        tmpNum=3000;
        for(i=0;i<150;i++){
            var angle=2*Math.PI*Math.random();
            var speedMax=Math.random()*0.15+0.15;
            for(j=0;j<tmpNum/150;j++)
                fire.push(new FireworkPoint(x,y,Math.random()*speedMax,angle ,color,Math.random()*2,Math.random()*400+600,0,0.00005,ctx));
        }
    }
    else if(type==8){//小炮
        tmpNum=200;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,Math.random()*0.3,2*Math.PI*Math.random(),color,Math.random()*2,Math.random()*100+200,0,0.0003,ctx));
    }
    else if(type==61){//a
        tmpNum=360;
        let angle=20*ran()+20;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1+ran()*0.01,2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=90;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.16*cos(50)/cos(abs(i-50))+ran()*0.01,deg2rad(-i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
    }
    else if(type==62){//b
        tmpNum=360;
        let angle=20*ran()+120;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1+ran()*0.01,2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=110;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.15*cos(40)/cos(abs(i-40))+ran()*0.01,deg2rad(i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
    }
    else if(type==63){//c
        tmpNum=300;
        let angle=50*ran();
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1+ran()*0.01,deg2rad(i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
    }
    else if(type==64){//d
        tmpNum=360;
        let angle=-20*ran()+40;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1+ran()*0.01,2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=110;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.15*cos(40)/cos(abs(i-40))+ran()*0.01,deg2rad(-i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
    }
    else if(type==65){//e
        tmpNum=300;
        let angle=70*ran();
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1+ran()*0.01,deg2rad(i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=50;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1*i/tmpNum,deg2rad(angle-60),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=50;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1*i/tmpNum,deg2rad(angle+120),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
    }
    else if(type==66){//f
    }
    else if(type==67){//g
    }
    else if(type==68){//h
    }
    else if(type==69){//i
    }
    else if(type==70){//j
    }
    else if(type==71){//k
    }
    else if(type==72){//l
    }
    else if(type==73){//m
    }
    else if(type==74){//n
    }
    else if(type==75){//o
    }
    else if(type==76){//p
    }
    else if(type==77){//q
    }
    else if(type==78){//r
    }
    else if(type==79){//s
    }
    else if(type==80){//t
    }
    else if(type==81){//u
    }
    else if(type==82){//v
    }
    else if(type==83){//w
    }
    else if(type==84){//x
    }
    else if(type==85){//y
    }
    else if(type==86){//z
    }
    return fire;
}

function cos(x){
    return Math.cos(2*Math.PI*x/360);
}

function sin(x){
    return Math.sin(2*Math.PI*x/360);
}

function abs(x){
    return Math.abs(x);
}

function deg2rad(x){
    return Math.PI*2*x/360;
}
function ran(){
    return Math.random();
}

var PI2=Math.PI*2;
