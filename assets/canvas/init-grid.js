
function drawInitGrid(canvas, startX, startY, cellSize, width, color) {
    const pointStartX = startX * cellSize
    const pointStartY = startY * cellSize
    const pointEndX = pointStartX + (width * cellSize)
    const pointEndY = pointStartY + cellSize


    const ctx = canvas.getContext('2d')
    ctx.strokeStyle = color
    ctx.lineWidth = 1

    ctx.beginPath()
    ctx.moveTo(pointStartX, pointStartY)
    ctx.lineTo(pointEndX, pointStartY)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(pointStartX, pointStartY)
    ctx.lineTo(pointStartX, pointEndY)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(pointEndX, pointStartY)
    ctx.lineTo(pointEndX, pointEndY)
    ctx.stroke()
}

function showInitGridData(canvas, startX, startY, cellSize, width, color, data) {
    const pointStartX = startX * cellSize
    const pointStartY = startY * cellSize

    const ctx = canvas.getContext('2d')
    ctx.fillStyle = color
    ctx.lineWidth = 1

    data.forEach((cell, x) => {

        if (Boolean(cell)) {
            const j = Math.floor(x / width)
            const i = x % width

            ctx.fillRect(
                pointStartX + (i * cellSize) + 1,
                pointStartY + (j * cellSize) + 1,
                cellSize - 2,
                cellSize - 2
            )
        }
    })
}

export { drawInitGrid, showInitGridData }
