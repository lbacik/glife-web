# GLife-Web

This project is a web implementation of Conway's [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

Repository: [https://github.com/lbacik/glife-web](https://github.com/lbacik/glife-web)

## How it works

### Board

Configure the board's width, height, and cell size. **Show grid** toggles the cell grid, and **Compact** changes the layout. The **survive** and **reproduction** rules let you choose how many live neighbours a cell needs to survive or for a dead cell to become alive. By default, these rules follow Conway's Game of Life.

Click a cell on the board to toggle it between alive and dead. Use **Set initial** to copy the current board into the initial-colony editor, or **Clear** to empty the board.

### Controls

<ul class="icons">
    <li class="step">
        <img src="{{ asset('images/step.png') }}"/>
        this button advances the board by one generation — a <strong>single step</strong>
    </li>
    <li class="play">
        <img src="{{ asset('images/play.png') }}"/>
        the play button starts or pauses automatic playback at the interval set in the <i>interval</i> box
    </li>
</ul>

The current generation is displayed below the controls, and **reset** sets its counter back to zero.

### Initial colony

Use the initial-colony settings to define a pattern and where it appears on the board:

* **x** and **y** set the pattern's starting coordinates.
* **Width** sets the pattern's width.
* **Initial generation** contains the pattern as a string of `0` and `1` characters, read from left to right and then top to bottom (`1` means alive; `0` means dead). You can enter it directly or choose **Load from file**.
* **show on grid** previews the pattern's placement on the board.
* Select **Apply** to place the pattern on the board.

[Open this example](/?width=20&height=20&cellSize=30&rules=001100000%2C000100000&play=0&interval=1000&initX=5&initY=5&initWidth=10&initData=100111000111100001111000011110111000111100011110001110000111100001111000011100001111) to see an initial colony in action.

### Sharing a colony

The URL below the settings represents the current configuration and initial colony. Copy it to share the setup, or select **add auto play** to include automatic playback. If the initial-colony data is too large for a URL, the page displays a warning to send the data as `text/plain` in a POST request instead.
