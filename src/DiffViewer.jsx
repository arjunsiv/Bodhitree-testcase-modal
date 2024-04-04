import React from 'react';
import { diffChars, diffWords, diffWordsWithSpace } from 'diff';
import './DiffViewer.css'; // Import CSS for styling

// DiffViewer.jsx

// Import statements remain unchanged

const DiffViewer = ({ data }) => {
  const expectedOutput = '2 300';

  // Compute the difference between student output and expected output
  const differences = diffChars(expectedOutput, data);

  console.log({ differences });
  // Generate the UI for displaying the differences along with line numbers
  const renderDiff = () => {
    let lineNumber = 1; // Initialize line number
    let currentLine = []; // Array to hold parts of the current line

    differences.forEach((part, index) => {
      const style = {
        color: 'black',
        backgroundColor: part.added
          ? '#ffe6e6'
          : part.removed
          ? '#b3d9ff'
          : '#e6ffee',
        textDecoration: part.added
          ? 'line-through'
          : part.removed
          ? 'underline'
          : 'none',
        whiteSpace: 'pre-wrap',
      };

      // Split the part.value by newline characters
      if (!part.value.includes('\n')) {
        if (!currentLine[lineNumber]) {
          currentLine[lineNumber] = [];
        }
        currentLine[lineNumber].push(
          <code key={`part-${index}`} style={style}>
            {part.value}
          </code>
        );
      } else {
        const splittedLines = part.value.split('\n');
        console.log(part.value + ' : ' + splittedLines);
        splittedLines.forEach((line, idx) => {
          if (idx != 0) lineNumber++;
          if (!currentLine[lineNumber]) {
            currentLine[lineNumber] = [];
          }
          currentLine[lineNumber].push(
            <code key={`part-${index}-${idx}`} style={style}>
              {line == '' ? ' ' : line}
            </code>
          );
        });
      }
    });
    // Render the accumulated currentLine array
    return currentLine.map((lineContent, idx) => (
      <div key={`line-${idx + 1}`} className="line-container output">
        <div className="line-number">{idx}</div>
        <div className="line-content">{lineContent}</div>
      </div>
    ));
  };

  return (
    <div>
      <div>
        <h2>Testcase Result</h2>
        <Legend />
      </div>
      <div>
        <h3>Expected Output</h3>
        <pre className="code">
          <code>{expectedOutput}</code>
        </pre>
      </div>
      <div>
        <h3>Student Output</h3>
        <div className="code">{renderDiff()}</div>
      </div>
    </div>
  );
};

// Legend and export statements remain unchanged
const Legend = () => (
  <div className="legend-container">
    <h3>Legend</h3>
    <table className="legend-table">
      <tbody>
        <tr>
          <td className="matched-cell">Match</td>
          <td>Found in both expected and student output</td>
        </tr>
        <tr>
          <td className="extra-cell">Extra</td>
          <td>Only in student output</td>
        </tr>
        <tr>
          <td className="remaining-cell">Missing</td>
          <td>Only in expected output</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default DiffViewer;
