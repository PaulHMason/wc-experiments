export type Position2D = { x: number, y: number };
export type DoubleNumber = { start: number, end: number };
export type DoublePosition = { start: Position2D, end: Position2D };

/* SLIDER VALUE */
export type SliderValue = null | number | Array<number> | Position2D | Array<Position2D> | DoubleNumber| DoublePosition;

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

export function sliderValueToArray(value: SliderValue): Array<Position2D> {
    const kind = getSliderValueKind(value);
    const result = [];

    switch (kind) {
        case SliderValueKind.Number: {
            result.push({ x: value, y: value });
            break;
        }

        case SliderValueKind.Position: {
            result.push({ x: (value as Position2D).x, y: (value as Position2D).y });
            break;
        }

        case SliderValueKind.ArrayOfNumber: {
            (value as Array<number>).forEach(v => {result.push(v)});
            break;
        }

        case SliderValueKind.ArrayOfPosition: {
            (value as Array<Position2D>).forEach(v => {result.push({ x: v.x, y: v.y })});
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
export type SliderLimit = null | number | Position2D;

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

export function sliderLimitToPosition(value: SliderLimit): Position2D {
    const kind = getSliderLimitKind(value);

    switch (kind) {
        case SliderLimitKind.Number: {
            return { x: (value as number), y: (value as number) };
        }

        case SliderLimitKind.Position: {
            return { x: (value as Position2D).x, y: (value as Position2D).y };
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
export type SliderPad = number | Position2D;

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

export function sliderPadToPosition(value: SliderPad): Position2D {
    const kind = getSliderPadKind(value);

    switch (kind) {
        case SliderPadKind.Number: {
            return { x: (value as number), y: (value as number) };
        }

        case SliderPadKind.Position: {
            return { x: (value as Position2D).x, y: (value as Position2D).y };
        }
    }

    return { x: 0, y: 0 };
}