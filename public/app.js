/**
 * Main Application Logic
 * Handles user interaction and coordinates parsing, visualization, and table generation
 */

document.addEventListener('DOMContentLoaded', () => {
  const expressionInput = document.getElementById('expressionInput');
  const visualizeBtn = document.getElementById('visualizeBtn');
  const errorMessage = document.getElementById('errorMessage');
  const resultsDiv = document.getElementById('results');
  const truthTableContainer = document.getElementById('truthTableContainer');
  const copyTableBtn = document.getElementById('copyTableBtn');
  const copyHTMLBtn = document.getElementById('copyHTMLBtn');

  let currentAST = null;
  let currentVariables = [];
  let currentTruthTable = [];

  // Event listeners
  visualizeBtn.addEventListener('click', handleVisualize);
  expressionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleVisualize();
    }
  });
  copyTableBtn.addEventListener('click', copyTableAsText);
  copyHTMLBtn.addEventListener('click', copyTableAsHTML);

  async function handleVisualize() {
    const expression = expressionInput.value.trim();
    
    if (!expression) {
      showError('Please enter a boolean expression');
      return;
    }

    try {
      clearError();
      
      // Parse the expression
      const parser = new BooleanParser(expression);
      const { ast, variables } = parser.parse();
      
      currentAST = ast;
      currentVariables = variables;
      
      // Generate truth table
      currentTruthTable = generateTruthTable(ast, variables);
      
      // Render visualizations
      const visualizer = new GateVisualizer();
      const blockGatesSVG = document.getElementById('blockGatesSVG');
      const cmosSVG = document.getElementById('cmosSVG');
      
      visualizer.renderBlockGates(blockGatesSVG, ast, variables);
      visualizer.renderCMOSGates(cmosSVG, ast, variables);
      
      // Generate truth table HTML
      renderTruthTable(variables, currentTruthTable);
      
      // Show results
      resultsDiv.classList.remove('results-hidden');
      resultsDiv.classList.add('results-visible');
      
      // Scroll to results
      setTimeout(() => {
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      
    } catch (error) {
      showError(error.message);
      resultsDiv.classList.remove('results-visible');
      resultsDiv.classList.add('results-hidden');
    }
  }

  function renderTruthTable(variables, truthTable) {
    const table = document.getElementById('truthTable');
    table.innerHTML = '';

    // Create header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    variables.forEach(v => {
      const th = document.createElement('th');
      th.textContent = v;
      headerRow.appendChild(th);
    });
    
    const outputTh = document.createElement('th');
    outputTh.textContent = 'Output';
    headerRow.appendChild(outputTh);
    
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create body
    const tbody = document.createElement('tbody');
    truthTable.forEach((row, index) => {
      const tr = document.createElement('tr');
      
      variables.forEach(v => {
        const td = document.createElement('td');
        td.textContent = row.values[v];
        td.className = 'table-cell';
        tr.appendChild(td);
      });
      
      const outputTd = document.createElement('td');
      outputTd.textContent = row.result;
      outputTd.className = 'table-cell output-cell';
      if (row.result === 1) {
        outputTd.classList.add('output-true');
      }
      tr.appendChild(outputTd);
      
      tbody.appendChild(tr);
    });
    
    table.appendChild(tbody);
  }

  function copyTableAsText() {
    const table = document.getElementById('truthTable');
    let text = '';
    
    // Get all rows
    const rows = table.querySelectorAll('tr');
    rows.forEach(row => {
      const cells = row.querySelectorAll('th, td');
      const rowText = Array.from(cells).map(cell => cell.textContent).join('\t');
      text += rowText + '\n';
    });

    copyToClipboard(text, 'Table copied as text!');
  }

  function copyTableAsHTML() {
    const table = document.getElementById('truthTable');
    const html = table.outerHTML;
    
    // Create a styled HTML version
    const styledHTML = `
<html>
<head>
  <style>
    table {
      border-collapse: collapse;
      font-family: Arial, sans-serif;
      margin: 10px 0;
    }
    th, td {
      border: 1px solid #999;
      padding: 8px;
      text-align: center;
    }
    th {
      background-color: #4CAF50;
      color: white;
      font-weight: bold;
    }
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    .output-true {
      background-color: #c8e6c9;
      font-weight: bold;
    }
  </style>
</head>
<body>
  ${html}
</body>
</html>
    `;

    // For clipboard, copy as plain HTML
    copyToClipboard(html, 'Table copied as HTML!');
  }

  function copyToClipboard(text, successMessage) {
    navigator.clipboard.writeText(text).then(() => {
      // Show success message
      const originalText = copyTableBtn.textContent;
      copyTableBtn.textContent = successMessage;
      setTimeout(() => {
        copyTableBtn.textContent = originalText;
      }, 2000);
    }).catch(err => {
      showError('Failed to copy to clipboard');
      console.error('Clipboard error:', err);
    });
  }

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
  }

  function clearError() {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
  }

  // Example expressions for testing
  console.log('Boolean Algebra Visualizer loaded!');
  console.log('Example expressions:');
  console.log('  - A·B + C');
  console.log('  - (A+B)·(C+D)');
  console.log('  - A\'·B + A·B\'');
  console.log('  - AB + A\'C + BC');
});
