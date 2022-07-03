import { ReactiveController, ReactiveControllerHost } from 'lit';
import { ISlider } from '../utils/ISlider.js';
import { ISliderController } from '../utils/ISliderController.js';
import { Position2D, sliderValueToArray, sliderLimitToPosition, sliderPadToPosition } from "../utils/SliderTypes.js";

type Host = ReactiveControllerHost & ISlider & Element;

type HostAttributes = {
    x: number;
    y: number;
    width: number;
    height: number;
    cx: number;
    cy: number;
    radius: number;
}

export class BaseSliderController implements ReactiveController, ISliderController {
    private host: Host;
    private hostAttributes: HostAttributes = null;
    private values: Array<Position2D> = null;

    private observer = new ResizeObserver(() => {
        this.updateHostAttributes();
    });

    constructor(host: Host) {
        (this.host = host).addController(this);
    }

    //public value: SliderValue = null;
    //public min: SliderLimit = null;
    //public max: SliderLimit = null;
    //public step: SliderStep = null;
    //public valueMap: SliderValueMap = null;

    public thumbPositions: Array<Position2D> = null;
    
    hostConnected(): void {
        //this.log('HOST CONNECTED');
        this.observer.observe(this.host);
    }

    hostDisconnected(): void {
        this.observer.unobserve(this.host);
    }
  
    hostUpdate(): void {
        this.log('HOST UPDATE');
        this.updateHostAttributes();
        this.calculateThumbPositions();
    }

    hostUpdated(): void {
        //this.log('HOST UPDATED');
    }

    private updateHostAttributes() {
        const rect = this.host.getBoundingClientRect();
        this.hostAttributes = {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
            cx: rect.width / 2 + rect.x,
            cy: rect.height / 2 + rect.y,
            radius: Math.min(rect.width, rect.height) / 2
        };
    }

    private calculateThumbPositions() {
        console.log('CALCULATE THUMB POSITIONS');
        this.values = sliderValueToArray(this.host.value);
        const min = sliderLimitToPosition(this.host.min);
        const max = sliderLimitToPosition(this.host.max);
        const pad = sliderPadToPosition(this.host.pad);
        const rangeX = max.x - min.x;
        const rangeY = max.y - min.y;
        const effectiveWidth = this.hostAttributes.width - (pad.x * 2);
        const effectiveHeight = this.hostAttributes.height - (pad.y * 2);

        console.log(this.values);
        console.log(min);
        console.log(max);
        console.log(pad);

        this.thumbPositions = this.values.map(v => {
            return {
                x: (v.x / rangeX * effectiveWidth) + pad.x,
                y: (v.y / rangeY * effectiveHeight) + pad.y
            }
        });
    }

    private log(msg: string) {
        console.log(`${msg}: ${this.host.value} - (${this.host.min}, ${this.host.max})`);
    }
}


