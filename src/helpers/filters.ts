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
};

export const predefinedFilters: Record<string, PredefinedFilter> = {

    grayscale: { saturate: 0 },
    tokyo:{
        brightness: 1.03,       
        contrast: 0.82,         
        hueRotate: 355,        
        saturate: 1.17,         
        shadows: 1.02,          
        grain:0.3,
        vignette:0.5,
        colorMatrix: new Float32Array([
       
            1.30,    0,      0,      0,    
            0,      0.92,    0,      0,    
            0,      0,      0.97,    0,   
            0,      0,      0,      1,    
          ]),
    },
    malibu:{
        brightness: 0.98,       
        contrast: 0.99,         
        hueRotate: 1,        
        saturate: 0.67,         
        shadows: 1.79,          
        grain:0.1,
        vignette:0.5,
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
        brightness: 1.06,       
        contrast: 1.02,         
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
        brightness: 1,       
        contrast:1,         
        hueRotate: 360,        
        saturate: 0.67,         
        shadows: 1.79,          
        grain:0.1,
        vignette:0.5,
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
        brightness: 1.00,
        contrast: 0.97,
        hueRotate: 0,
        saturate: 0.78,
        shadows: 0.67,
        grain: 0.00,
        vignette: 0.00,
        colorMatrix: new Float32Array([
          0.80, 0,           0,           0,
          0,           0.80, 0,           0,
          0,           0,           1.60, 0,
          0,           0,           0,           1,
        ]),
      },
      oslo: {
        brightness: 1.08,
        contrast: 0.97,
        hueRotate: 2,
        saturate: 0.78,
        shadows: 1.84,
        grain: 0.04,
        vignette: 0.10,
        colorMatrix: new Float32Array([
          0.70, 0,           0,           0,
          0,           0.90, 0,           0,
          0,           0,           2.00, 0,
          0,           0,           0,           1,
        ]),
      },
      icelandic: {
        brightness: 1.11,
        contrast: 1.04,
        hueRotate: 2,
        saturate: 0.35,
        shadows: 1.64,
        grain: 0.05,
        vignette: 0.10,
        colorMatrix: new Float32Array([
          0.70, 0,           0,           0,
          0,           0.70, 0,           0,
          0,           0,           1.70, 0,
          0,           0,           0,           1,
        ]),
      },
      glacier: {
        brightness: 0.94,
        contrast: 1.14,
        hueRotate: 331,
        saturate: 0.46,
        shadows: 2.00,
        grain: 0.05,
        vignette: 0.10,
        colorMatrix: new Float32Array([
          0.80, 0,           0,           0,
          0,           0.90, 0,           0,
          0,           0,           2.10, 0,
          0,           0,           0,           1,
        ]),
      },
    aurora:{
        brightness: 0.90,       
        contrast: 0.84,         
        hueRotate: 1,        
        saturate: 1.14,         
        shadows: 0.80,          
        grain:0.1,
        vignette:0.5,
        colorMatrix: new Float32Array([
       
            0.83,    0,      0,      0,    
            0,      0.95,    0,      0,    
            0,      0,      1.88,    0,   
            0,      0,      0,      1,    
          ]),
    },

    alpine: {
        brightness: 0.94,
        contrast: 1.08,
        hueRotate: 319,
        saturate: 0.56,
        shadows: 1.57,
        grain: 0.00,
        vignette: 0.10,
        colorMatrix: new Float32Array([
          0.80, 0,           0,           0,
          0,           0.70, 0,           0,
          0,           0,           1.90, 0,
          0,           0,           0,           1,
        ]),
      },

      antarctic: {
        brightness: 0.80,
        contrast: 1.11,
        hueRotate: 331,
        saturate: 0.63,
        shadows: 1.57,
        grain: 0.00,
        vignette: 0.00,
        colorMatrix: new Float32Array([
          0.90, 0,           0,           0,
          0,           1.10, 0,           0,
          0,           0,           2.40, 0,
          0,           0,           0,           1,
        ]),
      },
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

    grove: {
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
    amazon: {
        brightness: 1.00,
        contrast: 1.00,
        hueRotate: 84,
        saturate: 0.80,
        shadows: 0.63,
        grain: 0.09,
        vignette: 0.00,
        colorMatrix: new Float32Array([
          0.90, 0,           0,           0,
          0,           0.70, 0,           0,
          0,           0,           1.00, 0,
          0,           0,           0,           1,
        ]),
      },
      hallow: {
        brightness: 1.31,
        contrast: 0.76,
        hueRotate: 28,
        saturate: 0.83,
        shadows: 0.73,
        grain: 0.06,
        vignette: 0.00,
        colorMatrix: new Float32Array([
          1.00, 0,           0,           0,
          0,           1.00, 0,           0,
          0,           0,           0.90, 0,
          0,           0,           0,           1,
        ]),
      },
      cedar: {
        brightness: 1.31,
        contrast: 0.77,
        hueRotate: 84,
        saturate: 0.80,
        shadows: 0.73,
        grain: 0.06,
        vignette: 0.00,
        colorMatrix: new Float32Array([
          0.90, 0,           0,           0,
          0,           0.30, 0,           0,
          0,           0,           1.00, 0,
          0,           0,           0,           1,
        ]),
      },
      safari: {
        brightness: 1.00,
        contrast: 1.00,
        hueRotate: 321,
        saturate: 1.00,
        shadows: 1.00,
        grain: 0.00,
        vignette: 0.00,
        colorMatrix: new Float32Array([
          1.10, 0,           0,           0,
          0,           1.20, 0,           0,
          0,           0,           0.40, 0,
          0,           0,           0,           1,
        ]),
      },
      shade: {
        brightness: 1.18,
        contrast: 0.93,
        hueRotate: 327,
        saturate: 0.87,
        shadows: 0.57,
        grain: 0.06,
        vignette: 0.00,
        colorMatrix: new Float32Array([
          1.20, 0,           0,           0,
          0,           1.10, 0,           0,
          0,           0,           0.40, 0,
          0,           0,           0,           1,
        ]),
      },
      desert: {
        brightness: 1.18,
        contrast: 0.80,
        hueRotate: 323,
        saturate: 0.85,
        shadows: 0.63,
        grain: 0.06,
        vignette: 0.00,
        colorMatrix: new Float32Array([
          1.20, 0,           0,           0,
          0,           1.30, 0,           0,
          0,           0,           0.30, 0,
          0,           0,           0,           1,
        ]),
      },

    retro: { saturate: 1.5, contrast: 0.85 },

   

    mutedSepia: { brightness: 0.9, contrast: 1.05 },

    moody: { brightness: 0.8, contrast: 0.9, saturate: 0.5 },

    goldenHour: { brightness: 1.2, contrast: 1.1, hueRotate: 25 },

    oceanBreeze: { saturate: 1.4, hueRotate: -50, brightness: 1.1 },

    cinematic: { contrast: 1.2, brightness: 0.9, sepia: 0.1 },

    noir: { saturate: 0, contrast: 1.2, brightness: 0.8 },

    rainforest: { brightness: 1.15, contrast: 1.05, hueRotate: 15 },

    nightVibes: { brightness: 0.7, contrast: 1.3, saturate: 0.9, hueRotate: -10 },

    vintageFilm: { contrast: 0.9, brightness: 0.85, saturate: 0.8 },



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
