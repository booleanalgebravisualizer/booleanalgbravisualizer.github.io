function drawGatesDiagram(svg, variables, expression) {
    svg.innerHTML = '';
    
    const ns = 'http://www.w3.org/2000/svg';
    const startY = 60;
    const gateSpacing = 60;
    
    // Title
    const title = document.createElementNS(ns, 'text');
    title.setAttribute('x', '50%');
    title.setAttribute('y', '30');
    title.setAttribute('text-anchor', 'middle');
    title.setAttribute('font-size', '18');
    title.setAttribute('font-weight', 'bold');
    title.textContent = 'Logic Gate Diagram';
    svg.appendChild(title);
    
    // Draw input variables
    variables.forEach((v, i) => {
        const y = startY + i * gateSpacing;
        
        const circle = document.createElementNS(ns, 'circle');
        circle.setAttribute('cx', '30');
        circle.setAttribute('cy', y);
        circle.setAttribute('r', '8');
        circle.setAttribute('fill', '#667eea');
        svg.appendChild(circle);
        
        const label = document.createElementNS(ns, 'text');
        label.setAttribute('x', '55');
        label.setAttribute('y', y + 5);
        label.setAttribute('font-size', '14');
        label.setAttribute('font-weight', 'bold');
        label.textContent = v;
        svg.appendChild(label);
    });
    
    // Draw sample gates
    drawGate(svg, 200, startY + 30, 'AND', '#764ba2');
    drawGate(svg, 350, startY + 30, 'OR', '#667eea');
    drawGate(svg, 500, startY + 30, 'NOT', '#ff6b6b');
    
    // Output
    const outputCircle = document.createElementNS(ns, 'circle');
    outputCircle.setAttribute('cx', '650');
    outputCircle.setAttribute('cy', startY + 30);
    outputCircle.setAttribute('r', '8');
    outputCircle.setAttribute('fill', '#28a745');
    svg.appendChild(outputCircle);
    
    const outputLabel = document.createElementNS(ns, 'text');
    outputLabel.setAttribute('x', '675');
    outputLabel.setAttribute('y', startY + 35);
    outputLabel.setAttribute('font-size', '14');
    outputLabel.setAttribute('font-weight', 'bold');
    outputLabel.textContent = 'Output';
    svg.appendChild(outputLabel);
}

function drawGate(svg, x, y, type, color) {
    const ns = 'http://www.w3.org/2000/svg';
    
    const rect = document.createElementNS(ns, 'rect');
    rect.setAttribute('x', x - 30);
    rect.setAttribute('y', y - 25);
    rect.setAttribute('width', '60');
    rect.setAttribute('height', '50');
    rect.setAttribute('fill', color);
    rect.setAttribute('stroke', '#333');
    rect.setAttribute('stroke-width', '2');
    rect.setAttribute('rx', '5');
    svg.appendChild(rect);
    
    const text = document.createElementNS(ns, 'text');
    text.setAttribute('x', x);
    text.setAttribute('y', y + 8);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', 'white');
    text.setAttribute('font-size', '12');
    text.setAttribute('font-weight', 'bold');
    text.textContent = type;
    svg.appendChild(text);
}

