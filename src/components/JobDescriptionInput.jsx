import React from 'react';

const JobDescriptionInput = ({ value, onChange }) => (
  <div className="input-group">
    <label>
      Paste Job Description (for keyword matching):
      <textarea 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., 'Looking for a React developer with 5+ years of experience...'"
        rows={5}
      />
    </label>
  </div>
);

export default JobDescriptionInput;