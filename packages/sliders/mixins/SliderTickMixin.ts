import { Constructor } from '../utils/MixinConstructor.js';
import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Ticks } from './Tick.js';



declare interface SliderMixinInterface {
    ticks: Ticks;
}

export function SliderMixin<T extends Constructor<LitElement>>(constructor: T): T & Constructor<SliderMixinInterface> {
    class SliderClass extends constructor {
        @property({ type: Array })
        public ticks: Ticks = null;
    };

    return SliderClass;
}