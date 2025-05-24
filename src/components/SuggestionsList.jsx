import React from 'react';

const SuggestionsList = ({ suggestions }) => (
  <div className="suggestions">
    <h3>Optimization Suggestions:</h3>
    {suggestions.missingKeywords?.length > 0 && (
      <div>
        <h4>Add Keywords:</h4>
        <ul>
          {suggestions.missingKeywords.map((word, i) => (
            <li key={i}>{word}</li>
          ))}
        </ul>
      </div>
    )}
    {suggestions.missingSections?.length > 0 && (
      <div>
        <h4>Missing Sections:</h4>
        <ul>
          {suggestions.missingSections.map((section, i) => (
            <li key={i}>{section.charAt(0).toUpperCase() + section.slice(1)}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export default SuggestionsList;