export type Vector2 = { x: number, y: number };
export type DoubleNumber = { start: number, end: number };
export type DoublePosition = { start: Vector2, end: Vector2 };
export type Movement = 'any' | 'horizontal' | 'vertical' | 'radial';

/* SLIDER VALUE */
export type SliderValue = null | number | Array<number> | Vector2 | Array<Vector2> | DoubleNumber| DoublePosition;

export enum SliderValueKind {
    Invalid,
    Number,
    Position,
    ArrayOfNumber,
    ArrayOfPosition,
    DoubleNumber,
    DoublePosition
}

export function getSliderValueKind(value: SliderValue): SliderValueKind {
    if ((value === undefined) || (value === null)) return SliderValueKind.Invalid;
    if (typeof value === 'number') return SliderValueKind.Number;
    if ((value['x'] !== undefined) && (value['y'] !== undefined) && (typeof value['x'] === 'number') && (typeof value['y'] === 'number')) return SliderValueKind.Position;
    //if (Array.isArray(value) && value.length > 0) return getSliderValueKind(value[0]);
    if (Array.isArray(value) && value.length > 0) {
        const kind = getSliderValueKind(value[0]);

        if (kind === SliderValueKind.Number) return SliderValueKind.ArrayOfNumber;
        if (kind === SliderValueKind.Position) return SliderValueKind.ArrayOfPosition;
    }

    if ((value['start'] !==  undefined) && (value['end'] !==  undefined)) {
        const startKind = getSliderValueKind(value['start']);
        const endKind = getSliderValueKind(value['end']);
        
        if ((startKind === SliderValueKind.Number) && (endKind === SliderValueKind.Number)) return SliderValueKind.DoubleNumber;
        if ((startKind === SliderValueKind.Position) && (endKind === SliderValueKind.Position)) return SliderValueKind.DoublePosition;
    }

    return SliderValueKind.Invalid;
}

export function ArrayToSliderValue(arr: Array<Vector2>, kind: SliderValueKind): SliderValue {
    let result: SliderValue = null;

    if (!arr && arr.length === 0) return null;

    switch (kind) {
        case SliderValueKind.Number: {
            return arr[0].x;
        }

        case SliderValueKind.Position: {
            return { x: arr[0].x, y: arr[0].y };
        }

        case SliderValueKind.ArrayOfNumber: {
            return arr.map(i => i.x);
        }

        case SliderValueKind.ArrayOfPosition: {
            return arr.map(i => {
                return {
                    x: i.x,
                    y: i.y
                }
            });
        }

        case SliderValueKind.DoubleNumber: {
            if (arr.length == 2) {
                return {
                    start: arr[0].x,
                    end: arr[1].x
                }
            }
            
            return null;
        }

        case SliderValueKind.DoublePosition: {
            if (arr.length == 2) {
                return {
                    start: { x: arr[0].x, y: arr[0].y },
                    end: { x: arr[1].x, y: arr[1].y }
                }
            }
            
            return null;
        }
    }

    return result;
}

export function sliderValueToArray(value: SliderValue, kind?: SliderValueKind): Array<Vector2> {
    const valueKind = kind || getSliderValueKind(value);
    const result = [];

    switch (valueKind) {
        case SliderValueKind.Number: {
            result.push({ x: value, y: value });
            break;
        }

        case SliderValueKind.Position: {
            result.push({ x: (value as Vector2).x, y: (value as Vector2).y });
            break;
        }

        case SliderValueKind.ArrayOfNumber: {
            (value as Array<number>).forEach(v => {result.push(v)});
            break;
        }

        case SliderValueKind.ArrayOfPosition: {
            (value as Array<Vector2>).forEach(v => {result.push({ x: v.x, y: v.y })});
            break;
        }

        case SliderValueKind.DoubleNumber: {
            result.push({ x: (value as DoubleNumber).start, y: (value as DoubleNumber).start });
            result.push({ x: (value as DoubleNumber).end, y: (value as DoubleNumber).end });
            break;
        }

        case SliderValueKind.DoublePosition: {
            result.push({ x: (value as DoublePosition).start.x, y: (value as DoublePosition).start.y });
            result.push({ x: (value as DoublePosition).end.x, y: (value as DoublePosition).end.y });
            break;
        }
    }

    return result;
}

/* SLIDER LIMIT */
export type SliderLimit = null | number | Vector2;

export enum SliderLimitKind {
    Invalid,
    Number,
    Position
}

export function getSliderLimitKind(value: SliderLimit): SliderLimitKind {
    if ((value === undefined) || (value === null)) return SliderLimitKind.Invalid;
    if (typeof value === 'number') return SliderLimitKind.Number;
    if ((value['x'] !== undefined) && (value['y'] !== undefined) && (typeof value['x'] === 'number') && (typeof value['y'] === 'number')) return SliderLimitKind.Position;

    return SliderLimitKind.Invalid;
}

export function sliderLimitToPosition(value: SliderLimit): Vector2 {
    const kind = getSliderLimitKind(value);

    switch (kind) {
        case SliderLimitKind.Number: {
            return { x: (value as number), y: (value as number) };
        }

        case SliderLimitKind.Position: {
            return { x: (value as Vector2).x, y: (value as Vector2).y };
        }
    }

    return null;
}

/* SLIDER STEP */
export type SliderStep = null | number | 'any' | { x: number | 'any', y: number | 'any' };

export enum SliderStepKind {
    Invalid,
    Number,
    Any,
    Position
}

export function getSliderStepKind(value: SliderStep): SliderStepKind {
    if ((value === undefined) || (value === null)) return SliderStepKind.Invalid;
    if (typeof value === 'number') return SliderStepKind.Number;
    if (value === 'any') return SliderStepKind.Any;
    if ((value['x'] !== undefined) && (value['y'] !== undefined) && ((typeof value['x'] === 'number') || (value['x'] === 'any')) && ((typeof value['y'] === 'number') || (value['y'] === 'any'))) return SliderStepKind.Position;

    return SliderStepKind.Invalid;
}

export type SliderValueMap = null | string | { x: string, y: string };

/* SLIDER PAD */
export type SliderPad = number | Vector2;

export enum SliderPadKind {
    Invalid,
    Number,
    Position
}

export function getSliderPadKind(value: SliderPad): SliderPadKind {
    if ((value === undefined) || (value === null)) return SliderPadKind.Invalid;
    if (typeof value === 'number') return SliderPadKind.Number;
    if ((value['x'] !== undefined) && (value['y'] !== undefined) && (typeof value['x'] === 'number') && (typeof value['y'] === 'number')) return SliderPadKind.Position;

    return SliderPadKind.Invalid;
}

export function sliderPadToPosition(value: SliderPad): Vector2 {
    const kind = getSliderPadKind(value);

    switch (kind) {
        case SliderPadKind.Number: {
            return { x: (value as number), y: (value as number) };
        }

        case SliderPadKind.Position: {
            return { x: (value as Vector2).x, y: (value as Vector2).y };
        }
    }

    return { x: 0, y: 0 };
}

/* UTILITY FUNCTIONS */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
};

export function clampValues(values: Array<Vector2>, min: Vector2, max: Vector2) {
    values.forEach(v => {
        v.x = clamp(v.x, min.x, max.x);
        v.y = clamp(v.y, min.y, max.y);
    });
}

