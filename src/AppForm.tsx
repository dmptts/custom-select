import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import AppSelect from './AppSelect';
import { data } from './options';

interface IFormFields {
  codecParent: string;
}

export default function AppForm() {
  const { register, control, handleSubmit } = useForm<IFormFields>();
  const onSubmit: SubmitHandler<IFormFields> = (data) => console.log(data);

  const options = data.devices.map((extendableClass: { class: string }) => ({
    value: extendableClass.class,
    label:
      extendableClass.class.match(/[\w\d]+$/)?.[0] ?? extendableClass.class,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="codecParent"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <AppSelect {...field} options={options} />}
      />
      <button type="submit">Отправить</button>
    </form>
  );
}
