import { Constructor } from '../utils/MixinConstructor.js';
import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Ticks } from './Tick.js';

export type AreaTicks = {
    x: Ticks,
    y: Ticks
}

export interface AreaSliderMixinInterface {
    ticks: AreaTicks;
}

export function AreaSliderMixin<T extends Constructor<LitElement>>(constructor: T): T & Constructor<AreaSliderMixinInterface> {
    class AreaSliderClass extends constructor {
        @property({ type: Array })
        public ticks: AreaTicks = null;
    };

    return AreaSliderClass;
}