import React  from 'react';
import { v4 as uuidv4 } from 'uuid';
import {predefinedFilters} from "./filters";

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
