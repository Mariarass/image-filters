export function multiplyColorMatrices(
    A: ArrayLike<number>,
    B: ArrayLike<number>
): Float32Array {
    const result = new Float32Array(16);

    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            let sum = 0;
            for (let k = 0; k < 4; k++) {
                sum += A[row * 4 + k] * B[k * 4 + col];
            }
            result[row * 4 + col] = sum;
        }
    }

    return result;
}
