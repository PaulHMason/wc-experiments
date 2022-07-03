import { ReactiveController, ReactiveControllerHost } from 'lit';
import { ISlider } from '../utils/ISlider.js';
import { ISliderController } from '../utils/ISliderController.js';
import { Vector2, getSliderValueKind, sliderValueToArray, ArrayToSliderValue, sliderLimitToPosition, sliderPadToPosition, clampValues, Movement, SliderValueKind } from "../utils/SliderTypes.js";

type Host = ReactiveControllerHost & ISlider & Element;

type HostAttributes = {
    x: number;
    y: number;
    width: number;
    height: number;
    cx: number;
    cy: number;
    radius: number;
    min: Vector2;
    max: Vector2;
    pad: Vector2;
    rangeX: number;
    rangeY: number;
}

export class BaseSliderController implements ReactiveController, ISliderController {
    private boundOnMouseDown = this.onMouseDown.bind(this);
    private boundOnMouseMove = this.onMouseMove.bind(this);
    private boundOnMouseUp = this.onMouseUp.bind(this);
    private dragging: boolean = false;
    private dragIndex: number = -1;

    private host: Host;
    private hostAttributes: HostAttributes = null;
    private values: Array<Vector2> = null;
    private valueKind: SliderValueKind = SliderValueKind.Invalid;

    private observer = new ResizeObserver(() => {
        this.updateHostAttributes();
    });

    public thumbPositions: Array<Vector2> = null;
    public movement: Movement = 'any';

    constructor(host: Host) {
        (this.host = host).addController(this);
    }

    hostConnected(): void {
        this.observer.observe(this.host);
        this.host.addEventListener('mousedown', this.boundOnMouseDown);
        this.host.addEventListener('mouseup', this.boundOnMouseUp);
        this.host.addEventListener('touchstart', this.boundOnMouseDown);
        this.host.addEventListener('touchend', this.boundOnMouseUp);
    }

    hostDisconnected(): void {
        this.observer.unobserve(this.host);
        this.host.removeEventListener('mousedown', this.boundOnMouseDown);
        this.host.removeEventListener('mouseup', this.boundOnMouseUp);
        this.host.removeEventListener('touchstart', this.boundOnMouseDown);
        this.host.removeEventListener('touchend', this.boundOnMouseUp);
    }

    hostUpdate(): void {
        this.updateHostAttributes();
        this.calculateThumbPositions();
    }

    private updateHostAttributes() {
        const rect = this.host.getBoundingClientRect();
        const min = sliderLimitToPosition(this.host.min);
        const max = sliderLimitToPosition(this.host.max);
        const pad = sliderPadToPosition(this.host.pad);

        this.hostAttributes = {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
            cx: rect.width / 2 + rect.x,
            cy: rect.height / 2 + rect.y,
            radius: Math.min(rect.width, rect.height) / 2,
            min: min,
            max: max,
            pad: pad,
            rangeX: max.x - min.x,
            rangeY: max.y - min.y
        };
    }

    private calculateThumbPositions() {
        console.log(this.movement);
        this.valueKind = getSliderValueKind(this.host.value);
        this.values = sliderValueToArray(this.host.value, this.valueKind);
        const min = this.hostAttributes.min;
        const max = this.hostAttributes.max;
        const pad = this.hostAttributes.pad;
        const rangeX = this.hostAttributes.rangeX;
        const rangeY = this.hostAttributes.rangeY;
        const effectiveWidth = this.hostAttributes.width - (pad.x * 2);
        const effectiveHeight = this.hostAttributes.height - (pad.y * 2);

        clampValues(this.values, min, max);

        switch (this.movement) {
            case 'horizontal': {
                const y = (effectiveHeight / 2) + pad.y;

                this.thumbPositions = this.values.map(v => {
                    return {
                        x: (v.x / rangeX * effectiveWidth) + pad.x,
                        y: y
                    }
                });

                break;
            }

            case 'vertical': {
                const x = (effectiveWidth / 2) + pad.x;

                this.thumbPositions = this.values.map(v => {
                    return {
                        x: x,
                        y: (v.y / rangeY * effectiveHeight) + pad.y
                    }
                });

                break;
            }

            case 'radial': {
                this.thumbPositions = [];
                break;
            }

            default: { // 'any'
                this.thumbPositions = this.values.map(v => {
                    return {
                        x: (v.x / rangeX * effectiveWidth) + pad.x,
                        y: (v.y / rangeY * effectiveHeight) + pad.y
                    }
                });
            }
        }
    }

