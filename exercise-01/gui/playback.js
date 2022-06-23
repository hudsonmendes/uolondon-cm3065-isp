class Playback extends Drawable {
    constructor() {
        super();
        // binds
        this.draw = this.draw.bind(this)
        // Playback controls
        this.pauseButton = null;
        this.playButton = null;
        this.stopButton = null;
        this.skipStartButton = null;
        this.skipEndButton = null;
        this.loopButton = null;
        this.recordButton = null;
    }

    draw() {
        // Playback controls
        this.pauseButton = createButton('pause');
        this.pauseButton.position(10, 20);
        this.playButton = createButton('play');
        this.playButton.position(70, 20);
        this.stopButton = createButton('stop');
        this.stopButton.position(120, 20);
        this.skipStartButton = createButton('skip to start');
        this.skipStartButton.position(170, 20);
        this.skipEndButton = createButton('skip to end');
        this.skipEndButton.position(263, 20);
        this.loopButton = createButton('loop');
        this.loopButton.position(352, 20);
        this.recordButton = createButton('record');
        this.recordButton.position(402, 20);
    }
}