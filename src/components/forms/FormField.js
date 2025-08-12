import React from 'react';
import { useFormContext } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';

function FormField({
  name,
  label,
  type = 'text',
  id,
  placeholder,
  options = [],
  disabled = false,
  rules,
  wrapperClassName = '',
  inputProps = {},
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldId = id || name;
  const hasError = Boolean(errors[name]);

  return (
    <div className={`form-group ${wrapperClassName}`.trim()}>
      {label && <label htmlFor={fieldId}>{label}</label>}

      {type === 'select' ? (
        <select
          id={fieldId}
          {...register(name, rules)}
          disabled={disabled}
          className={`form-select ${hasError ? 'error' : ''}`}
          style={{
            color: '#1E293B',
            backgroundColor: 'white',
            fontWeight: '500',
            border: '2px solid #CBD5E1',
            borderRadius: '12px',
            padding: '14px 16px',
            fontSize: '1rem',
            minHeight: '50px',
            position: 'relative',
            zIndex: 10
          }}
        >
          {options.map((opt) => (
            <option 
              key={String(opt.value)} 
              value={opt.value}
              style={{
                backgroundColor: 'white',
                color: '#1E293B',
                fontWeight: '500',
                padding: '12px 16px',
                fontSize: '1rem',
                border: 'none',
                outline: 'none',
                minHeight: '40px'
              }}
            >
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === 'checkbox' ? (
        <input
          type="checkbox"
          id={fieldId}
          {...register(name, rules)}
          disabled={disabled}
          className={hasError ? 'error' : ''}
          {...inputProps}
        />
      ) : (
        <input
          type={type}
          id={fieldId}
          placeholder={placeholder}
          {...register(name, rules)}
          disabled={disabled}
          className={hasError ? 'error' : ''}
          {...inputProps}
        />
      )}

      {hasError && (
        <span className="error-message">
          <AlertCircle size={16} />
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
}

export default FormField;


