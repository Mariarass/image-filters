import React  from 'react';
import { v4 as uuidv4 } from 'uuid';

export type FilterProps = {
    imageUrl: string;
    filter?: string;
    redChannel?: number;
    greenChannel?: number;
    blueChannel?: number;
    brightness?: number;
    contrast?: number;
    saturation?: number;
    hueRotate?: number;
    styles?: React.CSSProperties;
};

type PredefinedFilter = {
    cssFilter?: string;
    colorMatrix?: string;
};

const predefinedFilters: Record<string, PredefinedFilter> = {
    grayscale: { cssFilter: 'grayscale(100%)' },
    sepia: { cssFilter: 'sepia(100%)' },
    brightness: { cssFilter: 'brightness(150%)' },
    contrast: { cssFilter: 'contrast(200%)' },
    saturate: { cssFilter: 'saturate(200%)' },
    hue: { cssFilter: 'hue-rotate(90deg)' },
    vintage: { cssFilter: 'sepia(50%) contrast(120%) brightness(90%)' },
    cool: { cssFilter: 'hue-rotate(270deg) saturate(150%)' },
    fancyEffect: {
        cssFilter: 'brightness(120%) contrast(110%)',
        colorMatrix: `
            1.2 0   0   0 0
            0   1.0 0.5 0 0
            0   0   1.5 0 0
            0   0   0   1 0
        `,
    },
    deep: {
        cssFilter: 'none',
        colorMatrix: `
            1.5 0   0   0 0
            0   1.2 0   0 0
            0   0   2.0 0 0
            0   0   0   1 0
        `,
    },
    cozySnow: {
        cssFilter: 'brightness(99%) contrast(103%) saturate(91%) hue-rotate(334deg)',
        colorMatrix: `
            0.6 0   0   0 0
            0   0.8 0   0 0
            0   0   0.8 0 0
            0   0   0   1 0
        `,
    },
    retro: { cssFilter: 'saturate(150%) contrast(85%)' },
    pastel: { cssFilter: 'saturate(120%) brightness(110%) hue-rotate(-20deg)' },
    mutedSepia: { cssFilter: 'sepia(40%) brightness(0.9) contrast(1.05)' },
    moody: { cssFilter: 'brightness(0.8) contrast(0.9) saturate(50%)' },
    goldenHour: { cssFilter: 'sepia(20%) brightness(120%) contrast(110%) hue-rotate(25deg)' },
    oceanBreeze: { cssFilter: 'saturate(140%) hue-rotate(-50deg) brightness(110%)' },
    cinematic: { cssFilter: 'contrast(120%) brightness(90%) sepia(10%)' },
    noir: { cssFilter: 'grayscale(100%) contrast(120%) brightness(80%)' },
    sunKissed: { cssFilter: 'brightness(115%) contrast(105%) hue-rotate(15deg)' },
    nightVibes: { cssFilter: 'brightness(70%) contrast(130%) saturate(90%) hue-rotate(-10deg)' },
    vintageFilm: { cssFilter: 'sepia(60%) contrast(90%) brightness(85%) saturate(80%)' },
    deepBlue: {
        colorMatrix: `
            0.5 0   0   0 0
            0   0.7 0   0 0
            0   0   1.2 0 0
            0   0   0   1 0
        `,
    },
    goldenTint: {
        colorMatrix: `
            1.0 0.2 0   0 0
            0.1 0.9 0   0 0
            0   0.2 0.8 0 0
            0   0   0   1 0
        `,
    },
    lavenderHaze: {
        colorMatrix: `
            0.7 0.1 0.3 0 0
            0.2 0.6 0.3 0 0
            0.2 0.1 0.7 0 0
            0   0   0   1 0
        `,
    },
    emeraldGlow: {
        colorMatrix: `
            0.6 0   0   0 0
            0   1.1 0   0 0
            0   0   0.7 0 0
            0   0   0   1 0
        `,
    },
    roseTint: {
        colorMatrix: `
            1.2 0.1 0.2 0 0
            0.2 0.8 0.2 0 0
            0.1 0.2 0.9 0 0
            0   0   0   1 0
        `,
    },


};

const ImageFilter: React.FC<FilterProps> = ({
                                                imageUrl,
                                                filter,
                                                redChannel = 1,
                                                greenChannel = 1,
                                                blueChannel = 1,
                                                brightness = 100,
                                                contrast = 100,
                                                saturation = 100,
                                                hueRotate = 0,
    styles
                                            }) => {
    const filterId = `filter-${uuidv4()}`;

    const predefinedFilter = predefinedFilters[filter || ''] || {
        cssFilter: '',
        colorMatrix:undefined
    };

    const colorMatrix = predefinedFilter.colorMatrix || `
        ${redChannel} 0 0 0 0
        0 ${greenChannel} 0 0 0
        0 0 ${blueChannel} 0 0
        0 0 0 1 0
    `;

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <svg  width="1" height="1">
                <filter id={filterId}>
                    <feColorMatrix
                        type="matrix"
                        values={colorMatrix}
                    />
                </filter>
            </svg>
            <img
                key={filterId}
                src={imageUrl}
                alt="Filtered"
                style={{
                    filter: `url(#${filterId}) ${predefinedFilter.cssFilter || ''} brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) hue-rotate(${hueRotate}deg)`,
                    width: '100%',
                    height: '100%',
                    ...styles,
                }}
            />
        </div>
    );
};

export default ImageFilter;
