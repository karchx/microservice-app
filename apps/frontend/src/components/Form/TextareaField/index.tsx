import { Textarea } from '../../designSystem/Textarea';

type PropsTextarea = React.ComponentPropsWithRef<typeof Textarea>;

export const TextareaField = (props: PropsTextarea) => (
  <fieldset>
    <Textarea {...props} />
  </fieldset>
);
