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
          className={hasError ? 'error' : ''}
        >
          {options.map((opt) => (
            <option key={String(opt.value)} value={opt.value}>
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


