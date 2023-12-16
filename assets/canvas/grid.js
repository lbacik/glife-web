
function drawGrid(canvas, width, height, cellSize, color = '#bbb', lineWidth = 1) {
    const ctx = canvas.getContext('2d')
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    for (let i = 0; i < width; i++) {
        ctx.beginPath()
        ctx.moveTo(i * cellSize, 0)
        ctx.lineTo(i * cellSize, canvas.height)
        ctx.stroke()
    }
    for (let i = 0; i < height; i++) {
        ctx.beginPath()
        ctx.moveTo(0, i * cellSize)
        ctx.lineTo(canvas.width, i * cellSize)
        ctx.stroke()
    }
}

function setSize(canvas, width, height, cellSize) {
    canvas.width = width * cellSize
    canvas.height = height * cellSize
}

function clear(canvas) {
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

export { drawGrid, setSize, clear }
