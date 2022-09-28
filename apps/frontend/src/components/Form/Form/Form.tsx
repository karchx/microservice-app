import React from 'react';

type FormProps = {
  children: React.ReactNode;
} & JSX.IntrinsicElements['form'];

export const Form = ({ children, ...restProps }: FormProps) => (
  <form {...restProps}>
    <fieldset>{children}</fieldset>
  </form>
);
