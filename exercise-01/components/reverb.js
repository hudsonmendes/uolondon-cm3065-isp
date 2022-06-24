class Reverb extends Drawable {
    constructor() {
        super();
        // binds
        this.setup = this.setup.bind(this);
        this.draw = this.draw.bind(this)
        // reverb
        this.rv_durationSlider = null;
        this.rv_decaySlider = null;
        this.rv_dryWetSlider = null;
        this.rv_outputSlider = null;
        this.rv_reverseButton = null;
    }

    setup() {
        // reverb
        textSize(14);
        text('reverb', 10, 305);
        textSize(10);

        text('duration', 10, 330);
        this.rv_durationSlider = createSlider(0, 1, 0.5, 0.01);
        this.rv_durationSlider.position(10, 335);

        text('decay', 10, 375);
        this.rv_decaySlider = createSlider(0, 1, 0.5, 0.01);
        this.rv_decaySlider.position(10, 380);

        text('dry/wet', 10, 420);
        this.rv_dryWetSlider = createSlider(0, 1, 0.5, 0.01);
        this.rv_dryWetSlider.position(10, 425);

        text('output level', 10, 465);
        this.rv_outputSlider = createSlider(0, 1, 0.5, 0.01);
        this.rv_outputSlider.position(10, 470);

        this.rv_reverseButton = createButton('reverb reverse');
        this.rv_reverseButton.position(10, 510);
    }

    draw() {
    }
}