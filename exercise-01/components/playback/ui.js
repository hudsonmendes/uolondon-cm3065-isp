class PlaybackUI extends Drawable {
    constructor({ sound }) {
        super();
        // binds
        this.draw = this.draw.bind(this);
        this.onPauseClick = this.onPauseClick.bind(this);
        this.onPlayClick = this.onPlayClick.bind(this);
        this.onStopClick = this.onStopClick.bind(this);
        this.onSkipStartClick = this.onSkipStartClick.bind(this);
        this.onSkipEndClick = this.onSkipEndClick.bind(this);
        this.onLoopClick = this.onLoopClick.bind(this);
        this.onRecordClick = this.onRecordClick.bind(this);

        // attributes
        this.sound = sound;

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
        this.pauseButton = createButton('pause');
        this.pauseButton.mouseClicked(this.onPauseClick);

        this.playButton = createButton('play');
        this.playButton.mouseClicked(this.onPlayClick);

        this.stopButton = createButton('stop');
        this.stopButton.mouseClicked(this.onStopClick);

        this.skipStartButton = createButton('skip to start');
        this.skipStartButton.mouseClicked(this.onSkipStartClick);

        this.skipEndButton = createButton('skip to end');
        this.skipEndButton.mouseClicked(this.onSkipEndClick);

        this.loopButton = createButton('loop');
        this.loopButton.mouseClicked(this.onLoopClick);

        this.recordButton = createButton('record');
        this.recordButton.mouseClicked(this.onRecordClick);
    }

    draw() {
        // Playback controls
        this.pauseButton.position(10, 20);
        this.playButton.position(70, 20);
        this.stopButton.position(120, 20);
        this.skipStartButton.position(170, 20);
        this.skipEndButton.position(263, 20);
        this.loopButton.position(352, 20);
        this.recordButton.position(402, 20);
    }

    onPauseClick() {
        if (!this.sound.isPlaying())
            console.log("not playing")
        else {
            console.log("plause");
            this.sound.pause();
        }
    }

    onPlayClick() {
        if (this.sound.isPlaying())
            console.log("already playing");
        else {
            console.log("play");
            this.sound.play();
        }
    }

    onStopClick() {
        if (!this.sound.isPlaying())
            console.log("not playing")
        else {
            console.log("stop");
            this.sound.stop();
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
    }

    onRecordClick() {
        console.log("record");
    }
}