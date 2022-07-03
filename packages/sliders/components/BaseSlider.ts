import { LitElement, ReactiveControllerHost } from "lit";
import { property } from 'lit/decorators.js';
import { BaseSliderController } from "../controllers/BaseSliderController.js";
import { ISlider } from "../utils/ISlider.js";
import { SliderValue, SliderLimit, SliderStep, SliderValueMap, Vector2, SliderPad, Movement } from "../utils/SliderTypes.js";

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
    public get thumbPositions(): Array<Vector2> {
        return this.controller.thumbPositions;
    }

    protected get movement() : Movement {
        return this.controller.movement;
    }

    protected set movement(value: Movement) {
        this.controller.movement = value;
    }
}