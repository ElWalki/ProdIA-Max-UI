import React from 'react';

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
}

export default function SelectField({ label, value, onChange, options, disabled }: SelectFieldProps) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-xs text-surface-500 w-24 flex-shrink-0">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        className="flex-1 bg-surface-100 border border-surface-300 rounded-lg px-2 py-1.5 text-xs text-surface-900 focus:ring-1 focus:ring-accent-500"
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
