
// TESTING
function drawGrid(context, canvas, cellSize = 50, color = 'rgba(200, 200, 200, 0.5)') {
    context.strokeStyle = color;
    context.lineWidth = 0.5;
    
    // Draw vertical lines
    for (let x = 0; x < canvas.width; x += cellSize) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
        context.stroke();
    }
    
    // Draw horizontal lines
    for (let y = 0; y < canvas.height; y += cellSize) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
        context.stroke();
    }
    
    // Draw coordinate labels (optional)
    context.fillStyle = 'black';
    context.font = '10px Arial';
    for (let x = 0; x < canvas.width; x += cellSize) {
        context.fillText(x, x, 10);
    }
    for (let y = 0; y < canvas.height; y += cellSize) {
        context.fillText(y, 0, y + 10);
    }
}