class Lowpass extends Drawable {
    constructor() {
        super();
        // binds
        this.setup = this.setup.bind(this);
        this.draw = this.draw.bind(this)
        // low-pass filter
        this.lp_cutOffSlider = null;
        this.lp_resonanceSlider = null;
        this.lp_dryWetSlider = null;
        this.lp_outputSlider = null;
    }

    setup() {
        // low-pass filter
        textSize(14);
        text('low-pass filter', 10, 80);
        textSize(10);

        text('cutoff frequency', 10, 105);
        this.lp_cutOffSlider = createSlider(0, 1, 0.5, 0.01);
        this.lp_cutOffSlider.position(10, 110);

        text('resonance', 10, 150);
        this.lp_resonanceSlider = createSlider(0, 1, 0.5, 0.01);
        this.lp_resonanceSlider.position(10, 155);

        text('dry/wet', 10, 195);
        this.lp_dryWetSlider = createSlider(0, 1, 0.5, 0.01);
        this.lp_dryWetSlider.position(10, 200);

        text('output level', 10, 240);
        this.lp_outputSlider = createSlider(0, 1, 0.5, 0.01);
        this.lp_outputSlider.position(10, 245);
    }

    draw() {
    }
}