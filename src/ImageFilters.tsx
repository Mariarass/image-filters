import React, { useId } from 'react';

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
};

type PredefinedFilter = {
    cssFilter: string;
    colorMatrix?: string;
};

const predefinedFilters: Record<string, PredefinedFilter> = {
    grayscale: { cssFilter: 'grayscale(100%)' },
    sepia: { cssFilter: 'sepia(100%)' },
    invert: { cssFilter: 'invert(100%)' },
    blur: { cssFilter: 'blur(5px)' },
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
    customRedBlue: {
        cssFilter: 'none',
        colorMatrix: `
            1.5 0   0   0 0
            0   1.2 0   0 0
            0   0   2.0 0 0
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
                                            }) => {
    const filterId = useId();


    const predefinedFilter = predefinedFilters[filter || ''] || {
        cssFilter: '',
        colorMatrix: undefined,
    };

    const colorMatrix = predefinedFilter.colorMatrix || `
        ${redChannel} 0 0 0 0
        0 ${greenChannel} 0 0 0
        0 0 ${blueChannel} 0 0
        0 0 0 1 0
    `;

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <svg width="0" height="0">
                <filter id={filterId}>
                    <feColorMatrix
                        type="matrix"
                        values={colorMatrix}
                    />
                </filter>
            </svg>
            <img
                src={imageUrl}
                alt="Filtered"
                style={{
                    filter: `${predefinedFilter.cssFilter} url(#${filterId}) brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) hue-rotate(${hueRotate}deg)`,
                    width: '100%',
                    height: '100%',
                }}
            />
        </div>
    );
};

export default ImageFilter;
