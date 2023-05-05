import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import AppSelect from './AppSelect';
import { data } from './options';
import { useEffect } from 'react';

interface IFormFields {
  codecParent: string;
}

export default function AppForm() {
  const { control, handleSubmit, watch } = useForm<IFormFields>();
  const onSubmit: SubmitHandler<IFormFields> = (data) => console.log(data);

  const options = data.devices.map((extendableClass: { class: string }) => ({
    value: extendableClass.class,
    label:
      extendableClass.class.match(/[\w\d]+$/)?.[0] ?? extendableClass.class,
  }));

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="codecParent"
        control={control}
        rules={{ required: true }}
        render={({ field: { onBlur, onChange }, fieldState: { error } }) => (
          <AppSelect
            onBlur={onBlur}
            onChange={onChange}
            options={options}
            error={error}
          />
        )}
      />
      <button type="submit">Отправить</button>
    </form>
  );
}
