type PredefinedFilter = {
    brightness?: number;
    contrast?: number;
    saturate?: number;
    hueRotate?: number;
    sepia?: number;
    colorMatrix?: Float32Array;
};

export const predefinedFilters: Record<string, PredefinedFilter> = {

    grayscale: { saturate: 0 },

    brightness: { brightness: 1.5 },

    contrast: { contrast: 2.0 },

    saturate: { saturate: 2.0 },

    hue: { hueRotate: 90 },

    vintage: { sepia: 0.5, contrast: 1.2, brightness: 0.9 },

    cool: { hueRotate: 270, saturate: 1.5 },

    fancyEffect: {
        brightness: 1.2,
        contrast: 1.1,
        colorMatrix: new Float32Array([
            1.2, 0,   0,   0,
            0,   1.0, 0.5, 0,
            0,   0,   1.5, 0,
            0,   0,   0,   1,
        ]),
    },

    deep: {
        colorMatrix: new Float32Array([
            1.5, 0,   0,   0,
            0,   1.2, 0,   0,
            0,   0,   2.0, 0,
            0,   0,   0,   1,
        ]),
    },

    cozySnow: {
        brightness: 0.99,
        contrast: 1.03,
        saturate: 0.91,
        hueRotate: 334,
        colorMatrix: new Float32Array([
            0.6, 0,   0,   0,
            0,   0.8, 0,   0,
            0,   0,   0.8, 0,
            0,   0,   0,   1,
        ]),
    },

    retro: { saturate: 1.5, contrast: 0.85 },

    pastel: { saturate: 1.2, brightness: 1.1, hueRotate: -20 },

    mutedSepia: { brightness: 0.9, contrast: 1.05 },

    moody: { brightness: 0.8, contrast: 0.9, saturate: 0.5 },

    goldenHour: { brightness: 1.2, contrast: 1.1, hueRotate: 25 },

    oceanBreeze: { saturate: 1.4, hueRotate: -50, brightness: 1.1 },

    cinematic: { contrast: 1.2, brightness: 0.9, sepia: 0.1 },

    noir: { saturate: 0, contrast: 1.2, brightness: 0.8 },

    sunKissed: { brightness: 1.15, contrast: 1.05, hueRotate: 15 },

    nightVibes: { brightness: 0.7, contrast: 1.3, saturate: 0.9, hueRotate: -10 },

    vintageFilm: { contrast: 0.9, brightness: 0.85, saturate: 0.8 },

    deepBlue: {
        colorMatrix: new Float32Array([
            0.5, 0,   0,   0,
            0,   0.7, 0,   0,
            0,   0,   1.2, 0,
            0,   0,   0,   1,
        ]),
    },

    goldenTint: {
        colorMatrix: new Float32Array([
            1.0, 0.2, 0,   0,
            0.1, 0.9, 0,   0,
            0,   0.2, 0.8, 0,
            0,   0,   0,   1,
        ]),
    },

    lavenderHaze: {
        colorMatrix: new Float32Array([
            0.7, 0.1, 0.3, 0,
            0.2, 0.6, 0.3, 0,
            0.2, 0.1, 0.7, 0,
            0,   0,   0,   1,
        ]),
    },

    emeraldGlow: {
        colorMatrix: new Float32Array([
            0.6, 0,   0,   0,
            0,   1.1, 0,   0,
            0,   0,   0.7, 0,
            0,   0,   0,   1,
        ]),
    },

    roseTint: {
        colorMatrix: new Float32Array([
            1.2, 0.1, 0.2, 0,
            0.2, 0.8, 0.2, 0,
            0.1, 0.2, 0.9, 0,
            0,   0,   0,   1,
        ]),
    },

    arcticInversion: {
        colorMatrix: new Float32Array([
            1,   0,   0,    0,
            0,   0.8, 0,    0,
            0,   0,  -1.8,  0,
            0,   0,   0,    1,
        ]),
    },

    crimsonGlow: {
        colorMatrix: new Float32Array([
            1.3, 0,   0, 0,
            0,   0.8, 0, 0,
            0,   0,   1, 0,
            0,   0,   0, 1,
        ]),
    },

    rusticSunset: {
        brightness: 0.94,
        contrast: 0.93,
        saturate: 0.8,
        hueRotate: 1,
        colorMatrix: new Float32Array([
            1.2, 0,   0,   0,
            0,   0.7, 0,   0,
            0,   0,   0.6, 0,
            0,   0,   0,   1,
        ]),
    },

    sunsetDream: {
        colorMatrix: new Float32Array([
            1.2, 0.1, 0.0, 0,
            0.0, 1.1, 0.0, 0,
            0.0, 0.0, 0.7, 0,
            0,   0,   0,   1,
        ]),
    },

    blueLagoon: {
        colorMatrix: new Float32Array([
            0.8, 0,   0.1, 0,
            0,   0.9, 0,   0,
            0,   0,   1.5, 0,
            0,   0,   0,   1,
        ]),
    },

    amberGlow: {
        colorMatrix: new Float32Array([
            1.2, 0,   0,   0,
            0,   1.1, 0,   0,
            0,   0,   0.6, 0,
            0,   0,   0,   1,
        ]),
    },
};
