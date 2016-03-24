# FireWork
A JQuery library to let off online fireworks, as you see in the gif.

#### Demo

Move your mouse, type your keyboard and you'll get fireworks! Though the demo website isn't finished, you can still have a try with my fireworks. The website also supports youtube music, replay and captions, which is not packaged in this library. By the way, the upload feature is not done.

[http://noootown.github.io/FireWork](http://noootown.github.io/FireWork)

#### Gif

![demo](img/firework.gif)

# Install
~~~ html
<script src="jquery.min.js"></script> <!--Firework is a jquery library!!!-->
<script src="firework.min.js"></script> <!--placed in dist/ directory -->
~~~

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
      speed: 20,
      time: 30,
      cycle: 500,
      fire:[ [0, 36], [300, 5, 500, 500] ]
  });
</script>

~~~

Overall parameters:

Option | Type | Default | Range | Description
------ | ---- | ------- | ----- | -----------
height | number | $(window).height() | > 0 | specify the height of the canvas (optional)
width | number | $(window).width() | > 0 | specify the width of the canvas (optional)
speed | number | 30 | 10 ~ 60 | specify how fast the firework points flies (optional)
time | number | 30 | 10 ~ 60 | specify how long the firework appears (optional)
fire | array  | null | x | specify the detail of the firework (below this table, optional)
period | integer | null | > 0 | the period of firework (ms) (optional)


Fire array form:

[ [time offset, type, x, y] ]

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
        firework:[ [0, 36], [250, 5, 500, 500] ]
    });
~~~ 
It means letting off a random type firework every 500ms and a type 5 firework at (500, 500) with 250ms time offset.

Coordinate:

~~~javascript

(0,0)--------> x
  |
  |
  |
  V
  y

~~~

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

[type, x, y]

Parameters:

Option | Type | Range | Description
------ | ---- | ----- | -----------
type | number | 0 ~ 36 | specify the type of the firework (36 is random)
x | number | real number | specify the x-coordinate that the firework explodes (optional, if ignore then it's random)
y | number | real number | specify the y-coordinate that the firework explodes (optional, if ignore then it's random)

Example:
~~~ javascript
var fireworkMap={//keycode to ascii code
        //0~9
        48:[0,48], //keycode:[type,ascii code]
        49:[1,49],
        50:[2,50],
        51:[3,51],
        52:[4,52],
        53:[5,53],
        54:[6,54],
        55:[7,55],
        56:[8,56],
        57:[9,57]
}
document.addEventListener('keydown', function (event) {
    var modifiers = event.altKey||event.ctrlKey||event.metaKey||event.shiftKey;//加了這些key就不行
    if (!modifiers) {
        if (fireworkMap[event.which] !== undefined) {
            event.preventDefault();
            $('#mainCanvas').shoot( [ fireworkMap[event.which][0] ] );//random x and y
        }
    }
});
~~~ 

# Tools

- Jquery
- html5 canvas api

# License
MIT
