
export function hsvRand(type,array){
    let angle;
    let trueState=true;
    if(type==0){
        angle=rand(360);
    }
    else if(type==1){
        while(trueState){//probability densitiy function
            angle=rand(360);
            if(angle>156 && angle<202){
                if(rand(50)>49)
                    break;
            }
            else if(angle>258 && angle<328){
                if(rand(50)>49)
                    break;
            }
            else if(angle>60 && angle<360){
                if(rand(15)>14)
                    break;
            }
            else if(angle>54){
                break;
            }
            else if(angle>40){
                if(rand(8)>7)
                    break;
            }
            else{
                if(rand(8)>7)
                    break;
            }
        }
    }
    else if(type==2){
        while(trueState){//probability densitiy function
            angle=rand(360);
            if(angle>156 && angle<202){
                if(rand(20)>19)
                    break;
            }
            else if(angle>258 && angle<300){
                if(rand(20)>19)
                    break;
            }
            else
                break;
        }
    }
    else if(type==3){
        let len=array.length;
        angle=array[Math.floor(rand(len))];
    }
    return hsv(angle);
}
export function hsv(angle){//s: 100% v: 100%
    let s=0.7;
    let v=1;
    let c=v*s;
    let m=v-c;
    let x=c-abs((angle/60)%2-1);
    let hi=( (angle-angle%60) /60 )%6;
    let co=Math.floor(255*(c+m));
    let xo=Math.floor(255*(x+m));
    let mo=Math.floor(255*m);
    if(hi==0)
        return 'rgb('+co+','+xo+','+mo+')';
    else if(hi==1)
        return 'rgb('+xo+','+co+','+mo+')';
    else if(hi==2)
        return 'rgb('+mo+','+co+','+xo+')';
    else if(hi==3)
        return 'rgb('+mo+','+xo+','+co+')';
    else if(hi==4)
        return 'rgb('+xo+','+mo+','+co+')';
    else if(hi==5)
        return 'rgb('+co+','+mo+','+xo+')';
}


export function cos(x){
    return Math.cos(2*Math.PI*x/360);
}

export function sin(x){
    return Math.sin(2*Math.PI*x/360);
}

export function abs(x){
    return Math.abs(x);
}

export function deg2rad(x){
    return Math.PI*2*x/360;
}

export function ran(){
    return Math.random();
}

export function rand(x){
    return Math.random()*x;
}

export function sqrt(x){
    return Math.sqrt(x);
}

export var PI2=Math.PI*2;
