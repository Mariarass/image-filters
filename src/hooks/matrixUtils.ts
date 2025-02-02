/**
 * Converts a color matrix string (in a 4x5 format) to a flat array of numbers.
 * For example, the following matrix:
 *
 *  1 0 0 0 0
 *  0 1 0 0 0
 *  0 0 1 0 0
 *  0 0 0 1 0
 *
 * becomes: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
 */
export function parseColorMatrix(matrixStr: string): number[] {
    return matrixStr
        .trim()
        .split(/\s+/)
        .map((v) => parseFloat(v));
}

/**
 * Converts a flat color matrix (an array of 20 numbers) to a formatted string.
 * For example, given:
 * [1.2, 0.1, 0.2, 0, 0, 0.2, 0.8, 0.2, 0, 0, 0.1, 0.2, 0.9, 0, 0, 0, 0, 0, 1, 0]
 *
 * It returns a string in the form:
 * 1.200 0.100 0.200 0.000 0.000
 * 0.200 0.800 0.200 0.000 0.000
 * 0.100 0.200 0.900 0.000 0.000
 * 0.000 0.000 0.000 1.000 0.000
 */
export function matrixToString(m: number[]): string {
    const rows = [];
    for (let i = 0; i < 20; i += 5) {
        rows.push(
            m
                .slice(i, i + 5)
                .map((x) => x.toFixed(2))
                .join(' ')
        );
    }
    return rows.join('\n');
}

/**
 * Multiplies two color matrices (each represented as a flat array of 20 numbers, forming a 4x5 matrix)
 * and returns the resulting matrix.
 * The translation components (the 5th column of each row) are combined appropriately.
 */
export function multiplyColorMatrices(A: number[], B: number[]): number[] {
    const R = new Array(20).fill(0);

    // Multiply the 4x4 parts
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            let sum = 0;
            for (let k = 0; k < 4; k++) {
                sum += A[row * 5 + k] * B[k * 5 + col];
            }
            R[row * 5 + col] = sum;
        }

        // Combine the translation (offset) components.
        // Note: The offset values are scaled by 255.
        let shift = A[row * 5 + 4] * 255;

        for (let k = 0; k < 4; k++) {
            shift += A[row * 5 + k] * B[k * 5 + 4] * 255;
        }
        R[row * 5 + 4] = shift / 255.0;
    }

    return R;
}

/**
 * Applies a combination of CSS filters to the pixel data.
 * This function parses a combined CSS filter string and applies each parsed filter to the image pixels.
 */
export function applyCombinedFilters(
    pixels: Uint8ClampedArray,
    cssFilterString: string | undefined,
    brightness: number,
    contrast: number,
    saturation: number,
    hueRotate: number
) {
    const combinedCssFilter = getCombinedCssFilter(
        cssFilterString,
        brightness,
        contrast,
        saturation,
        hueRotate
    );

    const parsedFilters = parseCssFilters(combinedCssFilter);
    applyParsedCssFilters(pixels, parsedFilters);
}

/**
 * Combines a predefined CSS filter string with custom adjustments (brightness, contrast, saturate, hue-rotate)
 * into one CSS filter string.
 */
export function getCombinedCssFilter(
    predefinedCssFilter: string | undefined,
    brightness: number,
    contrast: number,
    saturation: number,
    hueRotate: number
): string {
    const customCssFilter = `
    brightness(${brightness}%)
    contrast(${contrast}%)
    saturate(${saturation}%)
    hue-rotate(${hueRotate}deg)
  `.trim();

    return [predefinedCssFilter, customCssFilter]
        .filter(Boolean)
        .join(' ');
}

/**
 * Applies a color matrix (similar to <feColorMatrix>) to the image pixel data.
 * The matrix string must contain exactly 20 numbers.
 */
