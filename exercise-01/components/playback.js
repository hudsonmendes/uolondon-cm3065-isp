class Playback extends Drawable {
    constructor({ player }) {
        super();
        // binds
        this.setup = this.setup.bind(this);
        this.draw = this.draw.bind(this);
        this.onPauseClick = this.onPauseClick.bind(this);
        this.onPlayClick = this.onPlayClick.bind(this);
        this.onStopClick = this.onStopClick.bind(this);
        this.onSkipStartClick = this.onSkipStartClick.bind(this);
        this.onSkipEndClick = this.onSkipEndClick.bind(this);
        this.onLoopClick = this.onLoopClick.bind(this);
        this.onRecordClick = this.onRecordClick.bind(this);

        // attributes
        this.player = player;

        // Playback controls
        this.pauseButton = null;
        this.playButton = null;
        this.stopButton = null;
        this.skipStartButton = null;
        this.skipEndButton = null;
        this.loopButton = null;
        this.recordButton = null;
    }

    setup() {
        // Playback controls
        this.pauseButton = createButton('pause');
        this.pauseButton.position(10, 20);
        this.pauseButton.mouseClicked(this.onPauseClick);

        this.playButton = createButton('play');
        this.playButton.position(70, 20);
        this.playButton.mouseClicked(this.onPlayClick);

        this.stopButton = createButton('stop');
        this.stopButton.position(120, 20);
        this.stopButton.mouseClicked(this.onStopClick);

        this.skipStartButton = createButton('skip to start');
        this.skipStartButton.position(170, 20);
        this.skipStartButton.mouseClicked(this.onSkipStartClick);

        this.skipEndButton = createButton('skip to end');
        this.skipEndButton.position(263, 20);
        this.skipEndButton.mouseClicked(this.onSkipEndClick);

        this.loopButton = createButton('loop');
        this.loopButton.position(352, 20);
        this.loopButton.mouseClicked(this.onLoopClick);

        this.recordButton = createButton('record');
        this.recordButton.position(402, 20);
        this.recordButton.mouseClicked(this.onRecordClick);
    }

    draw() {
    }

    onPauseClick() {
        if (!this.player.isPlaying())
            console.log("not playing")
        else {
            console.log("plause");
            this.player.pause();
        }
    }

    onPlayClick() {
        if (this.player.isPlaying())
            console.log("already playing");
        else {
            console.log("play");
            this.player.play();
        }
    }

    onStopClick() {
        if (!this.player.isPlaying())
            console.log("not playing")
        else {
            console.log("stop");
            this.player.stop();
        }
    }

    onSkipStartClick() {
        console.log("skip to start");
    }

    onSkipEndClick() {
        console.log("skip to end");
    }

    onLoopClick() {
        console.log("loop");
        this.player.loop();
    }

    onRecordClick() {
        console.log("record");
    }
}