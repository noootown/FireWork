
import {FireworkPoint} from './manager';
export function getFireworkPoints(x,y,color,type,ctx){
    let fire=[];
    let tmpNum;
    let angle;
    let i;
    if(type==1){//正常
        tmpNum=Math.random()*200+200;
        for(i=0;i<tmpNum;i++)
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
            angle=2*Math.PI*Math.random();
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
        angle=20*ran()+20;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.08+ran()*0.01,2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=90;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.12*cos(50)/cos(abs(i-50))+ran()*0.01,deg2rad(-i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
    }
    else if(type==62){//b
        tmpNum=360;
        angle=20*ran()+120;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.08+ran()*0.01,2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=110;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.12*cos(40)/cos(abs(i-40))+ran()*0.01,deg2rad(i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
    }
    else if(type==63){//c
        tmpNum=300;
        angle=50*ran();
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1+ran()*0.01,deg2rad(i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
    }
    else if(type==64){//d
        tmpNum=360;
        angle=-20*ran()+40;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1+ran()*0.01,2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=110;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.14*cos(40)/cos(abs(i-40))+ran()*0.01,deg2rad(-i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
    }
    else if(type==65){//e
        tmpNum=320;
        angle=70*ran();
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1+ran()*0.01,deg2rad(i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=50;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1*i/tmpNum,deg2rad(angle-40),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=50;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1*i/tmpNum,deg2rad(angle+140),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
    }
    else if(type==66){//f
        tmpNum=180;
        angle=-10+20*ran();
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.06+ran()*0.01,deg2rad(i+180),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=150;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.06/cos(abs(i/2))+ran()*0.01,deg2rad(180+angle-i/2),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
        tmpNum=80;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.06/cos(50)*cos(40)/cos(i-20),deg2rad(70+angle+i),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
    }
    else if(type==67){//g
        tmpNum=360;
        angle=20*ran()-10;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1+ran()*0.01,2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=110;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.14*cos(40)/cos(abs(i-40))+ran()*0.01,deg2rad(angle+i-45),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
        tmpNum=5;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.14*cos(40)/cos(abs(i-70))+ran()*0.01,deg2rad(angle+65-i),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
        tmpNum=35;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.14*cos(40)/cos(70),deg2rad(angle+i+65),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
    }
    else if(type==68){//h
        tmpNum=80;
        angle=-10+ran()*20;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.11+ran()*0.01,deg2rad(-i-50+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=60;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.11*cos(50)/cos(abs(i-50))+ran()*0.01,deg2rad(-50+i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
        tmpNum=85;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.11*cos(50)/cos(abs(i-75))+ran()*0.01,deg2rad(-105-i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
        tmpNum=25;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.11*cos(50)/cos(abs(i-75))+ran()*0.01,deg2rad(-105-i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
    }
    else if(type==69){//i
        angle=-100+20*ran();
        tmpNum=50;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.155+ran()*0.01,deg2rad(angle+ran()*4-2),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=70;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.12*i/tmpNum,deg2rad(angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        angle-=180;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.05*i/tmpNum,deg2rad(angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
    }
    else if(type==70){//j
        tmpNum=180;
        angle=-10+20*ran();
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.06+ran()*0.01,deg2rad(i),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=140;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.06/cos(i/2)+ran()*0.01,deg2rad(angle-i/2),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
        tmpNum=20;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.06/cos(77)-0.04,deg2rad(angle-75+4*ran()),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
    }
    else if(type==71){//k
        angle=-55+20*ran();
        tmpNum=50;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.093*i/tmpNum,deg2rad(angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        angle+=90;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.093*i/tmpNum,deg2rad(angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=70;
        angle+=45;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.07*i/tmpNum,deg2rad(angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        angle-=180;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.14*i/tmpNum,deg2rad(angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
            
    }
    else if(type==72){//l
        angle=-100+20*ran();
        tmpNum=70;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.17*i/tmpNum,deg2rad(angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        angle-=180;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.07*i/tmpNum,deg2rad(angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
    }
    else if(type==73){//m
        tmpNum=180;
        angle=-10+20*ran();
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.09*i/tmpNum,-Math.acos(i/tmpNum)-PI2*(0-angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.09*i/tmpNum,Math.acos(i/tmpNum)+PI2*(1/2+angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=45;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.09/cos(i),deg2rad(i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.09*i/tmpNum,deg2rad(90+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=75;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.09/cos(i-45),deg2rad(i+135+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
    }
    else if(type==74){//n
        tmpNum=80;
        angle=-10+ran()*20;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.11+ran()*0.01,deg2rad(-i-50+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=60;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.11*cos(50)/cos(abs(i-50))+ran()*0.01,deg2rad(-50+i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
        tmpNum=70;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.11*cos(50)/cos(abs(i-60))+ran()*0.01,deg2rad(-120-i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
    }
    else if(type==75){//o
        tmpNum=360;
        angle=20*ran()+20;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1+ran()*0.01,2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
    }
    else if(type==76){//p
        tmpNum=360;
        angle=20*ran()+200;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1+ran()*0.01,2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=110;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.14*cos(40)/cos(abs(i-40))+ran()*0.01,deg2rad(angle-i),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
    }
    else if(type==77){//q
        tmpNum=360;
        angle=-20*ran()-20;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1+ran()*0.01,2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=110;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.14*cos(40)/cos(abs(i-40))+ran()*0.01,deg2rad(angle+i),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
    }
    else if(type==78){//r
        tmpNum=80;
        angle=-10+ran()*20;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.11+ran()*0.01,deg2rad(-i-50+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=70;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.11*cos(50)/cos(abs(i-60))+ran()*0.01,deg2rad(-120-i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
    }
    else if(type==79){//s
        tmpNum=180;
        angle=-10+20*ran();
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.09*i/tmpNum,-Math.acos(i/tmpNum)-PI2*(1/4-angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.09*i/tmpNum,-Math.acos(i/tmpNum)+PI2*(1/4+angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=35;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.09,deg2rad(-95+i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.09,deg2rad(85+i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
    }
    else if(type==80){//t
        tmpNum=180;
        angle=-10+20*ran();
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.06+ran()*0.01,deg2rad(i),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=140;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.06/cos(abs(i/2))+ran()*0.01,deg2rad(180+angle+i/2),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
        tmpNum=70;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.06/cos(60)*cos(30)/cos(i-20),deg2rad(-70+angle-i),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
    }
    else if(type==81){//u
        tmpNum=60;
        angle=-10+ran()*20;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.11+ran()*0.01,deg2rad(i+60+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=68;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.11*cos(60)/cos(abs(i-68))+ran()*0.01,deg2rad(68-i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
        tmpNum=60;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.11*cos(60)/cos(abs(i-60))+ran()*0.01,deg2rad(120+i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
    }
    else if(type==82){//v
        angle=180+ran()*20;
        tmpNum=100;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.14*cos(40)/cos(abs(i-40))+ran()*0.01,deg2rad(angle-i),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
        angle-=200;
        tmpNum=100;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.14*cos(40)/cos(abs(i-40))+ran()*0.01,deg2rad(i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
    }
    else if(type==83){//w
        angle=105+30*ran();
        tmpNum=50;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1*i/tmpNum,deg2rad(angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=90;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1*cos(40)/cos(abs(i-40))+ran()*0.01,deg2rad(angle+i),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
        tmpNum=50;
        angle-=60;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1*i/tmpNum,deg2rad(angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=90;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1*cos(40)/cos(abs(i-40))+ran()*0.01,deg2rad(angle-i),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
    }
    else if(type==84){//x
        angle=-70+30*ran();
        tmpNum=50;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1*i/tmpNum,deg2rad(angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1*i/tmpNum,deg2rad(angle+180),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        angle+=110;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1*i/tmpNum,deg2rad(angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1*i/tmpNum,deg2rad(angle+180),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
    }
    else if(type==85){//y
        angle=-70+30*ran();
        tmpNum=50;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1*i/tmpNum,deg2rad(angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1*i/tmpNum,deg2rad(angle+180),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        angle+=110;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1*i/tmpNum,deg2rad(angle+180),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
    }
    else if(type==86){//z
        angle=-70+30*ran();
        tmpNum=50;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1*i/tmpNum,deg2rad(angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=70;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1*cos(35)/cos(abs(i-35))+ran()*0.01,deg2rad(-i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
        angle-=180;
        tmpNum=50;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1*i/tmpNum,deg2rad(angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx));
        tmpNum=70;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.1*cos(35)/cos(abs(i-35))+ran()*0.01,deg2rad(-i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx));
    }
    return fire;
}

function cos(x){
    return Math.cos(2*Math.PI*x/360);
}

//function sin(x){
    //return Math.sin(2*Math.PI*x/360);
//}

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
