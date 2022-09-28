import React from 'react';
import { Input } from '../../designSystem/Input';

type InputFieldProps = React.ComponentPropsWithRef<typeof Input> & {
  children?: React.ReactNode;
};

export const InputField = ({ children, ...restProps }: InputFieldProps) => (
  <fieldset className="form-group">
    <Input {...restProps} />
    {children}
  </fieldset>
);