    private updateHostValue(mouseX: number, mouseY: number) {
        // This needs to cater for different movement types.
        //console.log(`UPDATE HOST VALUE: (${mouseX}, ${mouseY}) - ${this.dragIndex}`);
        
        const value = this.values[this.dragIndex];
        const xRatio = (mouseX - this.hostAttributes.x) / this.hostAttributes.width;
        const yRatio = (mouseY - this.hostAttributes.y) / this.hostAttributes.height;
        const x = xRatio * this.hostAttributes.rangeX;
        const y = yRatio * this.hostAttributes.rangeY;
        
        //value.x = x;
        //value.y = y;

        switch (this.movement) {
            case 'horizontal': {
                value.x = x;
                break;
            }

            case 'vertical': {
                value.y = y;
                break;
            }

            case 'radial': {
                break;
            }

            default: { // 'any'
                value.x = x;
                value.y = y;
            }
        }

        this.host.value = ArrayToSliderValue(this.values, this.valueKind);
    }

    private onMouseDown(e: MouseEvent) {
        if (this.thumbPositions && this.thumbPositions.length > 0) {
            this.dragIndex = -1;

            if (this.thumbPositions.length === 1) {
                // There is only one thumb - nothing more to do.
                // console.log(`THUMB: (${this.thumbPositions[0].x}, ${this.thumbPositions[0].y})`);
                // console.log(`MOUSE: (${e.offsetX}, ${e.offsetY})`);
                this.dragIndex = 0;

            } else {
                // Find the index of the closest thumb to track.
                const mouseRadius = Math.sqrt((e.offsetX * e.offsetX) + (e.offsetY * e.offsetY));

                this.dragIndex = this.thumbPositions.map((pos, index) => {
                    return {
                        rx: Math.abs(mouseRadius - Math.sqrt((pos.x * pos.x) + (pos.y * pos.y))),
                        index: index
                    };
                }).sort((a, b) => (a.rx > b.rx) ? 1 : -1)[0].index;
            }

            if (this.dragIndex > -1) {
                e.stopPropagation();
                e.preventDefault();

                this.dragging = true;
                console.log('down');

                this.host.addEventListener('mousemove', this.boundOnMouseMove);
                this.host.addEventListener('touchmove', this.boundOnMouseMove);

                document.addEventListener('mousemove', this.boundOnMouseMove);
                document.addEventListener('touchmove', this.boundOnMouseMove);

                document.addEventListener('mouseup', this.boundOnMouseUp);
                document.addEventListener('touchend', this.boundOnMouseUp);
            }
        }
    }

    private onMouseMove(e: MouseEvent) {
        if (this.dragging) {
            e.stopPropagation();
            e.preventDefault();
            this.updateHostValue(e.offsetX, e.offsetY);
        }
    }

    private onMouseUp(e: MouseEvent) {
        if (this.dragging) {
            e.stopPropagation();
            e.preventDefault();

            this.updateHostValue(e.offsetX, e.offsetY);

            this.host.removeEventListener('mousemove', this.boundOnMouseMove);
            this.host.removeEventListener('touchmove', this.boundOnMouseMove);

            document.removeEventListener('mousemove', this.boundOnMouseMove);
            document.removeEventListener('touchmove', this.boundOnMouseMove);

            document.removeEventListener('mouseup', this.boundOnMouseUp);
            document.removeEventListener('touchend', this.boundOnMouseUp);
            this.dragging = false;
            this.dragIndex = -1;
            console.log('up');
        }
    }
}