export function applyColorMatrix(data: Uint8ClampedArray, matrixString: string) {
    const values = matrixString
        .trim()
        .split(/\s+/)
        .map((v) => parseFloat(v));

    if (values.length !== 20) {
        console.warn('colorMatrix must have 20 numbers exactly');
        return;
    }

    for (let i = 0; i < data.length; i += 4) {
        const rIn = data[i];
        const gIn = data[i + 1];
        const bIn = data[i + 2];
        const aIn = data[i + 3];

        const rOut =
            values[0] * rIn +
            values[1] * gIn +
            values[2] * bIn +
            values[3] * aIn +
            values[4];
        const gOut =
            values[5] * rIn +
            values[6] * gIn +
            values[7] * bIn +
            values[8] * aIn +
            values[9];
        const bOut =
            values[10] * rIn +
            values[11] * gIn +
            values[12] * bIn +
            values[13] * aIn +
            values[14];
        const aOut =
            values[15] * rIn +
            values[16] * gIn +
            values[17] * bIn +
            values[18] * aIn +
            values[19];
        data[i] = clamp(rOut);
        data[i + 1] = clamp(gOut);
        data[i + 2] = clamp(bOut);
        data[i + 3] = clamp(aOut);
    }
}

/**
 * Parses a CSS filter string (e.g., "sepia(50%) grayscale(20%) invert(30%)")
 * and returns an array of objects in the form { name: 'filterName', value: numericValue }.
 * Only supported filters (sepia, grayscale, invert, brightness, contrast, saturate, hue-rotate) are parsed.
 * Unsupported filters (like blur, drop-shadow) are ignored.
 */
function parseCssFilters(cssFilter: string) {
    const results: Array<{ name: string; value: number }> = [];

    // Trim any extra spaces
    const trimmed = cssFilter.trim();

    if (!trimmed) return results;

    // Split the filter string by ")" and add ")" back to each part, then parse
    const filterParts = trimmed
        .split(')')
        .map((p) => p.trim())
        .filter(Boolean);

    filterParts.forEach((part) => {
        // Restore the closing parenthesis
        const full = part + ')';

        // Match patterns like "filterName(number%)" or "filterName(number)".
        const match = full.match(/^(.*?)\((.*)\)$/);
        if (!match) return;
        const filterName = match[1].trim();
        let rawValue = match[2].trim(); // e.g., "50%", "0.5", "100%", etc.

        // Remove the "%" sign if present to get a fraction value.
        const isPercent = rawValue.endsWith('%');
        if (isPercent) {
            rawValue = rawValue.slice(0, -1);
        }

        const numeric = parseFloat(rawValue);
        if (isNaN(numeric)) return;

        // If the value was in percent, convert it to a fraction in the range [0, 1]
        const value = isPercent ? numeric / 100 : numeric;

        // Only support simple one-channel filters
        switch (filterName) {
            case 'grayscale':
            case 'invert':
            case 'sepia':
            case 'brightness':
            case 'contrast':
            case 'saturate':
                results.push({ name: filterName, value });
                break;
            case 'hue-rotate':
                // hue-rotate usually comes in degrees (e.g., "hue-rotate(30deg)").
                // Remove the "deg" and parse the number.
                if (rawValue.endsWith('deg')) {
                    const degVal = parseFloat(rawValue.replace('deg', ''));
                    if (!isNaN(degVal)) {
                        results.push({ name: 'hue-rotate', value: degVal });
                    }
                }
                break;
            // Ignore unsupported filters like blur, drop-shadow, etc.
            default:
                break;
        }
    });

    return results;
}

/**
 * Applies the parsed CSS filters (sepia, invert, grayscale, brightness, contrast, saturate, hue-rotate)
 * sequentially to the pixel data.
 */
function applyParsedCssFilters(data: Uint8ClampedArray, filters: Array<{ name: string; value: number }>) {
    filters.forEach((f) => {
        switch (f.name) {
            case 'brightness':
                applyBrightness(data, f.value);
                break;
            case 'contrast':
                applyContrast(data, f.value);
                break;
            case 'saturate':
                applySaturate(data, f.value);
                break;
            case 'sepia':
                applySepia(data, f.value);
                break;
            case 'grayscale':
                applyGrayscale(data, f.value);
                break;
            case 'invert':
                applyInvert(data, f.value);
                break;
            case 'hue-rotate':
                applyHueRotate(data, f.value);
                break;
            default:
                break;
        }
    });
}

// --- Filter implementations below ---

/**
 * Applies brightness adjustment to the pixel data.
 * factor = 1 means 100% (no change), factor = 1.2 means 120% brightness.
 */
function applyBrightness(data: Uint8ClampedArray, factor: number) {
    for (let i = 0; i < data.length; i += 4) {
        data[i] *= factor;
        data[i + 1] *= factor;
        data[i + 2] *= factor;
    }
}

