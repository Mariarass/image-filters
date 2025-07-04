type PredefinedFilter = {
    brightness?: number;
    contrast?: number;
    saturate?: number;
    hueRotate?: number;
    sepia?: number;
    shadows?: number;
    grain?: number;
    vignette?: number;
    colorMatrix?: Float32Array;
    highlights?: number;
    black?: number;
    white?: number;
};

export const predefinedFilters: Record<string, PredefinedFilter> = {

    grayscale: { saturate: 0 },
    tokyo:{
        brightness: 3,       
        contrast: -18,         
        hueRotate: 355,        
        saturate: 17,         
        shadows: 2,          
        grain:30,
        vignette:10,
        colorMatrix: new Float32Array([
       
            1.30,    0,      0,      0,    
            0,      0.92,    0,      0,    
            0,      0,      0.97,    0,   
            0,      0,      0,      1,    
          ]),
    },
    malibu:{
        brightness: -2,       
        contrast: -1,         
        hueRotate: 1,        
        saturate: -33,         
        shadows: 79,          
        grain:10,
        vignette:10,
        colorMatrix: new Float32Array([
       
            1.25,    0,      0,      0,    
            0,      0.96,    0,      0,    
            0,      0,      1,    0,   
            0,      0,      0,      1,    
          ]),
    },
    miami:{
        brightness: 0.91,
        contrast: 1.00,
        hueRotate: 339,
        saturate: 0.82,
        shadows: 1.09,
        grain: 0.01,
        vignette: 0.00,
        colorMatrix: new Float32Array([
          1.70, 0,           0,           0,
          0,           0.90, 0,           0,
          0,           0,           1.10, 0,
          0,           0,           0,           1,
        ]),
    },
    sahara:{
        colorMatrix: new Float32Array([
            1.2, 0.1, 0.2, 0,
            0.2, 0.8, 0.2, 0,
            0.1, 0.2, 0.9, 0,
            0,   0,   0,   1,
        ]),
    },
    rio:{
        brightness: 1.00,
        contrast: 0.89,
        hueRotate: 338,
        saturate: 1.20,
        shadows: 1.00,
        grain: 0.10,
        vignette: 0.00,
        colorMatrix: new Float32Array([
          1.40, 0,           0,           0,
          0,           1.20, 0,           0,
          0,           0,           1.00, 0,
          0,           0,           0,           1,
        ]),
      },
    phoenix: { saturate: 1.2, brightness: 1.1, hueRotate: -20 },
    jerusalem:{
        brightness: 6,       
        contrast: 2,         
        hueRotate: 1,        
        saturate: 1.01,         
        shadows: 1.86,          
        grain:0.2,
        vignette:0.5,
        colorMatrix: new Float32Array([
       
            1.25,    0,      0,      0,    
            0,      0.96,    0,      0,    
            0,      0,      1,    0,   
            0,      0,      0,      1,    
          ]),
    },
    havana:{
        brightness: 0,       
        contrast:0,         
        hueRotate: 360,        
        saturate: -33,         
        shadows: 79,          
        grain:10,
        vignette:10,
        colorMatrix: new Float32Array([
       
            1.25,    0,      0,      0,    
            0,      0.96,    0,      0,    
            0,      0,      1,    0,   
            0,      0,      0,      1,    
          ]),
    },
    arctic: {
        colorMatrix: new Float32Array([
            0.5, 0,   0,   0,
            0,   0.7, 0,   0,
            0,   0,   1.2, 0,
            0,   0,   0,   1,
        ]),
    },
    silberian: {
        brightness: 0,
        contrast: -3,
        hueRotate: 0,
        saturate: -22,
        shadows: -33,
        grain: 0,
        vignette: 0,
        colorMatrix: new Float32Array([
          0.80, 0,           0,           0,
          0,           0.80, 0,           0,
          0,           0,           1.60, 0,
          0,           0,           0,           1,
        ]),
      },
      oslo: {
        brightness: 8,
        contrast: -3,
        hueRotate: 2,
        saturate: -22,
        shadows: 84,
        grain: 4,
        vignette: 10,
        colorMatrix: new Float32Array([
          0.70, 0,           0,           0,
          0,           0.90, 0,           0,
          0,           0,           2.00, 0,
          0,           0,           0,           1,
        ]),
      },
      icelandic: {
        brightness: 11,
        contrast: 4,
        hueRotate: 2,
        saturate: -65,
        shadows: 64,
        grain: 5,
        vignette: 10,
        colorMatrix: new Float32Array([
          0.70, 0,           0,           0,
          0,           0.70, 0,           0,
          0,           0,           1.70, 0,
          0,           0,           0,           1,
        ]),
      },
      glacier: {
        brightness: -6,
        contrast: 14,
        hueRotate: 331,
        saturate: -54,
        shadows: 100,
        grain: 5,
        vignette: 10,
        colorMatrix: new Float32Array([
          0.80, 0,           0,           0,
          0,           0.90, 0,           0,
          0,           0,           2.10, 0,
          0,           0,           0,           1,
        ]),
      },
    aurora:{
        brightness: -10,       
        contrast: -16,         
        hueRotate: 1,        
        saturate: 14,         
        shadows: -20,          
        grain:10,
        vignette:50,
        colorMatrix: new Float32Array([
       
            0.83,    0,      0,      0,    
            0,      0.95,    0,      0,    
            0,      0,      1.88,    0,   
            0,      0,      0,      1,    
          ]),
    },

    alpine: {
        brightness: -6,
        contrast: 8,
        hueRotate: 319,
        saturate: -44,
        shadows: 57,
        grain: 0,
        vignette: 10,
        colorMatrix: new Float32Array([
          0.80, 0,           0,           0,
          0,           0.70, 0,           0,
          0,           0,           1.90, 0,
          0,           0,           0,           1,
        ]),
      },

      antarctic: {
        brightness: -20,
        contrast: 11,
        hueRotate: 331,
        saturate: -37,
        shadows: 57,
        grain: 0,
        vignette: 0,
        colorMatrix: new Float32Array([
          0.90, 0,           0,           0,
          0,           1.10, 0,           0,
          0,           0,           2.40, 0,
          0,           0,           0,           1,
        ]),
      },
    brightness: { brightness: 50 },

    contrast: { contrast: 100 },

    saturate: { saturate: 100 },

    hue: { hueRotate: 90 },

    vintage: { sepia: 50, contrast: 20, brightness: -10 },

    cool: { hueRotate: 270, saturate: 50 },

    fancyEffect: {
        brightness: 20,
        contrast: 10,
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

    grove: {
        brightness: -1,
        contrast: 3,
        saturate: -9,
        hueRotate: 334,
        colorMatrix: new Float32Array([
            0.6, 0,   0,   0,
            0,   0.8, 0,   0,
            0,   0,   0.8, 0,
            0,   0,   0,   1,
        ]),
    },
    amazon: {
        brightness: 0,
        contrast: 0,
        hueRotate: 84,
        saturate: -20,
        shadows: -37,
        grain: 9,
        vignette: 0,
        colorMatrix: new Float32Array([
          0.90, 0,           0,           0,
          0,           0.70, 0,           0,
          0,           0,           1.00, 0,
          0,           0,           0,           1,
        ]),
      },
      hallow: {
        brightness: 31,
        contrast: -24,
        hueRotate: 28,
        saturate: -17,
        shadows: -27,
        grain: 6,
        vignette: 0,
        colorMatrix: new Float32Array([
          1.00, 0,           0,           0,
          0,           1.00, 0,           0,
          0,           0,           0.90, 0,
          0,           0,           0,           1,
        ]),
      },
      cedar: {
        brightness: 31,
        contrast: -23,
        hueRotate: 84,
        saturate: -20,
        shadows: -27,
        grain: 6,
        vignette: 0,
        colorMatrix: new Float32Array([
          0.90, 0,           0,           0,
          0,           0.30, 0,           0,
          0,           0,           1.00, 0,
          0,           0,           0,           1,
        ]),
      },
      safari: {
        brightness: 0,
        contrast: 0,
        hueRotate: 321,
        saturate: 0,
        shadows: 0,
        grain: 0,
        vignette: 0,
        colorMatrix: new Float32Array([
          1.10, 0,           0,           0,
          0,           1.20, 0,           0,
          0,           0,           0.40, 0,
          0,           0,           0,           1,
        ]),
      },
      shade: {
        brightness: 18,
        contrast: -7,
        hueRotate: 327,
        saturate: -13,
        shadows: -43,
        grain: 6,
        vignette: 0,
        colorMatrix: new Float32Array([
          1.20, 0,           0,           0,
          0,           1.10, 0,           0,
          0,           0,           0.40, 0,
          0,           0,           0,           1,
        ]),
      },
      desert: {
        brightness: 18,
        contrast: -20,
        hueRotate: 323,
        saturate: -15,
        shadows: -37,
        grain: 6,
        vignette: 0,
        colorMatrix: new Float32Array([
          1.20, 0,           0,           0,
          0,           1.30, 0,           0,
          0,           0,           0.30, 0,
          0,           0,           0,           1,
        ]),
      },



    mutedSepia: { brightness: -10, contrast: 5 },

    moody: { brightness: -20, contrast: -10, saturate: -50 },

    goldenHour: { brightness: 20, contrast: 10, hueRotate: 25 },

    oceanBreeze: { saturate: 40, hueRotate: -50, brightness: 10 },

    cinematic: { contrast: 20, brightness: -10, sepia: 10 },

    noir: { saturate: -100, contrast: 20, brightness: -20 },

    rainforest: { brightness: 15, contrast: 5, hueRotate: 15 },

    nightVibes: { brightness: -30, contrast: 30, saturate: -10, hueRotate: -10 },

    vintageFilm: { contrast: -10, brightness: -15, saturate: -20 },
    static: { contrast: -15, saturate: -100 },
    frequency: { contrast: -15, saturate: -100,shadows: -52,grain: 9 },
    broadcast: { contrast: -21, saturate: -100,shadows: -60,grain: 9 },
    retro: { contrast: -27, saturate: -100 ,brightness: 34},
    transistor: { contrast: 17, saturate: -100 ,brightness: -13,grain: 21},
    jazz: { contrast:-64, saturate: -100 ,brightness: 29,grain: 0},
    classic: {  saturate: -100 ,brightness: 24,grain: 21},
    naight8: { saturate: -100},

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
