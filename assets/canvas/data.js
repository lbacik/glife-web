
function drawData(canvas, data, cellSize, compact = false, color = '#444') {
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = color

    data.forEach((row, x) => {
        row.forEach((cell, y) => {
            const padding = !compact && cellSize > 2 ? 1 : 0
            const size = cellSize - (padding * 2)
            const px = (x * cellSize) + padding
            const py = (y * cellSize) + padding

            if (cell) {
                ctx.fillRect(px, py, size, size)
            }
        })
    })
}

export { drawData }
