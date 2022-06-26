import { Constructor } from '../utils/MixinConstructor.js';
import { LitElement } from 'lit';

export declare class SliderMixinInterface {

}

export const SliderMixin = <T extends Constructor<LitElement>>(superClass: T) => {
    class SliderClass extends superClass {

    };

    return SliderClass as Constructor<SliderMixinInterface> & T;
}