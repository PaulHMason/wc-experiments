import { LitElement } from "lit";
import { property } from 'lit/decorators.js';

export abstract class BaseSlider extends LitElement {
    @property({ type: Object })
    public value: null | number | object;

    @property({ type: Object })
    public min: null | number | { x: number, y: number } = null;

    @property({ type: Object })
    public max: null | number | { x: number, y: number } = null;

    @property({ type: Object })
    public step: null | number | 'any' | { x: number | 'any', y: number | 'any' } = null;

    @property({ type: Object })
    public valueMap: null | string | { x: string, y: string }
}