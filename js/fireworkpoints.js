'use strict';
import {FireworkPoint} from './manager';
import {hsvRand,hsv,cos,sin,abs,deg2rad,ran,rand,sqrt,PI2} from './util';

//important refactor!!!!
//must change function parameters to one object

export function getFireworkPoints(x,y,type,ctx){
    let fire=[]; //要return 的fireworPoint陣列
    let tmpNum; 
    let angle=0;
    let i,j;
    let color=hsvRand(1);
    let time;
    let radius=1;
    let delayTime;
    let invisibleTime=0;
    let speed=0;
    let friction=0;
    if(type==1){//1
        tmpNum=rand(200)+200;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,Math.random()*0.5,Math.random()*2*Math.PI,color,Math.random()*2,Math.random()*400+800,0,0.0003,ctx,invisibleTime, friction));
    }
    else if(type==2){//2
        color=hsvRand(2);
        tmpNum=200;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,Math.random()*0.3,2*Math.PI*Math.random(),color,Math.random()*2,Math.random()*100+200,0,0.0003,ctx,invisibleTime, friction));
    }
    else if(type==3){//3
        color=hsvRand(2);
        tmpNum=1500;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,rand(1)>0.3?rand(0.5)+0.15:rand(0.5),Math.random()*2*Math.PI,color,Math.random()*2,Math.random()*1000+600,0,0.0003,ctx,invisibleTime, friction));
        tmpNum=500;
        color='rgb(255, 255, 255)';
        for(i=0;i<tmpNum;i++){
            time=rand(300)+300;
            fire.push(new FireworkPoint(x-500+rand(1000),y+100+rand(600),0,0,color,Math.random()*2,1610+time,0,0,ctx,1600+time));
        }
    }
    else if(type==4){//4
        color=hsvRand(2);
        tmpNum=720;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.5,2*Math.PI*i/tmpNum,color,Math.random()*2,Math.random()*200+800,0,0.0003,ctx,invisibleTime, friction));
    }
    else if(type==5){//5
        color=hsvRand(2);
        tmpNum=720;
        for(i=0;i<8;i++)
            for(j=0;j<tmpNum/8;j++)
                fire.push(new FireworkPoint(x,y,0.5,2*Math.PI* (i/8+(Math.random()*15+15)/360) ,color,Math.random()*2,Math.random()*200+800,0,0.0003,ctx,invisibleTime, friction));
    }
    else if(type==6){//6
        color=hsvRand(3,[142,234,342,298,204,116]);
        speed=0.13;
        tmpNum=5;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++){
                angle=deg2rad(j/tmpNum*360+rand(15));
                for(let k=0;k<10;k++)
                    fire.push(new FireworkPoint(x,y,speed+i/32-0.015+ran()*0.03-k/15*0.02,angle,color,(-abs(k-5)+5)/5*2,Math.random()*200+800,0,0.0001,ctx,invisibleTime, friction));

            }
            tmpNum+=5;
        }
        color=hsv(60);
        speed=0.04;
        tmpNum=4;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++){
                angle=deg2rad(j/tmpNum*360+rand(30));
                for(let k=0;k<15;k++)
                    fire.push(new FireworkPoint(x,y,speed+i/32-0.015+ran()*0.03-k/15*0.02,angle,color,(-abs(k-15)+15)/15*1,Math.random()*200+800,0,0.0001,ctx,invisibleTime, friction));

            }
            tmpNum+=3;
        }
    }
    else if(type==7){//7
        let arr=[60,62,64,90,128,146,240,300];
        let col=arr[Math.floor(rand(arr.length))];
        color=hsv(col);
        let white=false;
        if(col==60 || col==62 || col==64 || col==90 || col==128 ||col==146)
            white=true;
        let random=24+Math.floor(rand(16));
        let gravity=0.0001;
        angle=deg2rad(rand(360));
        for(i=0;i<random;i++){
            angle=angle+deg2rad(360/random+rand(5));
            speed=0.3+rand(0.2);
            friction=0.00045+rand(0.0001);
            for(let k=0;k<50;k++){
                fire.push(new FireworkPoint(x,y,k/50*speed,angle+deg2rad(rand(2)),(k/100*speed<0.05 && rand(1)>0.6 && white) || ((col==60 || col==62 || col==64) && rand(1)>0.65)?'rgb(255,255,255)':color,(-abs(k-25)+25)/25*2,Math.random()*200+400,0,gravity+0.0002*k/100,ctx,invisibleTime, friction));
            }
        }
    }
    else if(type==8){//8
        let arealen;
        color='rgb(255,255,255)';
        for(let k=0;k<500;k++){
            arealen=rand(200)+k/5;
            angle=rand(360);
            delayTime=0;
            time=rand(300)+300;
            let areax=x+arealen*cos(angle);
            let areay=y+arealen*sin(angle);
            fire.push(new FireworkPoint(areax,areay,0,0,color,rand(2),time+10,0,0,ctx,time,friction));
        }
    }
    else if(type==9){//9
        angle=ran()*60;
        delayTime=250+ran()*250;
        tmpNum=100;
        for(j=0;j<6;j++){
            color=hsvRand(2);
            delayTime=350+ran()*350;
            for(i=0;i<tmpNum;i++)
                fire.push(new FireworkPoint(x+100*cos(angle+60*j),y+100*sin(angle+60*j),Math.random()*0.3,2*Math.PI*Math.random(),color,Math.random()*2,Math.random()*100+200,delayTime ,0.0003,ctx,invisibleTime, friction));
        }
    }
    else if(type==0){//0
        angle=ran()*60;
        for(let k=0;k<6;k++){
            color=hsvRand(2);
            delayTime=400+ran()*200;
            tmpNum=0;
            let len=100+rand(100);
            for(i=0;i<6;i++){
                for(j=0;j<tmpNum;j++){
                    speed=i/16-0.03+ran()*0.06;
                    radius=rand(2);
                    time=rand(100)+300;
                    fire.push(new FireworkPoint(x+len*cos(angle+60*k),y+len*sin(angle+60*k),speed,deg2rad(j/tmpNum*360),color,radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
                }
                tmpNum+=8;
            }
        }
    }
    else if(type==10){//a
        let colAngle=rand(80)+300;
        color=hsv(colAngle);
        delayTime=0;
        for(let k=0;k<90;k++){
            angle=deg2rad(-4*k);
            time=rand(100)+800;
            speed=0.15*(sqrt(0.5-sin(4*k)/2)+Math.pow(2.718281828,-10*abs(4*k/360*PI2-PI2*0.75)-1.8));
            radius=3;
            fire.push(new FireworkPoint(x,y,speed,angle,'rgb(0,0,0)',radius,time,10,0.00005,ctx,invisibleTime, friction));
            radius=3.1;
            fire.push(new FireworkPoint(x,y,speed,angle,color,radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
            radius=2;
            fire.push(new FireworkPoint(x,y,speed,angle,'rgba(255,255,255,0.6)',radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
        }
        angle=deg2rad(90);
        time=rand(100)+800;
        speed=0.15*(sqrt(0.5-sin(270)/2)+Math.pow(2.718281828,-10*abs(270/360*PI2-PI2*0.75)-1.8));
        radius=3;
        fire.push(new FireworkPoint(x,y,speed,angle,'rgb(0,0,0)',radius,time,10,0.00005,ctx,invisibleTime, friction));
        radius=3.1;
        fire.push(new FireworkPoint(x,y,speed,angle,color,radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
        radius=2;
        fire.push(new FireworkPoint(x,y,speed,angle,'rgba(255,255,255,0.6)',radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==11){//b
        let colAngle=rand(360);
        color=hsv(colAngle);
        let angle2=rand(6);
        for(let k=0;k<60;k++){
            angle=deg2rad(6*k+angle2);
            delayTime=0;
            time=rand(100)+600;
            speed=0.4+rand(0.02);
            radius=3;
            fire.push(new FireworkPoint(x,y,speed,angle,'rgb(0,0,0)',radius,time,10,0.00005,ctx,invisibleTime, friction));
            radius=3.1;
            fire.push(new FireworkPoint(x,y,speed,angle,color,radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
            radius=2;
            if(60<=colAngle && colAngle<=180)
                fire.push(new FireworkPoint(x,y,speed,angle,'rgb(255,255,255)',radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
            else
                fire.push(new FireworkPoint(x,y,speed,angle,'rgba(255,255,255,0.6)',radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
        }
    }
    else if(type==12){//c
        let arr=[0,40,60,75,90,105,120,240,270,300];
        let colAngle=arr[Math.floor(rand(arr.length))];
        color=hsv(colAngle);
        for(let k=0;k<60;k++){
            angle=deg2rad(rand(360));
            delayTime=0;
            time=rand(200)+300;
            speed=0.5+rand(0.5);
            friction=0.0025;
            radius=3;
            fire.push(new FireworkPoint(x,y,speed,angle,'rgb(0,0,0)',radius,time,delayTime+10,0.00005,ctx,invisibleTime, friction));
            radius=3.1;
            fire.push(new FireworkPoint(x,y,speed,angle,color,radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
            radius=2;
            if(colAngle==60 || colAngle==75 || colAngle==90 || colAngle==105 || colAngle==120)
                fire.push(new FireworkPoint(x,y,speed,angle,'rgb(255,255,255)',radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
            else
                fire.push(new FireworkPoint(x,y,speed,angle,'rgba(255,255,255,0.7)',radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
        }
    }
    else if(type==13){//d
        let arr=[0,40,60,90,120,180,210,225,230,235,240,242,243,244,245,270,300];
        let colAngle=arr[Math.floor(rand(arr.length))];
        color=hsv(colAngle);
        delayTime=0;
        friction=0.0025;
        for(let k=0;k<100;k++){
            angle=deg2rad(rand(360));
            time=rand(200)+300;
            speed=0.5+rand(0.3);
            radius=3;
            fire.push(new FireworkPoint(x,y,speed,angle,'rgb(0,0,0)',radius,time,10,0.00005,ctx,invisibleTime, friction));
            radius=3.1;
            fire.push(new FireworkPoint(x,y,speed,angle,color,radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
            radius=2;
            if(colAngle==60 || colAngle==75 || colAngle==90 || colAngle==105 || colAngle==120)
                fire.push(new FireworkPoint(x,y,speed,angle,'rgb(255,255,255)',radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
            else
                fire.push(new FireworkPoint(x,y,speed,angle,'rgba(255,255,255,0.6)',radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
        }
        color='rgb(255,255,255)';
        for(let k=0;k<100;k++){
            angle=deg2rad(rand(360));
            time=rand(200)+300;
            speed=0.1+rand(0.4);
            radius=3.1;
            fire.push(new FireworkPoint(x,y,speed,angle,color,radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
        }
        let arealen=0;
        color='rgb(255,255,255)';
        for(let k=0;k<50;k++){
            angle=rand(360);
            delayTime=1000+rand(200);
            k>=10?arealen+=1:arealen+=6;
            let areax=x+arealen*cos(angle);
            let areay=y+arealen*sin(angle);
            radius=3;
            fire.push(new FireworkPoint(areax,areay,0,0,'rgb(255,255,255)',radius,30,delayTime,0.00005,ctx,invisibleTime, friction));
        }
        arealen=50;
        color=hsv(colAngle);
        for(let k=0;k<150;k++){
            angle=rand(360);
            delayTime=1000+rand(200);
            k>=10?arealen+=0.8:arealen+=5;
            let areax=x+arealen*cos(angle);
            let areay=y+arealen*sin(angle);
            radius=3.1;
            fire.push(new FireworkPoint(areax,areay,0,0,color,radius,30,delayTime,0.00005,ctx,invisibleTime, friction));
            radius=2;
            fire.push(new FireworkPoint(areax,areay,0,0,'rgb(255,255,255)',radius,30,delayTime,0.00005,ctx,invisibleTime, friction));
        }
    }
    else if(type==14){//e
        let colAngle=rand(360);
        color=hsv(colAngle);
        colAngle=colAngle+90+rand(60);
        let tmpColor1=hsv(colAngle);
        colAngle=colAngle+90+rand(60);
        let tmpColor2=hsv(colAngle);
        tmpNum=rand(200)+200;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,Math.random()*0.5,Math.random()*2*Math.PI,color,Math.random()*2,Math.random()*400+800,0,0.0003,ctx,invisibleTime, friction));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,Math.random()*0.5,Math.random()*2*Math.PI,tmpColor1,Math.random()*2,Math.random()*400+800,0,0.0003,ctx,invisibleTime, friction));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,Math.random()*0.5,Math.random()*2*Math.PI,tmpColor2,Math.random()*2,Math.random()*400+800,0,0.0003,ctx,invisibleTime, friction));
    }
    else if(type==15){//f
        let colAngle=rand(360);
        color=hsv(colAngle);
        colAngle=colAngle+90+rand(60);
        let tmpColor1=hsv(colAngle);
        colAngle=colAngle+90+rand(60);
        let tmpColor2=hsv(colAngle);
        tmpNum=rand(200)+200;
        let gravity=0.0003;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,Math.random()*0.5,Math.random()*2*Math.PI,color,Math.random()*2,rand(400)+400,0,gravity,ctx,invisibleTime, friction));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,Math.random()*0.5,Math.random()*2*Math.PI,tmpColor1,Math.random()*2,rand(400)+400,0,gravity,ctx,invisibleTime, friction));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,Math.random()*0.5,Math.random()*2*Math.PI,tmpColor2,Math.random()*2,rand(400)+400,0,gravity,ctx,invisibleTime, friction));
        color=hsvRand(2);
        tmpNum=0;
        delayTime=0;
        for(let k=0;k<6;k++){
            for(j=0;j<tmpNum;j++){
                angle=rand(PI2);
                speed=k/16-0.03+ran()*0.06;
                time=rand(400)+400;
                radius=3;
                fire.push(new FireworkPoint(x,y,speed,angle,'rgb(0,0,0)',radius,time,delayTime+10,gravity,ctx,invisibleTime, friction));
                radius=3.1;
                fire.push(new FireworkPoint(x,y,speed,angle,color,radius,time,delayTime,gravity,ctx,invisibleTime, friction));
                radius=2;
                fire.push(new FireworkPoint(x,y,speed,angle,'rgba(255,255,255,0.7)',radius,time,delayTime,gravity,ctx,invisibleTime, friction));
            }
            tmpNum+=6;
        }
    }
    else if(type==16){//g
        let colAngle=rand(360);
        color=hsv(colAngle);
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++)
                fire.push(new FireworkPoint(x,y,i/32-0.015+ran()*0.03,deg2rad(j/tmpNum*360),color,Math.random()*1.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
            tmpNum+=30;
        }
        color=hsv(colAngle+90+rand(60));
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++){
                time=rand(300)+500;
                fire.push(new FireworkPoint(x,y,i/16-0.03+ran()*0.06,deg2rad(j/tmpNum*360),color,Math.random()*2,time+300+rand(200),200,0.0002,ctx,time,friction));
            }
            tmpNum+=30;
        }
    }
    else if(type==17){//h
        let colAngle=rand(360);
        color=hsv(colAngle);
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++)
                fire.push(new FireworkPoint(x,y,i/20-0.024+ran()*0.048,deg2rad(j/tmpNum*360),color,Math.random()*1.5,Math.random()*200+800,0,0.00005,ctx,300+rand(300), friction));
            tmpNum+=30;
        }
        color=hsv(colAngle+60+rand(30));
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++)
                fire.push(new FireworkPoint(x,y,i/32-0.015+ran()*0.03,deg2rad(j/tmpNum*360),color,Math.random()*1.5,Math.random()*200+400,0,0.00005,ctx,invisibleTime, friction));
            tmpNum+=15;
        }
        tmpNum=300;
        color='rgb(255, 255, 255)';
        for(i=0;i<tmpNum;i++){
            let len=rand(100);
            let theta=rand(360);
            time=550+rand(300);
            fire.push(new FireworkPoint(x+len*cos(theta),y+20+len*sin(theta),0,0,color,Math.random()*2,time+10,0,0,ctx,time,0));
        }
        tmpNum=800;
        for(i=0;i<tmpNum;i++){
            let len=rand(150)+115;
            let theta=rand(360);
            time=rand(300)+900;
            fire.push(new FireworkPoint(x+len*cos(theta),y+40+len*sin(theta),0,0,color,Math.random()*2,time+10,0,0,ctx,time,0));
        }
        tmpNum=200;
        for(i=0;i<tmpNum;i++){
            let len=rand(115);
            let theta=rand(360);
            time=rand(300)+900;
            fire.push(new FireworkPoint(x+len*cos(theta),y+40+len*sin(theta),0,0,color,Math.random()*2,time+10,0,0,ctx,time,0));
        }
    }
    else if(type==18){//i
        let arealen=0;
        color=hsvRand(2);
        for(let k=0;k<60;k++){
            angle=rand(360);
            delayTime=100+ran()*300;
            k>=10?arealen+=1.5:arealen+=8;
            let areax=x+arealen*cos(angle);
            let areay=y+arealen*sin(angle);
            let time=30;
            radius=3.75;
            fire.push(new FireworkPoint(areax,areay,0,0,color,radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
            radius=2;
            fire.push(new FireworkPoint(areax,areay,0,0,'rgb(255,255,255)',radius,time+30,delayTime,0.00005,ctx,invisibleTime, friction));
        }
    }
    else if(type==19){//j
        let arr=[0,30,40,60,85,230,250,340];
        let colAngle=arr[Math.floor(rand(arr.length)%arr.length)];
        color=hsv(colAngle);
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++)
                fire.push(new FireworkPoint(x,y,i/32-0.015+ran()*0.03,deg2rad(j/tmpNum*360),color,Math.random()*1.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
            tmpNum+=24;
        }
        tmpNum=720;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,6/32-ran()*0.06,deg2rad(i/tmpNum*360+rand(5)),color,Math.random()*1.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        colAngle=colAngle+40+rand(20);
        color=hsv(colAngle);
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++)
                fire.push(new FireworkPoint(x,y,i/64-0.0075+ran()*0.015,deg2rad(j/tmpNum*360),color,Math.random()*1.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
            tmpNum+=24;
        }
        tmpNum=720;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,6/64-ran()*0.03,deg2rad(i/tmpNum*360+rand(5)),color,Math.random()*1.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==20){//k
        let colorAngle=rand(360);
        color=hsv(colorAngle);
        speed=0.16/3;
        tmpNum=0;
        delayTime=200;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++){
                angle=deg2rad(j/tmpNum*360-15+rand(30));
                for(let k=0;k<20;k++)
                    fire.push(new FireworkPoint(x,y,speed+i/24-0.02+ran()*0.04-k/20*0.09,angle,color,(-abs(k-10)+10)/10*1.5,Math.random()*200+800,delayTime,0.00005,ctx,invisibleTime, friction));

            }
            tmpNum+=5;
        }
        colorAngle=colorAngle+rand(60)+60;
        color=hsv(colorAngle);
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++)
                fire.push(new FireworkPoint(x,y,i/48-0.01+ran()*0.02,deg2rad(j/tmpNum*360),color,Math.random()*1.5,Math.random()*200+800,delayTime,0.00005,ctx,invisibleTime, friction));
            tmpNum+=10;
        }
        colorAngle=colorAngle+rand(60)+60;
        color=hsv(colorAngle);
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++){
                fire.push(new FireworkPoint(x,y,i/24-0.02+ran()*0.04,deg2rad(j/tmpNum*360),color,Math.random()*1.5,Math.random()*200+800,delayTime,0.00005,ctx,invisibleTime, friction));
            }
            tmpNum+=8;
        }
        tmpNum=600;
        for(i=0;i<tmpNum;i++){
            fire.push(new FireworkPoint(x,y,1/4-0.04/3-ran()*0.08,deg2rad(i/tmpNum*360+rand(5)),color,Math.random()*1.5,Math.random()*200+800,delayTime,0.00005,ctx,invisibleTime, friction));
        }
    }
    else if(type==21){//l
        color=hsvRand(2);
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++){
                angle=deg2rad(j/tmpNum*360+rand(15));
                for(let k=0;k<20;k++){
                    let leng=rand(115);
                    let angle2=rand(360);
                    fire.push(new FireworkPoint(x+leng*cos(angle2),y+leng*sin(angle2),i/16-0.03+ran()*0.06-k/20*0.04,angle,color,(-abs(k-10)+10)/10*1,Math.random()*200+800,0,0.0001,ctx,rand(200), friction));
                }
            }
            tmpNum+=8;
        }
    }
    else if(type==22){//m
        let colAngle=rand(360);
        color=hsv(colAngle);
        colAngle=colAngle+90+rand(60);
        let tmpColor1=hsv(colAngle);
        colAngle=colAngle+90+rand(60);
        let tmpColor2=hsv(colAngle);
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++){
                speed=i/32-0.015+ran()*0.03;
                radius=rand(2);
                time=rand(200)+500;
                fire.push(new FireworkPoint(x,y,speed,deg2rad(j/tmpNum*360),color,radius,time,0,0.00005,ctx,invisibleTime, friction));
                fire.push(new FireworkPoint(x,y,speed,deg2rad(j/tmpNum*360),tmpColor1,radius,time+500,0,0.00005,ctx,time,friction));
                fire.push(new FireworkPoint(x,y,speed,deg2rad(j/tmpNum*360),tmpColor2,radius,time+1000,0,0.00005,ctx,time+500,friction));
            }
            tmpNum+=30;
        }
    }
    else if(type==23){//n
        let colorAngle=rand(360);
        color=hsv(colorAngle);
        let colorAngle2=colorAngle+90+rand(60);
        let color2=hsv(colorAngle2);
        let layer=2;
        for(let k=1;k<=layer;k++){
            tmpNum=(k-1)*15;
            for(i=0;i<6;i++){
                for(j=0;j<tmpNum;j++){
                    time=rand(200)+600;
                    speed=i/32/layer*k-0.015/layer*k+ran()*0.03/layer*k;
                    radius=rand(1.5);
                    fire.push(new FireworkPoint(x,y,speed,deg2rad(j/tmpNum*360),color,radius,time+k*200,0,0.00005,ctx,invisibleTime, friction));
                    fire.push(new FireworkPoint(x,y,speed,deg2rad(j/tmpNum*360),color2,radius,time+400+k*200,0,0.00005,ctx,time+k*200, friction));

                }
                tmpNum+=15;
            }
            if(k==layer)
                break;
            colorAngle=colorAngle+rand(60)+90;
            color=hsv(colorAngle);
            colorAngle2=colorAngle2+rand(60)+90;
            color2=hsv(colorAngle2);
        }
        let arealen=0;
        color=hsv(colorAngle);
        for(let k=0;k<30;k++){
            angle=rand(360);
            delayTime=1600+rand(200);
            k>=10?arealen+=1.5:arealen+=8;
            let areax=x+arealen*cos(angle);
            let areay=y+100+arealen*sin(angle);
            radius=2;
            let len=1.75;
            let theta;
            for(i=0;i<20;i++){
                theta=rand(360);
                fire.push(new FireworkPoint(areax+len*cos(theta),areay+len*sin(theta),0,0,color,radius,10,delayTime,0.00005,ctx,invisibleTime, friction));
            }
            radius=2;
            fire.push(new FireworkPoint(areax,areay,0,0,'rgb(255,255,255)',radius,70,delayTime,0.00005,ctx,invisibleTime, friction));
        }
        arealen=100;
        color=hsv(colorAngle2);
        for(let k=0;k<30;k++){
            angle=rand(360);
            delayTime=1600+rand(200);
            k>=10?arealen+=1.5:arealen+=8;
            let areax=x+arealen*cos(angle);
            let areay=y+100+arealen*sin(angle);
            radius=2;
            let len=3;
            let theta;
            for(i=0;i<20;i++){
                theta=rand(360);
                fire.push(new FireworkPoint(areax+len*cos(theta),areay+len*sin(theta),0,0,color,radius,10,delayTime,0.00005,ctx,invisibleTime, friction));
            }
            radius=1.5;
            fire.push(new FireworkPoint(areax,areay,0,0,'rgb(255,255,255)',radius,70,delayTime,0.00005,ctx,invisibleTime, friction));
        }
    }
    else if(type==24){//o
        angle=ran()*60;
        for(let k=0;k<6;k++){
            color=hsvRand(2);
            delayTime=200+ran()*200;
            tmpNum=0;
            let len=50+rand(100);
            for(i=0;i<6;i++){
                for(j=0;j<tmpNum;j++){
                    invisibleTime=rand(100)+200;
                    speed=i/16-0.03+ran()*0.06;
                    radius=rand(2);
                    time=rand(100)+300;
                    fire.push(new FireworkPoint(x+len*cos(angle+60*k),y+len*sin(angle+60*k),speed,deg2rad(j/tmpNum*360),color,radius,invisibleTime+20+rand(70),delayTime,0.00005,ctx,invisibleTime,friction));
                }
                tmpNum+=8;
            }
        }
    }
    else if(type==25){//p
        angle=rand(60);
        let layer=3;
        let len;
        for(let h=0;h<layer;h++){
            for(let k=0;k<6+2*h;k++){
                color=hsvRand(2);
                delayTime=200+300*h;
                tmpNum=0;
                len=50+100*h+rand(25);
                for(i=0;i<6;i++){
                    for(j=0;j<tmpNum;j++){
                        speed=i/16-0.03+ran()*0.06;
                        radius=rand(2);
                        time=rand(100)+300;
                        fire.push(new FireworkPoint(x+len*cos(angle+360/(6+2*h)*k),y+len*sin(angle+360/(6+2*h)*k),speed,deg2rad(j/tmpNum*360),color,radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
                    }
                    tmpNum+=8;
                }
            }
        }
    }
    else if(type==26){//q
        color=hsvRand(2);
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++)
                fire.push(new FireworkPoint(x,y,i/8-0.06+ran()*0.12,deg2rad(j/tmpNum*360),color,Math.random()*1.5,Math.random()*200+2000,0,0.0003,ctx,invisibleTime, 0.00005));
            tmpNum+=30;
        }
    }
    else if(type==27){//r
        color=hsvRand(2);
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++){
                speed=i/16-0.03+rand(0.06);
                radius=rand(2);
                time=rand(100)+250;
                fire.push(new FireworkPoint(x,y,speed,deg2rad(j/tmpNum*360),color,radius,time,0,0.00005,ctx,invisibleTime, friction));
            }
            tmpNum+=30;
        }
        for(i=0;i<36;i++){
            time=rand(200)+800;
            for(j=0;j<10;j++){
                speed=0.3+rand(0.02);
                fire.push(new FireworkPoint(x,y,speed,deg2rad(i*10-1+rand(2)),color,rand(2),time,0,0.00005,ctx,240, friction));
            }
        }
    }
    else if(type==28){//s
        for(let k=0;k<60;k++){
            let colAngle=rand(360);
            color=hsv(colAngle);
            angle=deg2rad(rand(360));
            delayTime=rand(200);
            invisibleTime=rand(200);
            time=invisibleTime+200;
            speed=0.4+rand(0.2);
            friction=0.0025;
            radius=3;
            fire.push(new FireworkPoint(x,y,speed,angle,'rgb(0,0,0)',radius,time,10+delayTime,0.00005,ctx,invisibleTime, friction));
            radius=3.1;
            fire.push(new FireworkPoint(x,y,speed,angle,color,radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
            radius=2;
            if(60<=colAngle && colAngle<=180)
                fire.push(new FireworkPoint(x,y,speed,angle,'rgb(255,255,255)',radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
            else
                fire.push(new FireworkPoint(x,y,speed,angle,'rgba(255,255,255,0.6)',radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
        }
    }
    else if(type==29){//t
        tmpNum=360;
        for(i=0;i<6;i++)
            for(j=0;j<tmpNum/6;j++)
                fire.push(new FireworkPoint(x,y,i/24+Math.random()*0.02,2*Math.PI*j/(tmpNum/6),color,Math.random()*2,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==30){//u
        let arr=[60,62,64,90,128,146,240,300];
        let col=arr[Math.floor(rand(arr.length))];
        color=hsv(col);
        let random=6+Math.floor(rand(4));
        let gravity=0.0001;
        angle=deg2rad(rand(360));
        for(i=0;i<random;i++){
            angle=angle+deg2rad(360/random-5+rand(10));
            speed=0.5+rand(0.2);
            friction=0.0006+rand(0.0001);
            for(let k=0;k<100;k++){
                fire.push(new FireworkPoint(x,y,k/100*speed,angle-deg2rad(rand(5)),((col==60 || col==62 || col==64) && rand(1)>0.65)?'rgb(255,255,255)':color,(-abs(k-50)+50)/50*2,Math.random()*200+k/100*700,0,gravity+0.0006*k/100,ctx,invisibleTime, friction));
            }
        }
    }
    else if(type==31){//v
        let arr=[0,40,60,90,120,210,240,270,300];
        let colAngle=arr[Math.floor(rand(arr.length))];
        color=hsv(colAngle);
        for(let j=1;j<=3;j++){
            for(let k=0;k<45;k++){
                angle=deg2rad(8*k);
                delayTime=0;
                time=rand(100)+200*j;
                speed=0.13*j+rand(0.05)+0.1;
                invisibleTime=rand(100)+200*(j-1);
                radius=3;
                fire.push(new FireworkPoint(x,y,speed,angle,'rgb(0,0,0)',radius,time,10,0.00005,ctx,invisibleTime, friction));
                radius=3.1;
                fire.push(new FireworkPoint(x,y,speed,angle,color,radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
                radius=2;
                if(colAngle==60 || colAngle==75 || colAngle==90 || colAngle==105 || colAngle==120)
                    fire.push(new FireworkPoint(x,y,speed,angle,'rgb(255,255,255)',radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
                else
                    fire.push(new FireworkPoint(x,y,speed,angle,'rgba(255,255,255,0.6)',radius,time,delayTime,0.00005,ctx,invisibleTime, friction));

            }
        }
    }
    else if(type==32){//w
        color=hsvRand(2);
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++){
                time=rand(400)+2000;
                fire.push(new FireworkPoint(x,y,i/8-0.06+ran()*0.12,deg2rad(j/tmpNum*360),color,Math.random()*2,time,0,0.0003,ctx,invisibleTime, 0.001));
                fire.push(new FireworkPoint(x-500+rand(1000),y+100+rand(600),0,0,'rgb(255,255,255)',Math.random()*2,time+30,0,0,ctx,time+20));
            }
            tmpNum+=60;
        }
    }
    else if(type==33){//x
        color=hsvRand(2);
        tmpNum=0;
        delayTime=0;
        for(let k=0;k<6;k++){
            for(j=0;j<tmpNum;j++){
                angle=rand(PI2);
                speed=k/16-0.03+ran()*0.06;
                time=rand(100)+400;
                radius=3;
                fire.push(new FireworkPoint(x,y,speed,angle,'rgb(0,0,0)',radius,time,10,0.00005,ctx,invisibleTime, friction));
                radius=3.1;
                fire.push(new FireworkPoint(x,y,speed,angle,color,radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
                radius=2;
                fire.push(new FireworkPoint(x,y,speed,angle,'rgba(255,255,255,0.7)',radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
            }
            tmpNum+=6;
        }
    }
    else if(type==34){//y
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++){
                angle=deg2rad(j/tmpNum*360+rand(15));
                for(let k=0;k<10;k++)
                    fire.push(new FireworkPoint(x,y,i/24+ran()*0.01-k/40*0.08,angle,color,(-abs(k-5)+5)/5*2,Math.random()*200+800,0,0.0001,ctx,invisibleTime, friction));

            }
            tmpNum+=8;
        }
    }
    else if(type==35){//z
        let colAngle=rand(360);
        color=hsv(colAngle);
        delayTime=0;
        for(let k=0;k<60;k++){
            angle=deg2rad(6*k);
            time=rand(200)+800;
            speed=0.2;
            radius=3;
            fire.push(new FireworkPoint(x,y,speed,angle,'rgb(0,0,0)',radius,time,10,0.00005,ctx,invisibleTime, friction));
            radius=3.1;
            fire.push(new FireworkPoint(x,y,speed,angle,color,radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
            radius=2;
            if(60<=colAngle && colAngle<=180)
                fire.push(new FireworkPoint(x,y,speed,angle,'rgb(255,255,255)',radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
            else
                fire.push(new FireworkPoint(x,y,speed,angle,'rgba(255,255,255,0.6)',radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
        }
        let angle2=-10+rand(30);
        for(let k=0;k<20;k++){
            angle=deg2rad(30+angle2+6*k);
            time=rand(200)+800;
            speed=0.1;
            radius=3;
            fire.push(new FireworkPoint(x,y,speed,angle,'rgb(0,0,0)',radius,time,10,0.00005,ctx,invisibleTime, friction));
            radius=3.1;
            fire.push(new FireworkPoint(x,y,speed,angle,color,radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
            radius=2;
            if(60<=colAngle && colAngle<=180)
                fire.push(new FireworkPoint(x,y,speed,angle,'rgb(255,255,255)',radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
            else
                fire.push(new FireworkPoint(x,y,speed,angle,'rgba(255,255,255,0.6)',radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
        }
        for(let h=0;h<2;h++){
            angle=deg2rad(-60+angle2-60*h);
            for(let k=0;k<10;k++){
                time=rand(200)+800;
                speed=0.04+0.07*k/10;
                radius=3;
                fire.push(new FireworkPoint(x,y,speed,angle,'rgb(0,0,0)',radius,time,10,0.00005,ctx,invisibleTime, friction));
                radius=3.1;
                fire.push(new FireworkPoint(x,y,speed,angle,color,radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
                radius=2;
                if(60<=colAngle && colAngle<=180)
                    fire.push(new FireworkPoint(x,y,speed,angle,'rgb(255,255,255)',radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
                else
                    fire.push(new FireworkPoint(x,y,speed,angle,'rgba(255,255,255,0.6)',radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
            }
        }
        for(let j=0;j<2;j++){
            for(let k=0;k<11;k++){
                j==0?angle=deg2rad(-60+angle2+4*k):angle=deg2rad(-120+angle2-4*k);
                time=rand(200)+800;
                speed=0.11*cos(30)/cos(30-4*k);
                radius=3;
                fire.push(new FireworkPoint(x,y,speed,angle,'rgb(0,0,0)',radius,time,10,0.00005,ctx,invisibleTime, friction));
                radius=3.1;
                fire.push(new FireworkPoint(x,y,speed,angle,color,radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
                radius=2;
                if(60<=colAngle && colAngle<=180)
                    fire.push(new FireworkPoint(x,y,speed,angle,'rgb(255,255,255)',radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
                else
                    fire.push(new FireworkPoint(x,y,speed,angle,'rgba(255,255,255,0.6)',radius,time,delayTime,0.00005,ctx,invisibleTime, friction));
            }
        }
    }
    else if(type==48){//0
        tmpNum=360;
        angle=-20*ran()+10;
        for(i=0;i<tmpNum;i+=3)
            pushBigPoint(fire,x,y,0.07*0.093/sqrt(0.093*cos(i)*0.093*cos(i)+0.07*sin(i)*0.07*sin(i))+ran()*0.005,deg2rad(angle+i),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==49){//1
        tmpNum=45;
        angle=-20*ran()+10;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.12*cos(45)/cos(abs(i-45))+ran()*0.005,deg2rad(-90-i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=70;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.12*i/tmpNum,deg2rad(angle-90-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.049*i/tmpNum,deg2rad(angle+90-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=90;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.049/cos(abs(i-45))+ran()*0.005,deg2rad(angle+45+i-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==50){//2
        tmpNum=90;
        angle=-10+20*ran();
        for(i=0;i<tmpNum;i++)
            pushBigPoint(fire,x,y,0.11*i/tmpNum+ran()*0.005,Math.acos(i/tmpNum)-PI2*(3/8-angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=20;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.11+ran()*0.005,deg2rad(-i-130+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=90;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.11*i/tmpNum,deg2rad(135+angle-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=70;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.11*cos(45)/cos(abs(i-45))+ran()*0.005,deg2rad(angle+135-i-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==51){//3
        tmpNum=90;
        angle=-10+20*ran();
        for(i=0;i<tmpNum;i++)
            pushBigPoint(fire,x,y,0.09*i/tmpNum+ran()*0.005,-Math.acos(i/tmpNum)+PI2*(1/4+angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        for(i=0;i<tmpNum;i++)
            pushBigPoint(fire,x,y,0.09*i/tmpNum+ran()*0.005,Math.acos(i/tmpNum)-PI2*(1/4-angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=25;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.09+ran()*0.005-i/tmpNum*0.01,deg2rad(85+i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.09+ran()*0.005-i/tmpNum*0.01,deg2rad(-85-i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==52){//4
        tmpNum=90;
        angle=-20*ran()+10;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.11*cos(45)/cos(abs(i-45))+ran()*0.005,deg2rad(-90-i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=70;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.11*i/tmpNum,deg2rad(angle-90-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.092*i/tmpNum,deg2rad(angle+90-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=70;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.11*i/tmpNum,deg2rad(angle-180-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.073*i/tmpNum,deg2rad(angle-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==53){//5
        tmpNum=90;
        angle=-10+20*ran();
        for(i=0;i<tmpNum;i++)
            pushBigPoint(fire,x,y,0.1*i/tmpNum+ran()*0.005,-Math.acos(i/tmpNum)+PI2*(1/4+angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=20;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.1+ran()*0.005-i/tmpNum*0.01,deg2rad(80+i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=70;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.0825*i/tmpNum,deg2rad(angle-90-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=35;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.0825/cos(i-35)+ran()*0.005,deg2rad(angle-55-i),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==54){//6
        tmpNum=120;
        angle=-10*ran()+20;
        for(i=0;i<tmpNum;i++)
            pushBigPoint(fire,x,y,0.05+ran()*0.005,2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=100;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.05*0.113/Math.sqrt(0.113*cos(i)*0.113*cos(i)+0.05*sin(i)*0.05*sin(i))+ran()*0.005,deg2rad(angle+180+i),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==55){//7
        tmpNum=60;
        angle=-10*ran();
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.12*cos(25)/cos(abs(i-25))+ran()*0.005,deg2rad(-65-i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=70;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.12*i/tmpNum,deg2rad(angle-65-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.08*i/tmpNum,deg2rad(angle+115-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==56){//8
        tmpNum=90;
        angle=-10+20*ran();
        for(i=0;i<tmpNum;i++)
            pushBigPoint(fire,x,y,0.09*i/tmpNum+ran()*0.005,-Math.acos(i/tmpNum)+PI2*(1/4+angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        for(i=0;i<tmpNum;i++)
            pushBigPoint(fire,x,y,0.09*i/tmpNum+ran()*0.005,Math.acos(i/tmpNum)-PI2*(1/4-angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        for(i=0;i<tmpNum;i++)
            pushBigPoint(fire,x,y,0.09*i/tmpNum+ran()*0.005,-Math.acos(i/tmpNum)-PI2*(1/4-angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        for(i=0;i<tmpNum;i++)
            pushBigPoint(fire,x,y,0.09*i/tmpNum+ran()*0.005,Math.acos(i/tmpNum)+PI2*(1/4+angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=30;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.09+ran()*0.005,deg2rad(75+i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.09+ran()*0.005,deg2rad(-75-i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==57){//9
        tmpNum=120;
        angle=-10*ran()+20;
        for(i=0;i<tmpNum;i++)
            pushBigPoint(fire,x,y,0.05+ran()*0.005,2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=100;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.05*0.113/Math.sqrt(0.113*cos(i)*0.113*cos(i)+0.05*sin(i)*0.05*sin(i))+ran()*0.005,deg2rad(angle+i),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==97){//a
        tmpNum=120;
        angle=-10*ran()+40;
        for(i=0;i<tmpNum;i++)
            pushBigPoint(fire,x,y,0.04+rand(0.005),2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=90;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.06*cos(50)/cos(abs(i-50))+rand(0.005),deg2rad(-i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==98){//b
        tmpNum=120;
        angle=20*ran()+120;
        for(i=0;i<tmpNum;i++)
            pushBigPoint(fire,x,y,0.04+ran()*0.005,2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=110;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.06*cos(40)/cos(abs(i-40))+rand(0.005),deg2rad(i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==99){//c
        tmpNum=300;
        angle=50*ran();
        for(i=0;i<tmpNum;i+=3)
            pushBigPoint(fire,x,y,0.045+rand(0.005),deg2rad(i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==100){//d
        tmpNum=120;
        angle=-20*ran()+40;
        for(i=0;i<tmpNum;i++)
            pushBigPoint(fire,x,y,0.045+rand(0.005),2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=110;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.063*cos(40)/cos(abs(i-40))+ran()*0.005,deg2rad(-i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==101){//e
        tmpNum=320;
        angle=70*ran();
        for(i=0;i<tmpNum;i+=3)
            pushBigPoint(fire,x,y,0.045+ran()*0.005,deg2rad(i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=50;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.045*i/tmpNum,deg2rad(angle-40),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=50;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.045*i/tmpNum,deg2rad(angle+140),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==102){//f
        tmpNum=180;
        angle=-10+20*ran();
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.035+ran()*0.005,deg2rad(i+180),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=150;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.035/cos(abs(i/2))+ran()*0.005,deg2rad(180+angle-i/2),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=80;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.035/cos(50)*cos(40)/cos(i-20),deg2rad(70+angle+i),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==103){//g
        tmpNum=360;
        angle=20*ran()-10;
        for(i=0;i<tmpNum;i+=3)
            pushBigPoint(fire,x,y,0.04+ran()*0.005,2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=110;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.055*cos(40)/cos(abs(i-40))+ran()*0.005,deg2rad(angle+i-45),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=10;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.055*cos(40)/cos(65)+ran()*0.005+0.012+i/tmpNum*0.008,deg2rad(angle+i+65),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=25;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.055*cos(40)/cos(70)+ran()*0.005-0.005,deg2rad(angle+i+70),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=10;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.055*cos(40)/cos(70)+ran()*0.005-0.005-i/tmpNum*0.01,deg2rad(angle+i+95),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==104){//h
        tmpNum=80;
        angle=-10+ran()*20;
        for(i=0;i<tmpNum;i+=3)
            pushBigPoint(fire,x,y,0.06+ran()*0.005,deg2rad(-i-50+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=60;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.06*cos(50)/cos(abs(i-50))+ran()*0.005,deg2rad(-50+i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=85;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.06*cos(50)/cos(abs(i-75))+ran()*0.005,deg2rad(-105-i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=25;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.06*cos(50)/cos(abs(i-75))+ran()*0.005,deg2rad(-105-i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==105){//i
        angle=-100+20*ran();
        tmpNum=50;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.075+ran()*0.005,deg2rad(angle+ran()*4-2),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=70;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.048*i/tmpNum,deg2rad(angle-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        angle-=180;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.02*i/tmpNum,deg2rad(angle-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==106){//j
        tmpNum=180;
        angle=-10+20*ran();
        for(i=0;i<tmpNum;i+=3)
            pushBigPoint(fire,x,y,0.035+ran()*0.005,deg2rad(i),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=140;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.035/cos(i/2)+ran()*0.005,deg2rad(angle-i/2),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=20;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.035/cos(80)-0.04,deg2rad(angle-80+4*ran()),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==107){//k
        angle=-55+20*ran();
        tmpNum=50;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.08*i/tmpNum,deg2rad(angle-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        angle+=90;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.08*i/tmpNum,deg2rad(angle-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=70;
        angle+=45;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.06*i/tmpNum,deg2rad(angle-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        angle-=180;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.117*i/tmpNum,deg2rad(angle-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);

    }
    else if(type==108){//l
        angle=-100+20*ran();
        tmpNum=70;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.033*i/tmpNum,deg2rad(angle-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        angle-=180;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.15*i/tmpNum,deg2rad(angle-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==109){//m
        tmpNum=180;
        angle=-10+20*ran();
        for(i=0;i<tmpNum;i+=3)
            pushBigPoint(fire,x,y,0.045*i/tmpNum+ran()*0.005,-Math.acos(i/tmpNum)-PI2*(0-angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        for(i=0;i<tmpNum;i+=3)
            pushBigPoint(fire,x,y,0.045*i/tmpNum+ran()*0.005,Math.acos(i/tmpNum)+PI2*(1/2+angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=49;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.045/cos(i),deg2rad(i+angle-4)+ran()*0.005,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=45;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.045*i/tmpNum,deg2rad(90+angle)+ran()*0.005,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=75;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.045/cos(i-45)+ran()*0.005,deg2rad(i+135+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==110){//n
        tmpNum=180;
        angle=-10+20*ran();
        for(i=0;i<tmpNum;i+=3)
            pushBigPoint(fire,x,y,0.08*i/tmpNum+ran()*0.005,Math.acos(i/tmpNum)+PI2*(1/2+angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=40;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.055*i/tmpNum,deg2rad(90+angle)+ran()*0.005,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=65;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.08/cos(i-30)+ran()*0.005,deg2rad(i+150+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==111){//o
        tmpNum=360;
        for(i=0;i<tmpNum;i+=3)
            pushBigPoint(fire,x,y,0.045+ran()*0.005,2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==112){//p
        tmpNum=360;
        angle=20*ran()+200;
        for(i=0;i<tmpNum;i+=3)
            pushBigPoint(fire,x,y,0.04+ran()*0.005,2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=110;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.056*cos(40)/cos(abs(i-40))+ran()*0.005,deg2rad(angle-i),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==113){//q
        tmpNum=360;
        angle=-20*ran()-20;
        for(i=0;i<tmpNum;i+=3)
            pushBigPoint(fire,x,y,0.04+ran()*0.005,2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=110;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.056*cos(40)/cos(abs(i-40))+ran()*0.005,deg2rad(angle+i),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==114){//r
        tmpNum=180;
        angle=-10+20*ran();
        for(i=0;i<tmpNum;i+=3)
            pushBigPoint(fire,x,y,0.08*i/tmpNum+ran()*0.005,Math.acos(i/tmpNum)+PI2*(1/2+angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=65;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.08/cos(i-30)+ran()*0.005,deg2rad(i+150+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==115){//s
        tmpNum=180;
        angle=-10+20*ran();
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.045*i/tmpNum,-Math.acos(i/tmpNum)-PI2*(1/4-angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.045*i/tmpNum,-Math.acos(i/tmpNum)+PI2*(1/4+angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=35;
        for(i=0;i<tmpNum;i+=3)
            pushBigPoint(fire,x,y,0.045,deg2rad(-95+i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        for(i=0;i<tmpNum;i+=3)
            pushBigPoint(fire,x,y,0.045,deg2rad(85+i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==116){//t
        tmpNum=180;
        angle=-10+20*ran();
        for(i=0;i<tmpNum;i+=3)
            pushBigPoint(fire,x,y,0.03+ran()*0.005,deg2rad(i),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=140;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.03/cos(abs(i/2))+ran()*0.005,deg2rad(180+angle+i/2),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=70;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.03/cos(60)*cos(30)/cos(i-20),deg2rad(-70+angle-i),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==117){//u
        tmpNum=55;
        angle=-10+ran()*20;
        for(i=0;i<tmpNum;i+=3)
            pushBigPoint(fire,x,y,0.075+ran()*0.005,deg2rad(i+60+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=5;
        for(i=0;i<tmpNum;i+=1)
            pushBigPoint(fire,x,y,0.075+ran()*0.005-0.005*i/tmpNum,deg2rad(i+115+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=66;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.075*cos(60)/cos(abs(i-66))+ran()*0.005,deg2rad(68-i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=60;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.075*cos(60)/cos(abs(i-60))+ran()*0.005,deg2rad(120+i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==118){//v
        angle=180+ran()*20;
        tmpNum=100;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.05*cos(40)/cos(abs(i-40))+ran()*0.005,deg2rad(angle-i),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction);
        angle-=200;
        tmpNum=100;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.05*cos(40)/cos(abs(i-40))+ran()*0.005,deg2rad(i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==119){//w
        angle=105+30*ran();
        tmpNum=50;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.05*i/tmpNum,deg2rad(angle-2+4*ran()),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=90;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.05*cos(40)/cos(abs(i-40))+ran()*0.005,deg2rad(angle+i-2+4*ran()),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=50;
        angle-=60;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.05*i/tmpNum,deg2rad(angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=90;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.05*cos(40)/cos(abs(i-40))+ran()*0.005,deg2rad(angle-i),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==120){//x
        angle=-70+30*ran();
        tmpNum=50;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.06*i/tmpNum,deg2rad(angle-2+4*ran()),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.06*i/tmpNum,deg2rad(angle+180-2+4*ran()),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        angle+=110;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.06*i/tmpNum,deg2rad(angle-2+4*ran()),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.06*i/tmpNum,deg2rad(angle+180-2+4*ran()),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==121){//y
        angle=-70+30*ran();
        tmpNum=50;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.08*i/tmpNum,deg2rad(angle-2+4*ran()),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.08*i/tmpNum,deg2rad(angle+180-2+4*ran()),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        angle+=110;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.08*i/tmpNum,deg2rad(angle+180-2+4*ran()),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    else if(type==122){//z
        angle=-70+30*ran();
        tmpNum=50;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.05*i/tmpNum,deg2rad(angle-2+4*ran()),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=70;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.05*cos(35)/cos(abs(i-35))+ran()*0.005,deg2rad(-i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction);
        angle-=180;
        tmpNum=50;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.05*i/tmpNum,deg2rad(angle-2+4*ran()),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction);
        tmpNum=70;
        for(i=0;i<tmpNum;i+=2)
            pushBigPoint(fire,x,y,0.05*cos(35)/cos(abs(i-35))+ran()*0.005,deg2rad(-i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction);
    }
    return fire;
}

function pushBigPoint(fire,x,y,speed,angle,color,radius,timeMax,delay,acceler,ctx,invisibleTime,friction){
    radius=3;
    fire.push(new FireworkPoint(x,y,speed,angle,'rgb(0,0,0)',radius,timeMax-20,delay+10,acceler,ctx,invisibleTime, friction));
    radius=3.1;
    fire.push(new FireworkPoint(x,y,speed,angle,color,radius,timeMax,delay,acceler,ctx,invisibleTime, friction));
    radius=2;
    fire.push(new FireworkPoint(x,y,speed,angle,'rgba(255,255,255,0.7)',radius,timeMax,delay,acceler,ctx,invisibleTime, friction));
}
