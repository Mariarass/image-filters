import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { predefinedFilters } from './helpers/filters';

import { useDebounce } from './hooks/useDebounce';
import {
    applyColorMatrix,
    applyCombinedFilters,
    getCombinedCssFilter,
    matrixToString,
    multiplyColorMatrices,
    parseColorMatrix
} from "./hooks/matrixUtils";

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
    saveImage?: (file: File) => void;
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
                                                saveImage,
                                                styles,
                                            }) => {
    // Generate a unique filter ID for SVG filter references
    const filterId = `filter-${uuidv4()}`;

    // Reference to the <img> element
    const imgRef = useRef<HTMLImageElement>(null);

    // Indicates whether the image has finished loading
    const [isReady, setIsReady] = useState(false);

    // Debounce all numeric props to avoid rapid re-renders
    const debouncedBrightness = useDebounce(brightness, 300);
    const debouncedContrast = useDebounce(contrast, 300);
    const debouncedSaturation = useDebounce(saturation, 300);
    const debouncedHueRotate = useDebounce(hueRotate, 300);
    const debouncedRedChannel = useDebounce(redChannel, 300);
    const debouncedGreenChannel = useDebounce(greenChannel, 300);
    const debouncedBlueChannel = useDebounce(blueChannel, 300);

    // Called once the <img> element has fully loaded
    const onImageLoad = () => {
        setIsReady(true);
    };

    // 1) Retrieve the predefined filter from our presets (if it exists)
    const predefinedFilter = filter && predefinedFilters[filter]
        ? predefinedFilters[filter]
        : {
            cssFilter: '',
            colorMatrix: undefined,
        };

    // 2) Create a color matrix string for the user-defined R/G/B channels
    const userMatrixStr = `
    ${redChannel} 0 0 0 0
    0 ${greenChannel} 0 0 0
    0 0 ${blueChannel} 0 0
    0 0 0 1 0
  `;

    // 3) If the predefined filter has its own colorMatrix, multiply it
    //    with the user's matrix to combine both transformations
    let finalMatrixStr = userMatrixStr;
    if (predefinedFilter.colorMatrix) {
        const presetM = parseColorMatrix(predefinedFilter.colorMatrix);
        const userM = parseColorMatrix(userMatrixStr);
        const res = multiplyColorMatrices(presetM, userM);
        finalMatrixStr = matrixToString(res);
    }

    // 4) Calculate the combined CSS filter string from both the preset
    //    and the user's brightness/contrast/saturation/hueRotate adjustments
    const combinedCssFilter = getCombinedCssFilter(
        predefinedFilter.cssFilter,
        brightness,
        contrast,
        saturation,
        hueRotate
    );

    // Save the final, filtered image as a blob
    const handleSaveImage = () => {
        // If there's no <img> ref, image isn't ready, or saveImage callback is missing, do nothing
        if (!imgRef.current || !isReady || !saveImage) return;

        const img = imgRef.current;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Match canvas size to the original image dimensions
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        // Draw the original image onto the canvas
        ctx.drawImage(img, 0, 0);

        // Extract the raw pixel data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        // Apply the final (combined) color matrix to the pixel data
        applyColorMatrix(pixels, finalMatrixStr);

        // Apply any remaining CSS-based filters (brightness, contrast, etc.)
        applyCombinedFilters(
            pixels,
            predefinedFilter.cssFilter,
            brightness,
            contrast,
            saturation,
            hueRotate
        );

        // Write the updated pixel data back to the canvas
        ctx.putImageData(imageData, 0, 0);

        // Convert the canvas to a blob -> File -> Object URL, then pass it to the saveImage callback
        canvas.toBlob((blob) => {
            if (!blob) return;
            const file = new File([blob], 'filtered-image.png', { type: 'image/png' });
            saveImage(file);
        }, 'image/png');
    };

    // Whenever filters or debounced values change (or the image is ready),
    // re-apply and save the filtered image
    useEffect(() => {
        handleSaveImage();
    }, [
        filter,
        debouncedBrightness,
        debouncedContrast,
        debouncedSaturation,
        debouncedHueRotate,
        debouncedRedChannel,
        debouncedGreenChannel,
        debouncedBlueChannel,
        isReady,
    ]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>

            <svg width="1" height="1">
                <filter id={filterId}  colorInterpolationFilters="sRGB">
                    <feColorMatrix type="matrix" values={finalMatrixStr}/>
                </filter>
            </svg>

            {/* The image itself, referencing both the SVG filter and the CSS filters */}
            <img
                ref={imgRef}
                crossOrigin="anonymous"
                key={filterId}
                src={imageUrl}
                alt="Filtered"
                onLoad={onImageLoad}
                style={{
                    filter: `url(#${filterId}) ${combinedCssFilter}`,
                    width: '100%',
                    height: '100%',
                    ...styles,
                }}
            />
        </div>
    );
};

export default ImageFilter;
