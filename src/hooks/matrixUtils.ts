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

export  function convert4x4to4x5(matrix4x4: Float32Array): string {
    if (matrix4x4.length !== 16) {
        throw new Error("Ожидается матрица 4x4 (16 элементов)");
    }
    const matrix4x5: number[] = [];
    for (let row = 0; row < 4; row++) {
        // Copy 4 elements from the row
        matrix4x5.push(matrix4x4[row * 4]);     // first element of the row
        matrix4x5.push(matrix4x4[row * 4 + 1]);   // second element of the row
        matrix4x5.push(matrix4x4[row * 4 + 2]);   // third element of the row
        matrix4x5.push(matrix4x4[row * 4 + 3]);   // fourth element of the row
        // Add bias for this row (usually 0)
        matrix4x5.push(0);
    }
    return matrix4x5.join(' ');
}
