import { LitElement, ReactiveControllerHost } from "lit";
import { property } from 'lit/decorators.js';
import { BaseSliderController } from "../controllers/BaseSliderController.js";
import { ISlider } from "../utils/ISlider.js";
import { SliderValue, SliderLimit, SliderStep, SliderValueMap, Position2D, SliderPad } from "../utils/SliderTypes.js";

export abstract class BaseSlider extends LitElement implements ReactiveControllerHost, ISlider {
    protected controller: BaseSliderController = new BaseSliderController(this);

    @property({ type: Object })
    public value: SliderValue = 0;

    @property({ type: Object })
    public min: SliderLimit = 0;

    @property({ type: Object })
    public max: SliderLimit = 0;

    @property({ type: Object })
    public step: SliderStep = 'any';

    @property({ type: Object })
    public valueMap: SliderValueMap = null;

    @property({ type: Object })
    public pad: SliderPad = 0;

    @property({ type: Array })
    public get thumbPositions(): Array<Position2D> {
        return this.controller.thumbPositions;
    }
}