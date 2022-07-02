import { css, html, LitElement, PropertyValueMap } from 'lit';
import { property } from 'lit/decorators.js';

type Position = {
    x: number,
    y: number
}

type Rect = {
    x: number,
    y: number,
    w: number,
    h: number,
    cx: number,
    cy: number
}

type RadialRect = {
    x: number,
    y: number,
    w: number,
    h: number,
    cx: number,
    cy: number,
    r: number,
    ir: number,
    or: number
}

export class RadialSlider extends LitElement {
    private _track: HTMLElement = null;
    private _thumb: HTMLElement = null;
    private _trackRect: RadialRect = { x: 0, y: 0, w: 0, h: 0, cx: 0, cy: 0, r: 0, ir: 0, or: 0 };
    private _thumbRect: Rect = { x: 0, y: 0, w: 0, h: 0, cx: 0, cy: 0 };
    private _dragging: boolean = false;

    private _boundHandleMouseDown = this._handleMouseDown.bind(this);
    private _boundHandleMouseMove = this._handleMouseMove.bind(this);
    private _boundHandleMouseUp = this._handleMouseUp.bind(this);

    private _resizeObserver = new ResizeObserver(() => {
        const trackRect = this._track.getBoundingClientRect();
        const thumbRect = this._thumb.getBoundingClientRect();
        const hh = trackRect.height / 2;
        const hw = trackRect.width / 2;
        const htw = this.trackWidth / 2;
        const r = Math.sqrt((hh * hh) + (hw * hw));

        this._trackRect = { x: trackRect.x, y: trackRect.y, w: trackRect.width, h: trackRect.height, cx: trackRect.x + hw, cy: trackRect.y + hh, r: r, ir: r - htw, or: r + htw };
        this._thumbRect = { x: thumbRect.x, y: thumbRect.y, w: thumbRect.width, h: thumbRect.height, cx: thumbRect.x + (thumbRect.width / 2), cy: thumbRect.y + (thumbRect.height / 2) };

        console.log(this._trackRect);
        console.log(this._thumbRect);
    });

    static styles = css`
        :host {
            display: inline-block;
            position: relative;
            width: 200px;
            height: 200px;
            user-select: none;
        }

        #track {
            width: 100%;
            height: 100%;
            padding: 20px;
            box-sizing: border-box;
            background-color: cornflowerblue
        }

        #visual-track {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border-radius: 50%;
            border: 1px solid white;
            pointer-events: none;
        }

        #thumb {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: yellow;
            pointer-events: none;
        }
    `;

    @property({ type: Number })
    public min: number = 0;

    @property({ type: Number })
    public max: number = 100;

    @property({ type: Number })
    public value: number = 50;

    @property({ type: Number, attribute: 'track-width' })
    public trackWidth: number = 20;

    protected firstUpdated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.updated(changedProperties);
        this._track = this.shadowRoot.getElementById('track');
        this._thumb = this.shadowRoot.getElementById('thumb');
        this._connectEvents();
    }

    public connectedCallback(): void {
        super.connectedCallback();  
    }

    public disconnectedCallback(): void {
        this._disconnectEvents();
        super.disconnectedCallback();  
    }

    protected render() {
        return html`
            <div id="track"><div id="visual-track" style="border-width: ${this.trackWidth}px;"></div></div>
            <div id="thumb"></div>
        `;
    }

    private _connectEvents(): void {
        this._resizeObserver.observe(this._track);
        this._resizeObserver.observe(this._thumb);

        this._track.addEventListener('mousedown', this._boundHandleMouseDown);
        this._track.addEventListener('mousemove', this._boundHandleMouseMove);
        this._track.addEventListener('mouseup', this._boundHandleMouseUp);
    }

    private _disconnectEvents(): void {
        this._track.removeEventListener('mousedown', this._boundHandleMouseDown);
        this._track.removeEventListener('mousemove', this._boundHandleMouseMove);
        this._track.removeEventListener('mouseup', this._boundHandleMouseUp);

        this._resizeObserver.unobserve(this._track);
        this._resizeObserver.unobserve(this._thumb);
    }

    private _handleMouseDown(e): void {
        this._dragging = true;
        console.log('down');
    }

    private _handleMouseMove(e): void {
        if (this._dragging) {
            console.log('move');
        }
    }

    private _handleMouseUp(e): void {
        this._dragging = false;
        console.log('up');
    }

    private _positionToValue(position: Position): number {
        return 0;
    }

    private _valueToPosition(value: number): Position {
        return null;
    }

    private _positionThumb() {

    }
}

window.customElements.define('radial-slider', RadialSlider)