/**
 * Applies contrast adjustment to the pixel data.
 * factor = 1 means 100% (no change), factor = 2 means 200% contrast.
 */
function applyContrast(data: Uint8ClampedArray, factor: number) {
    for (let i = 0; i < data.length; i += 4) {
        data[i] = (data[i] - 128) * factor + 128;
        data[i + 1] = (data[i + 1] - 128) * factor + 128;
        data[i + 2] = (data[i + 2] - 128) * factor + 128;
    }
}

/**
 * Applies saturation adjustment to the pixel data.
 * factor = 1 means 100% (no change), factor = 2 means 200% saturation.
 * This implementation converts the color to HSL, scales the saturation, and converts it back to RGB.
 */
function applySaturate(data: Uint8ClampedArray, factor: number) {
    for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];
        const [h, s, l] = rgbToHsl(r, g, b);
        const s2 = s * factor;
        const [r2, g2, b2] = hslToRgb(h, s2, l);
        data[i] = clamp(r2);
        data[i + 1] = clamp(g2);
        data[i + 2] = clamp(b2);
    }
}

/**
 * Applies a grayscale effect to the pixel data.
 * factor = 1 means fully grayscale.
 * Uses a standard luminance calculation (0.3*R + 0.59*G + 0.11*B) and interpolates.
 */
function applyGrayscale(data: Uint8ClampedArray, factor: number) {
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const gray = 0.3 * r + 0.59 * g + 0.11 * b;

        data[i] = r + (gray - r) * factor;
        data[i + 1] = g + (gray - g) * factor;
        data[i + 2] = b + (gray - b) * factor;
    }
}

/**
 * Applies inversion to the pixel data.
 * factor = 1 means fully inverted.
 * The new color is interpolated between the original and its inverse.
 */
function applyInvert(data: Uint8ClampedArray, factor: number) {
    for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i] + (255 - data[i]) * factor;
        data[i + 1] = data[i + 1] + (255 - data[i + 1]) * factor;
        data[i + 2] = data[i + 2] + (255 - data[i + 2]) * factor;
    }
}

/**
 * Applies a sepia effect to the pixel data.
 * Uses a simple sepia algorithm and then interpolates between the original and sepia tones.
 */
function applySepia(data: Uint8ClampedArray, factor: number) {
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const sr = 0.393 * r + 0.769 * g + 0.189 * b;
        const sg = 0.349 * r + 0.686 * g + 0.168 * b;
        const sb = 0.272 * r + 0.534 * g + 0.131 * b;

        data[i] = r + (sr - r) * factor;
        data[i + 1] = g + (sg - g) * factor;
        data[i + 2] = b + (sb - b) * factor;
    }
}

/**
 * Applies a hue rotation to the pixel data.
 * The hue is rotated by the specified number of degrees.
 */
function applyHueRotate(data: Uint8ClampedArray, deg: number) {
    for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        let [h, s, l] = rgbToHsl(r, g, b);
        h = (h + deg) % 360;
        const [r2, g2, b2] = hslToRgb(h, s, l);

        data[i] = clamp(r2);
        data[i + 1] = clamp(g2);
        data[i + 2] = clamp(b2);
    }
}

/** Helper functions */

/**
 * Clamps a value between 0 and 255 and rounds it to the nearest integer.
 */
function clamp(v: number) {
    return Math.max(0, Math.min(255, Math.round(v)));
}

/**
 * Converts RGB values to HSL.
 * Returns an array [h, s, l] where h is in degrees [0, 360),
 * s and l are percentages in the range [0, 100].
 */
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    if (max === min) {
        h = 0;
        s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
            default:
                h = (r - g) / d + 4;
                break;
        }
        h *= 60;
    }
    s *= 100;
    const lPercent = l * 100;
    return [h, s, lPercent];
}

/**
 * Converts HSL values to RGB.
 * h is in degrees [0, 360), s and l are in percentages [0, 100].
 * Returns an array [r, g, b] with RGB values in the range [0, 255].
 */
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0,
        g = 0,
        b = 0;
    if (0 <= h && h < 60) {
        r = c;
        g = x;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
    } else if (120 <= h && h < 180) {
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        b = c;
    } else {
        r = c;
        b = x;
    }
    return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}
