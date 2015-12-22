'use strict';
import {FireworkPoint} from './manager';
function getRandomColor(){
    return 'hsl(' + Math.random()*360 + ',100%, 70%)';
}
export function getFireworkPoints(x,y,type,ctx){
    let fire=[];
    let tmpNum;
    let angle;
    let i,j;
    let color=getRandomColor();
    let time;
    let radius;
    let delayTime;
    let invisibleTime=0;
    let speed;
    let friction=0;
    if(type==1){//正常
        tmpNum=Math.random()*200+200;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,Math.random()*0.5,Math.random()*2*Math.PI,color,Math.random()*2,Math.random()*400+800,0,0.0003,ctx,invisibleTime, friction));
    }
    else if(type==2){//同心圓
        tmpNum=360;
        for(i=0;i<6;i++)
            for(j=0;j<tmpNum/6;j++)
                fire.push(new FireworkPoint(x,y,i/24+Math.random()*0.02,2*Math.PI*j/(tmpNum/6),color,Math.random()*2,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==3){//圓
        tmpNum=360;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.5,2*Math.PI*i/tmpNum,color,Math.random()*2,Math.random()*200+800,0,0.0003,ctx,invisibleTime, friction));
    }
    else if(type==4){//大煙火
        tmpNum=1500;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,Math.random()*0.5,Math.random()*2*Math.PI,color,Math.random()*2,Math.random()*1000+600,0,0.0003,ctx,invisibleTime, friction));
        tmpNum=500;
        color='#FFFFFF';
        for(i=0;i<tmpNum;i++){
            time=rand(300)+300;
            fire.push(new FireworkPoint(x-500+rand(1000),y+rand(600),0,0,color,Math.random()*2,1610+time,0,0,ctx,1600+time));
        }
    }
    else if(type==5){//破碎圓
        tmpNum=720;
        for(i=0;i<8;i++)
            for(j=0;j<tmpNum/8;j++)
                fire.push(new FireworkPoint(x,y,0.5,2*Math.PI* (i/8+(Math.random()*15+15)/360) ,color,Math.random()*2,Math.random()*200+800,0,0.0003,ctx,invisibleTime, friction));
    }
    else if(type==6){//太陽
        tmpNum=720;
        for(i=0;i<20;i++)
            for(j=0;j<tmpNum/20;j++)
                fire.push(new FireworkPoint(x,y,Math.random()*0.3,2*Math.PI*i/20 ,color,Math.random()*2,Math.random()*200+800,0,0.0003,ctx,invisibleTime, friction));
    }
    else if(type==7){//放射狀
        tmpNum=750;
        for(i=0;i<150;i++){
            angle=2*Math.PI*Math.random();
            var speedMax=Math.random()*0.15+0.15;
            for(j=0;j<tmpNum/150;j++)
                fire.push(new FireworkPoint(x,y,Math.random()*speedMax,angle ,color,Math.random()*2,Math.random()*400+600,0,0.00005,ctx,invisibleTime, friction));
        }
    }
    else if(type==8){//小炮
        tmpNum=200;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,Math.random()*0.3,2*Math.PI*Math.random(),color,Math.random()*2,Math.random()*100+200,0,0.0003,ctx,invisibleTime, friction));
    }
    else if(type==9){//delay炮
        angle=ran()*60;
        delayTime=350+ran()*350;
        tmpNum=100;
        for(j=0;j<6;j++){
            color=getRandomColor();
            delayTime=350+ran()*350;
            for(i=0;i<tmpNum;i++)
                fire.push(new FireworkPoint(x+100*cos(angle+60*j),y+100*sin(angle+60*j),Math.random()*0.3,2*Math.PI*Math.random(),color,Math.random()*2,Math.random()*100+200,delayTime ,0.0003,ctx,invisibleTime, friction));
        }
    }
    else if(type==0){//圓內均勻分布
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++)
                fire.push(new FireworkPoint(x,y,i/32-0.015+ran()*0.03,deg2rad(j/tmpNum*360),color,Math.random()*1.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
            tmpNum+=30;
        }
    }
    else if(type==10){//圓內均勻分布延遲變色
        let hue=rand(360);//色相變化不要太小
        color='hsl(' + hue + ',100%, 70%)';
        hue=(hue+90+rand(60))%360;
        let tmpColor1='hsl(' + hue + ',100%, 70%)';
        hue=(hue+90+rand(60))%360;
        let tmpColor2='hsl(' + hue + ',100%, 70%)';
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
    else if(type==11){//大太陽
        let hue=rand(360);//色相變化不要太小
        color='hsl(' + hue + ',100%, 70%)';
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++)
                fire.push(new FireworkPoint(x,y,i/64-0.075+ran()*0.015,deg2rad(j/tmpNum*360),color,Math.random()*2,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
            tmpNum+=30;
        }
        hue=(hue+90+rand(60))%360;
        color='hsl(' + hue + ',100%, 70%)';
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++)
                fire.push(new FireworkPoint(x,y,i/64+rand(0.04),deg2rad(j/tmpNum*360),color,Math.random()*2,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
            tmpNum+=30;
        }
        hue=(hue+90+rand(60))%360;
        color='hsl(' + hue + ',100%, 70%)';
        tmpNum=1800;
        for(i=0;i<60;i++){
            speed=rand(0.06)+0.12;
            for(j=0;j<tmpNum/60;j++)
                fire.push(new FireworkPoint(x,y,speed*j/tmpNum*60+2/64+rand(0.01),2*Math.PI*i/60 ,color,Math.random()*1.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        }
    }
    else if(type==12){//圓內均勻分布,2層
        let hue=rand(360);
        color='hsl(' + hue + ',100%, 70%)';
        let layer=2;
        for(let k=1;k<=layer;k++){
            tmpNum=0;
            for(i=0;i<6;i++){
                for(j=0;j<tmpNum;j++)
                    fire.push(new FireworkPoint(x,y,i/32/layer*k-0.015/layer*k+ran()*0.03/layer*k,deg2rad(j/tmpNum*360),color,Math.random()*1.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
                tmpNum+=30;
            }
            hue=(hue+90+rand(60))%360;
            color='hsl(' + hue + ',100%, 70%)';
        }
    }
    else if(type==13){//圓內均勻分布,3層
        let hue=rand(360);
        color='hsl(' + hue + ',100%, 70%)';
        let layer=3;
        for(let k=1;k<=layer;k++){
            tmpNum=0;
            for(i=0;i<6;i++){
                for(j=0;j<tmpNum;j++)
                    fire.push(new FireworkPoint(x,y,i/32/layer*k-0.015/layer*k+ran()*0.03/layer*k,deg2rad(j/tmpNum*360),color,Math.random()*1.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
                tmpNum+=30;
            }
            hue=(hue+90+rand(60))%360;
            color='hsl(' + hue + ',100%, 70%)';
        }
    }
    else if(type==14){//圓內均勻分布,4層
        let hue=rand(360);
        color='hsl(' + hue + ',100%, 70%)';
        let layer=4;
        for(let k=1;k<=layer;k++){
            tmpNum=0;
            for(i=0;i<6;i++){
                for(j=0;j<tmpNum;j++)
                    fire.push(new FireworkPoint(x,y,i/32/layer*k-0.015/layer*k+ran()*0.03/layer*k,deg2rad(j/tmpNum*360),color,Math.random()*1.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
                tmpNum+=30;
            }
            hue=(hue+90+rand(60))%360;
            color='hsl(' + hue + ',100%, 70%)';
        }
    }
    else if(type==15){//圓內均勻分布+灑
        let hue=rand(360);
        color='hsl(' + hue + ',100%, 70%)';
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++)
                fire.push(new FireworkPoint(x,y,i/32-0.015+ran()*0.03,deg2rad(j/tmpNum*360),color,Math.random()*1.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
            tmpNum+=30;
        }
        hue=(hue+90+rand(60))%360;
        color='hsl(' + hue + ',100%, 70%)';
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++){
                time=rand(300)+500;
                fire.push(new FireworkPoint(x,y,i/16-0.03+ran()*0.06,deg2rad(j/tmpNum*360),color,Math.random()*2,time+300+rand(200),200,0.0002,ctx,time,friction));
            }
            tmpNum+=30;
        }
    }
    else if(type==16){//圓內均勻分布+環稍微強調
        let hue=rand(360);
        color='hsl(' + hue + ',100%, 70%)';
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++)
                fire.push(new FireworkPoint(x,y,i/32-0.015+ran()*0.03,deg2rad(j/tmpNum*360),color,Math.random()*1.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
            tmpNum+=24;
        }
        tmpNum=360;
        for(i=0;i<tmpNum;i++){
            fire.push(new FireworkPoint(x,y,6/32+0.015-ran()*0.06,deg2rad(i/tmpNum*360+rand(5)),color,Math.random()*1.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        }
    }
    else if(type==17){//大太陽
        color='hsl(0,100%, 70%)';
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++)
                fire.push(new FireworkPoint(x,y,i/32-0.15+ran()*0.03,deg2rad(j/tmpNum*360),color,Math.random()*2,Math.random()*200+800,500,0.00005,ctx,invisibleTime, friction));
            tmpNum+=30;
        }
        color='hsl(120,100%, 70%)';
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++)
                fire.push(new FireworkPoint(x,y,i/32+rand(0.08),deg2rad(j/tmpNum*360),color,Math.random()*2,Math.random()*200+800,500,0.00005,ctx,invisibleTime, friction));
            tmpNum+=30;
        }
        color='hsl(60,100%, 70%)';
        tmpNum=1800;
        for(i=0;i<60;i++){
            speed=rand(0.06)+0.3;
            for(j=0;j<tmpNum/60;j++)
                fire.push(new FireworkPoint(x,y,speed*j/tmpNum*60+2/64+rand(0.01),2*Math.PI*i/60 ,color,Math.random()*1.5,Math.random()*200+800,500,0.00005,ctx,invisibleTime, friction));
        }
        color='hsl(210,100%, 70%)';
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++)
                fire.push(new FireworkPoint(x,y,i/12-0.09+ran()*0.08,deg2rad(j/tmpNum*360),color,Math.random()*1.5,Math.random()*400+1000,500,0.00005,ctx,600+rand(300),friction));
            tmpNum+=60;
        }
    }
    else if(type==18){//針狀
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++){
                angle=deg2rad(j/tmpNum*360+rand(15));
                for(let k=0;k<30;k++)
                    fire.push(new FireworkPoint(x,y,i/16-0.03+ran()*0.06-k/40*0.04,angle,color,(-abs(k-15)+15)/15*1,Math.random()*200+800,0,0.0001,ctx,invisibleTime, friction));

            }
            tmpNum+=8;
        }
    }
    else if(type==19){//圓內均勻分布+環稍微強調,2層
        let hue=rand(360);
        color='hsl(' + hue + ',100%, 70%)';
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++)
                fire.push(new FireworkPoint(x,y,i/32-0.015+ran()*0.03,deg2rad(j/tmpNum*360),color,Math.random()*1.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
            tmpNum+=24;
        }
        tmpNum=720;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,6/32-ran()*0.06,deg2rad(i/tmpNum*360+rand(5)),color,Math.random()*1.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        hue=(hue+60+rand(60))%360;//色相不要差太大
        color='hsl(' + hue + ',100%, 70%)';
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
    else if(type==20){//
        let hue=rand(360);
        color='hsl(' + hue + ',100%, 70%)';
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++){
                angle=deg2rad(j/tmpNum*360+rand(15));
                for(let k=0;k<50;k++)
                    fire.push(new FireworkPoint(x,y,i/16-0.03+ran()*0.06-k/40*0.04,angle,color,(-abs(k-25)+25)/25*1,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));

            }
            tmpNum+=8;
        }
        hue=(hue+60+rand(60))%360;//色相不要差太大
        color='hsl(' + hue + ',100%, 70%)';
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++)
                fire.push(new FireworkPoint(x,y,i/32-0.015+ran()*0.03,deg2rad(j/tmpNum*360),color,Math.random()*1.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
            tmpNum+=30;
        }
        hue=(hue+60+rand(60))%360;//色相不要差太大
        color='hsl(' + hue + ',100%, 70%)';
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++){
                fire.push(new FireworkPoint(x,y,i/16-0.03+ran()*0.06,deg2rad(j/tmpNum*360),color,Math.random()*1.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
            }
            tmpNum+=24;
        }
        tmpNum=720;
        for(i=0;i<tmpNum;i++){
            fire.push(new FireworkPoint(x,y,6/16-0.02-ran()*0.12,deg2rad(i/tmpNum*360+rand(5)),color,Math.random()*1.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        }
    }
    else if(type==21){
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++)
                fire.push(new FireworkPoint(x,y,i/8-0.06+ran()*0.12,deg2rad(j/tmpNum*360),color,Math.random()*1.5,Math.random()*200+2000,0,0.0003,ctx,invisibleTime, 0.00005));
            tmpNum+=30;
        }
    }
    else if(type==22){
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++)
                fire.push(new FireworkPoint(x,y,i/8-0.06+ran()*0.12,deg2rad(j/tmpNum*360),color,Math.random()*2,Math.random()*400+2000,0,0.0003,ctx,invisibleTime, 0.001));
            tmpNum+=60;
        }
    }
    else if(type==23){
        let hue=rand(360);
        color='hsl(' + hue + ',100%, 70%)';
        let hue2=(hue+90+rand(60))%360;
        let color2='hsl(' + hue2 + ',100%, 70%)';
        let layer=2;
        for(let k=1;k<=layer;k++){
            tmpNum=0;
            for(i=0;i<6;i++){
                for(j=0;j<tmpNum;j++){
                    time=rand(200)+800;
                    speed=i/32/layer*k-0.015/layer*k+ran()*0.03/layer*k;
                    radius=rand(1.5);
                    fire.push(new FireworkPoint(x,y,speed,deg2rad(j/tmpNum*360),color,radius,time,0,0.00005,ctx,invisibleTime, friction));
                    fire.push(new FireworkPoint(x,y,speed,deg2rad(j/tmpNum*360),color2,radius,time+500,0,0.00005,ctx,time, friction));
                
                }
                tmpNum+=30;
            }
            hue=(hue+90+rand(60))%360;
            color='hsl(' + hue + ',100%, 70%)';
            hue2=(hue2+90+rand(60))%360;
            color2='hsl(' + hue2 + ',100%, 70%)';
        }
    }
    else if(type==24){
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++){
                angle=deg2rad(j/tmpNum*360+rand(15));
                for(let k=0;k<20;k++){
                    let leng=rand(150);
                    let angle2=rand(360);
                    fire.push(new FireworkPoint(x+leng*cos(angle2),y+leng*sin(angle2),i/16-0.03+ran()*0.06-k/20*0.04,angle,color,(-abs(k-10)+10)/10*1,Math.random()*200+800,0,0.0001,ctx,rand(200), friction));
                }
            }
            tmpNum+=8;
        }
    }
    else if(type==25){
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++){
                angle=deg2rad(j/tmpNum*360+rand(15));
                for(let k=0;k<30;k++){
                    let leng=rand(230);
                    let angle2=rand(360);
                    fire.push(new FireworkPoint(x+leng*cos(angle2),y+leng*sin(angle2),i/16-0.03+ran()*0.06-k/30*0.04,angle,color,(-abs(k-15)+15)/15*1,Math.random()*200+800,0,0.0001,ctx,rand(200), friction));
                }
            }
            tmpNum+=8;
        }
    }
    else if(type==26){//兩層針狀
        tmpNum=0;
        for(i=0;i<6;i++){
            for(j=0;j<tmpNum;j++){
                angle=deg2rad(j/tmpNum*360+rand(15));
                for(let k=0;k<30;k++)
                    fire.push(new FireworkPoint(x,y,i/16-0.03+ran()*0.06-k/40*0.04,angle,color,(-abs(k-15)+15)/15*1,Math.random()*200+800,0,0.0001,ctx,invisibleTime, friction));
            }
            tmpNum+=8;
        }
    }
    else if(type==48){//0
        tmpNum=360;
        angle=-20*ran()+10;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.07*0.093/sqrt(0.093*cos(i)*0.093*cos(i)+0.07*sin(i)*0.07*sin(i))+ran()*0.01,deg2rad(angle+i),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==49){//1
        tmpNum=45;
        angle=-20*ran()+10;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.12*cos(45)/cos(abs(i-45))+ran()*0.01,deg2rad(-90-i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=70;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.12*i/tmpNum,deg2rad(angle-90-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.049*i/tmpNum,deg2rad(angle+90-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=90;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.049/cos(abs(i-45))+ran()*0.01,deg2rad(angle+45+i-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==50){//2
        tmpNum=180;
        angle=-10+20*ran();
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.11*i/tmpNum+ran()*0.01,Math.acos(i/tmpNum)-PI2*(3/8-angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=20;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.11+ran()*0.01,deg2rad(-i-130+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=90;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.11*i/tmpNum,deg2rad(135+angle-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=70;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.11*cos(45)/cos(abs(i-45))+ran()*0.01,deg2rad(angle+135-i-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==51){//3
        tmpNum=180;
        angle=-10+20*ran();
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.09*i/tmpNum+ran()*0.01,-Math.acos(i/tmpNum)+PI2*(1/4+angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.09*i/tmpNum+ran()*0.01,Math.acos(i/tmpNum)-PI2*(1/4-angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=25;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.09+ran()*0.01,deg2rad(85+i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.09+ran()*0.01,deg2rad(-85-i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==52){//4
        tmpNum=90;
        angle=-20*ran()+10;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.11*cos(45)/cos(abs(i-45))+ran()*0.01,deg2rad(-90-i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=70;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.11*i/tmpNum,deg2rad(angle-90-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.092*i/tmpNum,deg2rad(angle+90-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=70;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.11*i/tmpNum,deg2rad(angle-180-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.073*i/tmpNum,deg2rad(angle-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==53){//5
        tmpNum=180;
        angle=-10+20*ran();
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.11*i/tmpNum+ran()*0.01,-Math.acos(i/tmpNum)+PI2*(1/4+angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=20;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.11+ran()*0.01,deg2rad(80+i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=70;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.0825*i/tmpNum,deg2rad(angle-90-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=35;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.0825/cos(i-35)+ran()*0.01,deg2rad(angle-55-i),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==54){//6
        tmpNum=360;
        angle=-10*ran()+20;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.05+ran()*0.01,2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=100;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.05*0.113/Math.sqrt(0.113*cos(i)*0.113*cos(i)+0.05*sin(i)*0.05*sin(i))+ran()*0.01,deg2rad(angle+180+i),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==55){//7
        tmpNum=60;
        angle=-10*ran();
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.12*cos(25)/cos(abs(i-25))+ran()*0.01,deg2rad(-65-i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=70;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.12*i/tmpNum,deg2rad(angle-65-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.08*i/tmpNum,deg2rad(angle+115-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==56){//8
        tmpNum=180;
        angle=-10+20*ran();
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.09*i/tmpNum+ran()*0.01,-Math.acos(i/tmpNum)+PI2*(1/4+angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.09*i/tmpNum+ran()*0.01,Math.acos(i/tmpNum)-PI2*(1/4-angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.09*i/tmpNum+ran()*0.01,-Math.acos(i/tmpNum)-PI2*(1/4-angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.09*i/tmpNum+ran()*0.01,Math.acos(i/tmpNum)+PI2*(1/4+angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=30;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.09+ran()*0.01,deg2rad(75+i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.09+ran()*0.01,deg2rad(-75-i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==57){//9
        tmpNum=360;
        angle=-10*ran()+20;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.05+ran()*0.01,2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=100;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.05*0.113/Math.sqrt(0.113*cos(i)*0.113*cos(i)+0.05*sin(i)*0.05*sin(i))+ran()*0.01,deg2rad(angle+i),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==97){//a
        tmpNum=360;
        angle=-10*ran()+40;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.04+ran()*0.01,2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=90;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.06*cos(50)/cos(abs(i-50))+ran()*0.01,deg2rad(-i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==98){//b
        tmpNum=360;
        angle=20*ran()+120;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.04+ran()*0.01,2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=110;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.06*cos(40)/cos(abs(i-40))+ran()*0.01,deg2rad(i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==99){//c
        tmpNum=300;
        angle=50*ran();
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.045+ran()*0.01,deg2rad(i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==100){//d
        tmpNum=360;
        angle=-20*ran()+40;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.045+ran()*0.01,2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=110;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.063*cos(40)/cos(abs(i-40))+ran()*0.01,deg2rad(-i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==101){//e
        tmpNum=320;
        angle=70*ran();
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.045+ran()*0.01,deg2rad(i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=50;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.045*i/tmpNum,deg2rad(angle-40),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=50;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.045*i/tmpNum,deg2rad(angle+140),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==102){//f
        tmpNum=180;
        angle=-10+20*ran();
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.035+ran()*0.01,deg2rad(i+180),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=150;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.035/cos(abs(i/2))+ran()*0.01,deg2rad(180+angle-i/2),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=80;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.035/cos(50)*cos(40)/cos(i-20),deg2rad(70+angle+i),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==103){//g
        tmpNum=360;
        angle=20*ran()-10;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.04+ran()*0.01,2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=110;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.055*cos(40)/cos(abs(i-40))+ran()*0.01,deg2rad(angle+i-45),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=5;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.055*cos(40)/cos(abs(i-70))+ran()*0.01,deg2rad(angle+65-i),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=35;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.055*cos(40)/cos(70)+ran()*0.01,deg2rad(angle+i+65),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==104){//h
        tmpNum=80;
        angle=-10+ran()*20;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.06+ran()*0.01,deg2rad(-i-50+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=60;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.06*cos(50)/cos(abs(i-50))+ran()*0.01,deg2rad(-50+i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=85;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.06*cos(50)/cos(abs(i-75))+ran()*0.01,deg2rad(-105-i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=25;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.06*cos(50)/cos(abs(i-75))+ran()*0.01,deg2rad(-105-i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==105){//i
        angle=-100+20*ran();
        tmpNum=50;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.075+ran()*0.01,deg2rad(angle+ran()*4-2),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=70;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.048*i/tmpNum,deg2rad(angle-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        angle-=180;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.02*i/tmpNum,deg2rad(angle-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==106){//j
        tmpNum=180;
        angle=-10+20*ran();
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.035+ran()*0.01,deg2rad(i),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=140;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.035/cos(i/2)+ran()*0.01,deg2rad(angle-i/2),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=20;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.035/cos(80)-0.04,deg2rad(angle-80+4*ran()),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==107){//k
        angle=-55+20*ran();
        tmpNum=50;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.08*i/tmpNum,deg2rad(angle-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        angle+=90;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.08*i/tmpNum,deg2rad(angle-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=70;
        angle+=45;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.06*i/tmpNum,deg2rad(angle-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        angle-=180;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.117*i/tmpNum,deg2rad(angle-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));

    }
    else if(type==108){//l
        angle=-100+20*ran();
        tmpNum=70;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.011*i/tmpNum,deg2rad(angle-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        angle-=180;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.047*i/tmpNum,deg2rad(angle-2+ran()*4),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==109){//m
        tmpNum=180;
        angle=-10+20*ran();
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.045*i/tmpNum+ran()*0.005,-Math.acos(i/tmpNum)-PI2*(0-angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.045*i/tmpNum+ran()*0.005,Math.acos(i/tmpNum)+PI2*(1/2+angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=45;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.045/cos(i),deg2rad(i+angle)+ran()*0.01,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.045*i/tmpNum,deg2rad(90+angle)+ran()*0.01,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=75;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.045/cos(i-45)+ran()*0.01,deg2rad(i+135+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==110){//n
        tmpNum=80;
        angle=-10+ran()*20;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.058+ran()*0.01,deg2rad(-i-50+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=60;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.058*cos(50)/cos(abs(i-50))+ran()*0.01,deg2rad(-50+i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=70;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.058*cos(50)/cos(abs(i-60))+ran()*0.01,deg2rad(-120-i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==111){//o
        tmpNum=360;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.045+ran()*0.01,2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==112){//p
        tmpNum=360;
        angle=20*ran()+200;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.04+ran()*0.01,2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=110;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.056*cos(40)/cos(abs(i-40))+ran()*0.01,deg2rad(angle-i),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==113){//q
        tmpNum=360;
        angle=-20*ran()-20;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.04+ran()*0.01,2*Math.PI*i/tmpNum,color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=110;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.056*cos(40)/cos(abs(i-40))+ran()*0.01,deg2rad(angle+i),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==114){//r
        tmpNum=80;
        angle=-10+ran()*20;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.057+ran()*0.01,deg2rad(-i-50+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=70;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.057*cos(50)/cos(abs(i-60))+ran()*0.01,deg2rad(-120-i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==115){//s
        tmpNum=180;
        angle=-10+20*ran();
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.045*i/tmpNum,-Math.acos(i/tmpNum)-PI2*(1/4-angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.045*i/tmpNum,-Math.acos(i/tmpNum)+PI2*(1/4+angle/360),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=35;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.045,deg2rad(-95+i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.045,deg2rad(85+i+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==116){//t
        tmpNum=180;
        angle=-10+20*ran();
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.03+ran()*0.01,deg2rad(i),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=140;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.03/cos(abs(i/2))+ran()*0.01,deg2rad(180+angle+i/2),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=70;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.03/cos(60)*cos(30)/cos(i-20),deg2rad(-70+angle-i),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==117){//u
        tmpNum=60;
        angle=-10+ran()*20;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.075+ran()*0.01,deg2rad(i+60+angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=68;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.075*cos(60)/cos(abs(i-68))+ran()*0.01,deg2rad(68-i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=60;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.075*cos(60)/cos(abs(i-60))+ran()*0.01,deg2rad(120+i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==118){//v
        angle=180+ran()*20;
        tmpNum=100;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.05*cos(40)/cos(abs(i-40))+ran()*0.01,deg2rad(angle-i),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction));
        angle-=200;
        tmpNum=100;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.05*cos(40)/cos(abs(i-40))+ran()*0.01,deg2rad(i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==119){//w
        angle=105+30*ran();
        tmpNum=50;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.05*i/tmpNum,deg2rad(angle-2+4*ran()),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=90;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.05*cos(40)/cos(abs(i-40))+ran()*0.01,deg2rad(angle+i-2+4*ran()),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=50;
        angle-=60;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.05*i/tmpNum,deg2rad(angle),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=90;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.05*cos(40)/cos(abs(i-40))+ran()*0.01,deg2rad(angle-i),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==120){//x
        angle=-70+30*ran();
        tmpNum=50;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.06*i/tmpNum,deg2rad(angle-2+4*ran()),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.06*i/tmpNum,deg2rad(angle+180-2+4*ran()),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        angle+=110;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.06*i/tmpNum,deg2rad(angle-2+4*ran()),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.06*i/tmpNum,deg2rad(angle+180-2+4*ran()),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==121){//y
        angle=-70+30*ran();
        tmpNum=50;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.08*i/tmpNum,deg2rad(angle-2+4*ran()),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.08*i/tmpNum,deg2rad(angle+180-2+4*ran()),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        angle+=110;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.08*i/tmpNum,deg2rad(angle+180-2+4*ran()),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
    }
    else if(type==122){//z
        angle=-70+30*ran();
        tmpNum=50;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.05*i/tmpNum,deg2rad(angle-2+4*ran()),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=70;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.05*cos(35)/cos(abs(i-35))+ran()*0.01,deg2rad(-i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction));
        angle-=180;
        tmpNum=50;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.05*i/tmpNum,deg2rad(angle-2+4*ran()),color,Math.random()*2+0.5,Math.random()*200+800,0,0.00005,ctx,invisibleTime, friction));
        tmpNum=70;
        for(i=0;i<tmpNum;i++)
            fire.push(new FireworkPoint(x,y,0.05*cos(35)/cos(abs(i-35))+ran()*0.01,deg2rad(-i+angle),color,ran()*2+0.5,ran()*200+800,0,0.00005,ctx,invisibleTime, friction));
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
function rand(x){
    return Math.random()*x;
}
function sqrt(x){
    return Math.sqrt(x);
}

var PI2=Math.PI*2;
