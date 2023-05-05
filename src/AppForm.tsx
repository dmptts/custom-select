import { useEffect } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AppSelect from './AppSelect';
import { data } from './options';

const validationSchema = yup.object({
  // codecName: yup.string().min(4).required(),
  codecParent: yup.string().required(),
  // codecDescription: yup.string().min(4).required(),
  lineTo: yup.string().required(),
});

interface IFormFields {
  codecParent: string;
  lineTo: string;
}

export default function AppForm() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormFields>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      codecParent: '',
      lineTo: '',
    },
  });
  const onSubmit: SubmitHandler<IFormFields> = (data) => console.log(data);

  const options = data.devices.map((extendableClass: { class: string }) => ({
    value: extendableClass.class,
    label:
      extendableClass.class.match(/[\w\d]+$/)?.[0] ?? extendableClass.class,
  }));

  const lineToOptions = [
    { value: 'cmd', label: 'cmd' },
    { value: 'thisCall', label: 'thisCall' },
  ];

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
        render={({ field: { value, onBlur, onChange } }) => (
          <AppSelect
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            options={options}
            error={errors.codecParent}
          />
        )}
      />
      <Controller
        name="lineTo"
        control={control}
        render={({ field: { value, onBlur, onChange } }) => (
          <AppSelect
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            options={lineToOptions}
            error={errors.lineTo}
            searchable
            placeholder="Не принимать"
          />
        )}
      />
      <button type="submit">Отправить</button>
    </form>
  );
}
