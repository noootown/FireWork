# FireWork
A JQuery library to make online fireworks, as you see in the gif.

#### Demo

Move your mouse, type your keyboard and you'll get fireworks! 

[http://noootown.github.io/FireWork](http://noootown.github.io/FireWork)

#### Gif

![demo](img/firework.gif)

# Features

1. Implemented with html5 canvas api
2. You can let off fireworks automatically or by  keyboard.
3. 35 types of firework!!!

# API

#### 1. $('#mainCanvas').firework(object)

Purpose:
  Generate firework manager in a canvas 

Important:
  Because of the graphic efficiency, FireWork only supports one canvas at a time to let off fireworks.

~~~ javascript
<script>
  $('#mainCanvas').firework({
      speed:20,
      time:30,
      cycle:500,
      firework:[[0,36]]
  });
</script>

~~~

Overall parameters:

Option | Type | Default | Range | Description
------ | ---- | ------- | ----- | -----------
height | number | $(window).height() | > 0 | specify the height of the canvas (optional)
width | number | $(window).width() | > 0 | specify the width of the canvas (optional)
speed | number | 30 | 10 ~ 60 | specify how fast the firework points explodes (optional)
time | number | 30 | 10 ~ 60 | specify how long the firework appears (optional)
fire | array  | null | x | specify the detail of the firework (below this table, optional)
period | integer | null | > 0 | the period of firework (ms) (optional)


Fire array form:

[[time offset,type,x,y]]

Fire parameters:

Option | Type | Range | Description
------ | ---- | ----- | -----------
time offset | number | > 0 | time offset since the firework function was called
type | number | 0 ~ 36 | specify the type of the firework (36 means random)
x | number | real number | specify the x-coordinate that the firework explodes (optional, if ignore then it's random)
y | number | real number | specify the y-coordinate that the firework explodes (optional, if ignore then it's random)

Example:
~~~ javascript
$('#mainCanvas').firework({
        cycle:500,
        firework:[[0,36],[300,5,500,500]]
    });
~~~ 
means let off a firework with random type every 500ms

#### 2. $('#mainCanvas').setCanvas(object)

Purpose:
  Resize canvas

Parameters:

Option | Type | Default | Range | Description
------ | ---- | ------- | ----- | -----------
height | number | $(window).height() | > 0 | specify the height of the canvas (optional)
width | number | $(window).width() | > 0 | specify the width of the canvas (optional)
  
Example:
~~~javascript
$(window).on('resize',function(){
    $('#mainCanvas').setCanvas();
});
~~~

#### 3. $('#mainCanvas').shoot(array)

Purpose:
  Let off fireworks immediately.

Form:

[[type,x,y]]

Parameters:

Option | Type | Range | Description
------ | ---- | ----- | -----------
type | number | 0 ~ 36 | specify the type of the firework (36 means random)
x | number | real number | specify the x-coordinate that the firework explodes (optional, if ignore then it's random)
y | number | real number | specify the y-coordinate that the firework explodes (optional, if ignore then it's random)

Example:
~~~ javascript
$('#mainCanvas').shoot([[5,500,500]]);
~~~ 

# Tools

- Jquery
- html5 canvas api

# License
MIT
