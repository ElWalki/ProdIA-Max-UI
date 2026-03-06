import React, { useState } from 'react';

interface SliderFieldProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  disabled?: boolean;
}

export default function SliderField({ label, value, onChange, min, max, step = 1, suffix, disabled }: SliderFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');

  const handleDoubleClick = () => {
    setEditValue(String(value));
    setIsEditing(true);
  };

  const commitEdit = () => {
    const parsed = parseFloat(editValue);
    if (!isNaN(parsed)) {
      onChange(Math.max(min, Math.min(max, parsed)));
    }
    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-3">
      <label className="text-xs text-surface-500 w-24 flex-shrink-0">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        disabled={disabled}
        className="flex-1 h-1"
      />
      {isEditing ? (
        <input
          type="number"
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={e => e.key === 'Enter' && commitEdit()}
          className="w-16 text-xs text-right bg-surface-200 border border-surface-300 rounded px-1 py-0.5 text-surface-900"
          autoFocus
        />
      ) : (
        <span
          onDoubleClick={handleDoubleClick}
          className="w-16 text-xs text-right text-surface-700 cursor-pointer tabular-nums"
          title="Double-click to edit"
        >
          {step < 1 ? value.toFixed(2) : value}{suffix || ''}
        </span>
      )}
    </div>
  );
}
