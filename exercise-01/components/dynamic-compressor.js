class DynamicCompressor extends Drawable {
    constructor() {
        super();
        // binds
        this.setup = this.setup.bind(this);
        this.draw = this.draw.bind(this);
        this.handleAttackChanged = this.handleAttackChanged.bind(this);
        this.handleKneeChanged = this.handleKneeChanged.bind(this);
        this.handleReleaseChanged = this.handleReleaseChanged.bind(this);
        this.handleRatioChanged = this.handleRatioChanged.bind(this);
        this.handleThresholdChanged = this.handleThresholdChanged.bind(this);
        // dynamic compressor
        this.dc_attackSlider = null;
        this.dc_kneeSlider = null;
        this.dc_releaseSlider = null;
        this.dc_ratioSlider = null;
        this.dc_thresholdSlider = null;
    }

    setup() {
        // dynamic compressor
        textSize(14);
        text("dynamic compressor", 210, 80);
        textSize(10);

        text("attack", 210, 105);
        this.dc_attackSlider = createSlider(0, 1, 0.5, 0.01);
        this.dc_attackSlider.position(210, 110);
        this.dc_attackSlider.input(this.handleAttackChanged);

        text("knee", 210, 150);
        this.dc_kneeSlider = createSlider(0, 1, 0.5, 0.01);
        this.dc_kneeSlider.position(210, 155);
        this.dc_kneeSlider.input(this.handleKneeChanged);

        text("release", 210, 195);
        this.dc_releaseSlider = createSlider(0, 1, 0.5, 0.01);
        this.dc_releaseSlider.position(210, 200);
        this.dc_releaseSlider.input(this.handleReleaseChanged);

        text("ratio", 210, 240);
        this.dc_ratioSlider = createSlider(0, 1, 0.5, 0.01);
        this.dc_ratioSlider.position(210, 245);
        this.dc_ratioSlider.input(this.handleRatioChanged);

        text("threshold", 360, 105);
        this.dc_thresholdSlider = createSlider(0, 1, 0.5, 0.01);
        this.dc_thresholdSlider.position(360, 110);
        this.dc_thresholdSlider.input(this.handleThresholdChanged);
    }

    draw() {}

    handleAttackChanged(e) {
        this.dispatchEvent({
            type: "attackChanged",
            target: e.target,
            attack: this.dc_attackSlider.value(),
        });
    }

    handleKneeChanged(e) {
        this.dispatchEvent({
            type: "kneeChanged",
            target: e.target,
            knee: this.dc_kneeSlider.value(),
        });
    }

    handleReleaseChanged(e) {
        this.dispatchEvent({
            type: "releaseChanged",
            target: e.target,
            release: this.dc_releaseSlider.value(),
        });
    }

    handleRatioChanged(e) {
        this.dispatchEvent({
            type: "ratioChanged",
            target: e.target,
            ratio: this.dc_ratioSlider.value(),
        });
    }

    handleThresholdChanged(e) {
        this.dispatchEvent({
            type: "thresholdChanged",
            target: e.target,
            threshold: this.dc_thresholdSlider.value(),
        });
    }
}
