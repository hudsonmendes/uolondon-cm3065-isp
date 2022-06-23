import Drawable from '../drawable'

export default class WaveShifter extends Drawable {
    constructor() {
        super();
        // binds
        this.draw = this.draw.bind(this)
        // waveshaper distortion
        this.wd_amountSlider = null;
        this.wd_oversampleSlider = null;
        this.wd_dryWetSlider = null;
        this.wd_outputSlider = null;
    }

    draw() {
        // waveshaper distortion
        textSize(14);
        text('waveshaper distortion', 210, 305);
        textSize(10);
        this.wd_amountSlider = createSlider(0, 1, 0.5, 0.01);
        this.wd_amountSlider.position(210, 335);
        text('distortion amount', 210, 330);
        this.wd_oversampleSlider = createSlider(0, 1, 0.5, 0.01);
        this.wd_oversampleSlider.position(210, 380);
        text('oversample', 210, 375);
        this.wd_dryWetSlider = createSlider(0, 1, 0.5, 0.01);
        this.wd_dryWetSlider.position(210, 425);
        text('dry/wet', 210, 420);
        this.wd_outputSlider = createSlider(0, 1, 0.5, 0.01);
        this.wd_outputSlider.position(210, 470);
        text('output level', 210, 465);
    }
}