function drawCMOSDiagram(svg, variables, expression) {
    svg.innerHTML = '';
    
    const ns = 'http://www.w3.org/2000/svg';
    
    // Title
    const title = document.createElementNS(ns, 'text');
    title.setAttribute('x', '50%');
    title.setAttribute('y', '30');
    title.setAttribute('text-anchor', 'middle');
    title.setAttribute('font-size', '18');
    title.setAttribute('font-weight', 'bold');
    title.textContent = 'CMOS Implementation';
    svg.appendChild(title);
    
    // VDD label
    const vddLabel = document.createElementNS(ns, 'text');
    vddLabel.setAttribute('x', '100');
    vddLabel.setAttribute('y', '70');
    vddLabel.setAttribute('font-size', '14');
    vddLabel.setAttribute('font-weight', 'bold');
    vddLabel.textContent = 'VDD (Pull-up Network)';
    svg.appendChild(vddLabel);
    
    // Draw PMOS transistors
    for (let i = 0; i < variables.length; i++) {
        drawCMOSTransistor(svg, 150 + i * 120, 120, 'PMOS', '#2196f3');
    }
    
    // GND label
    const gndLabel = document.createElementNS(ns, 'text');
    gndLabel.setAttribute('x', '100');
    gndLabel.setAttribute('y', '280');
    gndLabel.setAttribute('font-size', '14');
    gndLabel.setAttribute('font-weight', 'bold');
    gndLabel.textContent = 'GND (Pull-down Network)';
    svg.appendChild(gndLabel);
    
    // Draw NMOS transistors
    for (let i = 0; i < variables.length; i++) {
        drawCMOSTransistor(svg, 150 + i * 120, 280, 'NMOS', '#f44336');
    }
    
    // Output node
    const output = document.createElementNS(ns, 'circle');
    output.setAttribute('cx', '400');
    output.setAttribute('cy', '200');
    output.setAttribute('r', '8');
    output.setAttribute('fill', '#ff9800');
    svg.appendChild(output);
    
    const outLabel = document.createElementNS(ns, 'text');
    outLabel.setAttribute('x', '420');
    outLabel.setAttribute('y', '205');
    outLabel.setAttribute('font-size', '12');
    outLabel.setAttribute('font-weight', 'bold');
    outLabel.textContent = 'Output';
    svg.appendChild(outLabel);
}

function drawCMOSTransistor(svg, x, y, type, color) {
    const ns = 'http://www.w3.org/2000/svg';
    
    // Gate
    const gate = document.createElementNS(ns, 'line');
    gate.setAttribute('x1', x - 5);
    gate.setAttribute('y1', y - 30);
    gate.setAttribute('x2', x - 5);
    gate.setAttribute('y2', y + 30);
    gate.setAttribute('stroke', '#333');
    gate.setAttribute('stroke-width', '3');
    svg.appendChild(gate);
    
    // Channel
    const channel = document.createElementNS(ns, 'rect');
    channel.setAttribute('x', x - 2);
    channel.setAttribute('y', y - 10);
    channel.setAttribute('width', '20');
    channel.setAttribute('height', '20');
    channel.setAttribute('fill', color);
    channel.setAttribute('stroke', '#333');
    channel.setAttribute('stroke-width', '2');
    svg.appendChild(channel);
    
    // Label
    const label = document.createElementNS(ns, 'text');
    label.setAttribute('x', x + 15);
    label.setAttribute('y', y + 5);
    label.setAttribute('font-size', '11');
    label.textContent = type[0];
    svg.appendChild(label);
}

