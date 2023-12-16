
function drawData(canvas, data, cellSize, color = '#444') {
    const ctx = canvas.getContext('2d')

    // ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = color

    data.forEach((row, x) => {
        row.forEach((cell, y) => {
            if (cell) {
                ctx.fillRect(
                    (x * cellSize) + 1,
                    (y * cellSize) + 1,
                    cellSize - 2,
                    cellSize - 2
                )
            } else {
                ctx.clearRect(
                    (x * cellSize) + 1,
                    (y * cellSize) + 1,
                    cellSize - 2,
                    cellSize - 2
                )
            }
        })
    })
}

export { drawData }
