# GLife-Web

This project is a web implementation of Conway's [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) 
(with a little twist of the Genetic Algorithm utilisation).

Repository: [https://github.com/lbacik/glife-web](https://github.com/lbacik/glife-web)

The genetic algorithm is implemented by a library called [genes](https://github.com/lbacik/genes).

## How it works

### Board

The **board** has two modes: the *ad hoc* play or presenting *test* results. When playing in *ad hoc* mode, you have the 
freedom to set all game parameters:

* __width__ - the board width in cell number
* __height__ - the board height
* __cell size__ - the size of the one cell in pixels
* __survive__ - this setting refers to the Game of Life rules and determines the number of neighbours a cell needs to stay alive.
* __reproduction__ - specify the number of neighbours needed to turn an empty cell into a live cell.

The *survive* and *reproduction* settings are set to Conway Game of Life rules by default.

#### Controls

<ul class="icons">
    <li class="step">
        <img src="{{ asset('images/step.png') }}"/>
        this button allows you to calculate the next generation of the colony visible on the board - it is a <strong>single step</strong> 
    </li>
    <li class="play">
        <img src="{{ asset('images/play.png') }}"/>
        The play button allows you to calculate the next generation automatically at intervals specified in the <i>interval</i> input box.
    </li>
</ul>

#### Initial colony

There are also settings allowing you to set the initial colony.

* __x__ - the x coordinate of the colony *start* cell
* __y__ - the y coordinate of the colony *start* cell
* __width__ - the width of the colony
* __initial generation__ - the initial generation of the colony provided as the string of 0 and 1 characters

Because the way the initial colony is set can be a little bit tricky,  
which probably will explain the whole idea much better than words!

[Here is an example](/?width=20&height=20&cellSize=30&rules=001100000%2C000100000&play=0&interval=1000&initX=5&initY=5&initWidth=10&initData=100111000111100001111000011110111000111100011110001110000111100001111000011100001111) 
that will better explain the idea of setting the initial colony rather than just describing it with words.

* __show on grid__ - this checkbox shows where the initial colony will be placed on the board
* __Apply__ - applies the initial colony settings - now you can start to play!

#### Colony url

The initial colony can be also set by providing the url with the initial colony settings - such an url for an actually 
set colony is visible below all other settings. You can copy it and send it to your friends to show them your colony.
Also, notice the *Set initial* button above the board - by it, you can generate the initial setting from the current board state.

### Tests

Tests are described by JSON objects at JsonHub service - currently used test definition is named [test-v1](https://jsonhub.cloud/definitions/018c864c-7e7b-77b1-b5a0-98e0071d358d).

[Examples](https://jsonhub.cloud/entities?q=test-v)

![diagram]( {{ asset('images/diagram.png') }})

__Add test process__ is a non-public, manual process. Hence, users cannot calculate the tests themselves. 
The GLife project is intended only to display the test results that are already calculated by the instance owner.