function drawTruthTable(data) {
    const container = document.getElementById('truthTable');
    container.innerHTML = '';
    
    if (!data.truthTable || data.truthTable.length === 0) {
        container.innerHTML = '<p>No truth table data</p>';
        return;
    }
    
    const table = document.createElement('table');
    
    // Header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    data.variables.forEach(v => {
        const th = document.createElement('th');
        th.textContent = v;
        headerRow.appendChild(th);
    });
    
    const outputTh = document.createElement('th');
    outputTh.textContent = 'Output';
    headerRow.appendChild(outputTh);
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Body
    const tbody = document.createElement('tbody');
    data.truthTable.forEach(row => {
        const tr = document.createElement('tr');
        
        data.variables.forEach(v => {
            const td = document.createElement('td');
            td.textContent = row[v];
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
    // Input lines
    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttributeNS(null, 'x1', x - 30);
    line1.setAttributeNS(null, 'y1', y - 12);
    line1.setAttributeNS(null, 'x2', x);
    line1.setAttributeNS(null, 'y2', y - 12);
    line1.setAttributeNS(null, 'stroke', 'black');
    line1.setAttributeNS(null, 'stroke-width', '2');
    
    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttributeNS(null, 'x1', x - 30);
    line2.setAttributeNS(null, 'y1', y + 12);
    line2.setAttributeNS(null, 'x2', x);
    line2.setAttributeNS(null, 'y2', y + 12);
    line2.setAttributeNS(null, 'stroke', 'black');
    line2.setAttributeNS(null, 'stroke-width', '2');
    
    // AND gate shape (flat left, curved right)
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttributeNS(null, 'd', `M ${x} ${y-25} L ${x} ${y+25} Q ${x+35} ${y+25} ${x+35} ${y} Q ${x+35} ${y-25} ${x} ${y-25}`);
    path.setAttributeNS(null, 'stroke', 'black');
    path.setAttributeNS(null, 'stroke-width', '2');
    path.setAttributeNS(null, 'fill', 'white');
    
    // Output line
    const outLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    outLine.setAttributeNS(null, 'x1', x + 35);
    outLine.setAttributeNS(null, 'y1', y);
    outLine.setAttributeNS(null, 'x2', x + 65);
    outLine.setAttributeNS(null, 'y2', y);
    outLine.setAttributeNS(null, 'stroke', 'black');
    outLine.setAttributeNS(null, 'stroke-width', '2');
    
    // Label
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttributeNS(null, 'x', x + 17);
    text.setAttributeNS(null, 'y', y + 5);
    text.setAttributeNS(null, 'font-size', '12');
    text.setAttributeNS(null, 'text-anchor', 'middle');
    text.textContent = '&';
    
    g.appendChild(line1);
    g.appendChild(line2);
    g.appendChild(path);
    g.appendChild(outLine);
    g.appendChild(text);
    
    svg.appendChild(g);
    return x + 100;
  }

  /**
   * Renders OR gate
   */
  drawOrGate(svg, x, y) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
    // Input lines
    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttributeNS(null, 'x1', x - 30);
    line1.setAttributeNS(null, 'y1', y - 12);
    line1.setAttributeNS(null, 'x2', x - 5);
    line1.setAttributeNS(null, 'y2', y - 12);
    line1.setAttributeNS(null, 'stroke', 'black');
    line1.setAttributeNS(null, 'stroke-width', '2');
    
    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttributeNS(null, 'x1', x - 30);
    line2.setAttributeNS(null, 'y1', y + 12);
    line2.setAttributeNS(null, 'x2', x - 5);
    line2.setAttributeNS(null, 'y2', y + 12);
    line2.setAttributeNS(null, 'stroke', 'black');
    line2.setAttributeNS(null, 'stroke-width', '2');
    
    // OR gate shape (curved on both sides)
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttributeNS(null, 'd', `M ${x-5} ${y-25} Q ${x} ${y-25} ${x+5} ${y-18} L ${x+35} ${y} L ${x+5} ${y+18} Q ${x} ${y+25} ${x-5} ${y+25} Q ${x-12} ${y+18} ${x-12} ${y} Q ${x-12} ${y-18} ${x-5} ${y-25}`);
    path.setAttributeNS(null, 'stroke', 'black');
    path.setAttributeNS(null, 'stroke-width', '2');
    path.setAttributeNS(null, 'fill', 'white');
    
    // Output line
    const outLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    outLine.setAttributeNS(null, 'x1', x + 35);
    outLine.setAttributeNS(null, 'y1', y);
    outLine.setAttributeNS(null, 'x2', x + 65);
    outLine.setAttributeNS(null, 'y2', y);
    outLine.setAttributeNS(null, 'stroke', 'black');
    outLine.setAttributeNS(null, 'stroke-width', '2');
    
    // Label
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttributeNS(null, 'x', x + 20);
    text.setAttributeNS(null, 'y', y + 5);
    text.setAttributeNS(null, 'font-size', '12');
    text.setAttributeNS(null, 'text-anchor', 'middle');
    text.textContent = '≥1';
    
    g.appendChild(line1);
    g.appendChild(line2);
    g.appendChild(path);
    g.appendChild(outLine);
    g.appendChild(text);
    
    svg.appendChild(g);
    return x + 100;
  }

  /**
   * Renders NOT gate
   */
  drawNotGate(svg, x, y) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
    // Input line
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttributeNS(null, 'x1', x - 30);
    line.setAttributeNS(null, 'y1', y);
    line.setAttributeNS(null, 'x2', x);
    line.setAttributeNS(null, 'y2', y);
    line.setAttributeNS(null, 'stroke', 'black');
    line.setAttributeNS(null, 'stroke-width', '2');
    
    // NOT gate (triangle)
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttributeNS(null, 'd', `M ${x} ${y-18} L ${x+30} ${y} L ${x} ${y+18} Z`);
    path.setAttributeNS(null, 'stroke', 'black');
    path.setAttributeNS(null, 'stroke-width', '2');
    path.setAttributeNS(null, 'fill', 'white');
    
    // Small circle at output
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttributeNS(null, 'cx', x + 38);
    circle.setAttributeNS(null, 'cy', y);
    circle.setAttributeNS(null, 'r', '6');
    circle.setAttributeNS(null, 'stroke', 'black');
    circle.setAttributeNS(null, 'stroke-width', '2');
    circle.setAttributeNS(null, 'fill', 'white');
    
    // Output line
    const outLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    outLine.setAttributeNS(null, 'x1', x + 44);
    outLine.setAttributeNS(null, 'y1', y);
    outLine.setAttributeNS(null, 'x2', x + 65);
    outLine.setAttributeNS(null, 'y2', y);
    outLine.setAttributeNS(null, 'stroke', 'black');
    outLine.setAttributeNS(null, 'stroke-width', '2');
    
    g.appendChild(line);
    g.appendChild(path);
    g.appendChild(circle);
    g.appendChild(outLine);
    
    svg.appendChild(g);
    return x + 100;
  }

  /**
   * Render CMOS transistor pair (pull-up/pull-down)
   */
  drawCMOSPair(svg, x, y, type = 'nmos', label = '') {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
    // Gate line
    const gateLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    gateLine.setAttributeNS(null, 'x1', x - 10);
    gateLine.setAttributeNS(null, 'y1', y - 25);
    gateLine.setAttributeNS(null, 'x2', x - 10);
    gateLine.setAttributeNS(null, 'y2', y + 25);
    gateLine.setAttributeNS(null, 'stroke', 'black');
    gateLine.setAttributeNS(null, 'stroke-width', '2');
    
    // Channel
    const channel = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    channel.setAttributeNS(null, 'x', x - 5);
    channel.setAttributeNS(null, 'y', y - 8);
    channel.setAttributeNS(null, 'width', '20');
    channel.setAttributeNS(null, 'height', '16');
    channel.setAttributeNS(null, 'stroke', 'black');
    channel.setAttributeNS(null, 'stroke-width', '2');
    channel.setAttributeNS(null, 'fill', 'white');
    
    // Source
    const source = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    source.setAttributeNS(null, 'x1', x + 15);
    source.setAttributeNS(null, 'y1', y + 20);
    source.setAttributeNS(null, 'x2', x + 15);
    source.setAttributeNS(null, 'y2', y + 35);
    source.setAttributeNS(null, 'stroke', 'black');
    source.setAttributeNS(null, 'stroke-width', '2');
    
    // Drain
    const drain = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    drain.setAttributeNS(null, 'x1', x + 15);
    drain.setAttributeNS(null, 'y1', y - 20);
    drain.setAttributeNS(null, 'x2', x + 15);
    drain.setAttributeNS(null, 'y2', y - 35);
    drain.setAttributeNS(null, 'stroke', 'black');
    drain.setAttributeNS(null, 'stroke-width', '2');
    
    g.appendChild(gateLine);
    g.appendChild(channel);
    g.appendChild(source);
    g.appendChild(drain);
    
    svg.appendChild(g);
  }

  /**
   * Main method to render circuit from AST
   */
  renderBlockGates(svg, ast, variables) {
    // Clear SVG
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    // Set SVG viewBox
    svg.setAttributeNS(null, 'viewBox', '0 0 800 300');

    // Add background
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttributeNS(null, 'width', '800');
    bg.setAttributeNS(null, 'height', '300');
    bg.setAttributeNS(null, 'fill', '#f9f9f9');
    bg.setAttributeNS(null, 'stroke', '#ddd');
    bg.setAttributeNS(null, 'stroke-width', '1');
    svg.appendChild(bg);

    // Render simple gates based on AST
    this.renderGateTree(svg, ast, 50, 150, variables);
  }

  renderGateTree(svg, ast, x, y, variables) {
    if (ast.type === 'VAR') {
      // Draw variable label
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttributeNS(null, 'x', x + 20);
      text.setAttributeNS(null, 'y', y + 8);
      text.setAttributeNS(null, 'font-size', '14');
      text.setAttributeNS(null, 'font-weight', 'bold');
      text.textContent = ast.name;
      svg.appendChild(text);
      
      // Draw circle
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttributeNS(null, 'cx', x + 20);
      circle.setAttributeNS(null, 'cy', y);
      circle.setAttributeNS(null, 'r', '8');
      circle.setAttributeNS(null, 'fill', '#e3f2fd');
      circle.setAttributeNS(null, 'stroke', '#1976d2');
      circle.setAttributeNS(null, 'stroke-width', '2');
      svg.appendChild(circle);
      
      return x + 50;
    }

    if (ast.type === 'NOT') {
      const inX = this.renderGateTree(svg, ast.operand, x, y, variables);
      this.drawNotGate(svg, inX, y);
      return inX + 100;
    }

    if (ast.type === 'AND') {
      const leftX = this.renderGateTree(svg, ast.left, x, y - 30, variables);
      const rightX = this.renderGateTree(svg, ast.right, x, y + 30, variables);
      const midX = Math.max(leftX, rightX) + 30;
      
      // Connect left output
      const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line1.setAttributeNS(null, 'x1', leftX);
      line1.setAttributeNS(null, 'y1', y - 30);
      line1.setAttributeNS(null, 'x2', midX - 30);
      line1.setAttributeNS(null, 'y2', y - 30);
      line1.setAttributeNS(null, 'x2_new', midX - 30);
      line1.setAttributeNS(null, 'y2_new', y - 12);
      line1.setAttributeNS(null, 'stroke', 'black');
      line1.setAttributeNS(null, 'stroke-width', '1');
      svg.appendChild(line1);
      
      // Connect right output
      const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line2.setAttributeNS(null, 'x1', rightX);
      line2.setAttributeNS(null, 'y1', y + 30);
      line2.setAttributeNS(null, 'x2', midX - 30);
      line2.setAttributeNS(null, 'y2', y + 30);
      line2.setAttributeNS(null, 'x2_new', midX - 30);
      line2.setAttributeNS(null, 'y2_new', y + 12);
      line2.setAttributeNS(null, 'stroke', 'black');
      line2.setAttributeNS(null, 'stroke-width', '1');
      svg.appendChild(line2);
      
      this.drawAndGate(svg, midX, y);
      return midX + 100;
    }

    if (ast.type === 'OR') {
      const leftX = this.renderGateTree(svg, ast.left, x, y - 30, variables);
      const rightX = this.renderGateTree(svg, ast.right, x, y + 30, variables);
      const midX = Math.max(leftX, rightX) + 30;
      
      // Connect left output
      const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line1.setAttributeNS(null, 'x1', leftX);
      line1.setAttributeNS(null, 'y1', y - 30);
      line1.setAttributeNS(null, 'x2', midX - 30);
      line1.setAttributeNS(null, 'y2', y - 30);
      line1.setAttributeNS(null, 'x2_new', midX - 35);
      line1.setAttributeNS(null, 'y2_new', y - 12);
      line1.setAttributeNS(null, 'stroke', 'black');
      line1.setAttributeNS(null, 'stroke-width', '1');
      svg.appendChild(line1);
      
      // Connect right output
      const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line2.setAttributeNS(null, 'x1', rightX);
      line2.setAttributeNS(null, 'y1', y + 30);
      line2.setAttributeNS(null, 'x2', midX - 30);
      line2.setAttributeNS(null, 'y2', y + 30);
      line2.setAttributeNS(null, 'x2_new', midX - 35);
      line2.setAttributeNS(null, 'y2_new', y + 12);
      line2.setAttributeNS(null, 'stroke', 'black');
      line2.setAttributeNS(null, 'stroke-width', '1');
      svg.appendChild(line2);
      
      this.drawOrGate(svg, midX, y);
      return midX + 100;
    }

    return x;
  }

  /**
   * Render CMOS implementation
   */
  renderCMOSGates(svg, ast, variables) {
    // Clear SVG
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    svg.setAttributeNS(null, 'viewBox', '0 0 800 400');

    // Add background
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttributeNS(null, 'width', '800');
    bg.setAttributeNS(null, 'height', '400');
    bg.setAttributeNS(null, 'fill', '#fafafa');
    bg.setAttributeNS(null, 'stroke', '#ddd');
    bg.setAttributeNS(null, 'stroke-width', '1');
    svg.appendChild(bg);

    // Title
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    title.setAttributeNS(null, 'x', '400');
    title.setAttributeNS(null, 'y', '30');
    title.setAttributeNS(null, 'font-size', '16');
    title.setAttributeNS(null, 'font-weight', 'bold');
    title.setAttributeNS(null, 'text-anchor', 'middle');
    title.textContent = 'CMOS Implementation Structure';
    svg.appendChild(title);

    // Draw power supply labels
    const vddLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    vddLabel.setAttributeNS(null, 'x', '80');
    vddLabel.setAttributeNS(null, 'y', '80');
    vddLabel.setAttributeNS(null, 'font-size', '12');
    vddLabel.setAttributeNS(null, 'font-weight', 'bold');
    vddLabel.textContent = 'VDD (Pull-up)';
    svg.appendChild(vddLabel);

    const gndLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    gndLabel.setAttributeNS(null, 'x', '80');
    gndLabel.setAttributeNS(null, 'y', '350');
    gndLabel.setAttributeNS(null, 'font-size', '12');
    gndLabel.setAttributeNS(null, 'font-weight', 'bold');
    gndLabel.textContent = 'GND (Pull-down)';
    svg.appendChild(gndLabel);

    // Draw simplified CMOS structure
    const xStart = 200;
    
    // PMOS (pull-up) - top
    this.drawCMOSPair(svg, xStart, 120, 'pmos', 'P');
    
    // NMOS (pull-down) - bottom
    this.drawCMOSPair(svg, xStart, 280, 'nmos', 'N');

    // Output line in middle
    const output = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    output.setAttributeNS(null, 'cx', xStart + 15);
    output.setAttributeNS(null, 'cy', '200');
    output.setAttributeNS(null, 'r', '5');
    output.setAttributeNS(null, 'fill', '#ff9800');
    svg.appendChild(output);

    const outLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    outLabel.setAttributeNS(null, 'x', xStart + 40);
    outLabel.setAttributeNS(null, 'y', '205');
    outLabel.setAttributeNS(null, 'font-size', '12');
    outLabel.textContent = 'Output';
    svg.appendChild(outLabel);

    // Add info box
    const infoBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    infoBox.setAttributeNS(null, 'x', '450');
    infoBox.setAttributeNS(null, 'y', '80');
    infoBox.setAttributeNS(null, 'width', '300');
    infoBox.setAttributeNS(null, 'height', '280');
    infoBox.setAttributeNS(null, 'fill', '#e8f5e9');
    infoBox.setAttributeNS(null, 'stroke', '#4caf50');
    infoBox.setAttributeNS(null, 'stroke-width', '1');
    svg.appendChild(infoBox);

    const infoTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    infoTitle.setAttributeNS(null, 'x', '600');
    infoTitle.setAttributeNS(null, 'y', '105');
    infoTitle.setAttributeNS(null, 'font-size', '13');
    infoTitle.setAttributeNS(null, 'font-weight', 'bold');
    infoTitle.setAttributeNS(null, 'text-anchor', 'middle');
    infoTitle.textContent = 'CMOS Characteristics';
    svg.appendChild(infoTitle);

    const infos = [
      '• PMOS: Pull-up network (logic 1)',
      '• NMOS: Pull-down network (logic 0)',
      '• Complementary logic',
      '• Low power consumption',
      '• High noise immunity',
      '• Static CMOS: Always one active'
    ];

    infos.forEach((info, i) => {
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttributeNS(null, 'x', '470');
      text.setAttributeNS(null, 'y', 135 + i * 25);
      text.setAttributeNS(null, 'font-size', '11');
      text.textContent = info;
      svg.appendChild(text);
    });
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GateVisualizer };
}
