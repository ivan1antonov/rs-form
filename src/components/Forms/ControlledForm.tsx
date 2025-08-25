import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
export interface Props {
  onSubmit: (data: FormValues) => void;
}
export type FormValues = z.infer<typeof schema>;

interface IOnSubmit {
  onSubmit: (data: FormValues) => void;
}

export const schema = z.object({
  name: z.string().min(1),
  age: z.number().min(0),
  email: z.string().email(),
  password: z.string().min(6),
  gender: z.string().min(1),
  country: z.string().min(1),
  acceptTerms: z.boolean(),
  pictureBase64: z.string().optional(),
});

export default function ControlledForm({ onSubmit }: IOnSubmit) {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  return (
    <form className="form" role="form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Controlled Form</h2>

      <label>
        Name: <input {...register('name')} />
      </label>

      <label>
        Age:{' '}
        <input type="number" {...register('age', { valueAsNumber: true })} />
      </label>

      <label>
        Email: <input type="email" {...register('email')} />
      </label>

      <label>
        Password: <input type="password" {...register('password')} />
      </label>

      <label>
        Gender:
        <select {...register('gender')}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>

      <label>
        Country: <input {...register('country')} />
      </label>

      <label>
        Accept Terms: <input type="checkbox" {...register('acceptTerms')} />
      </label>

      <button type="submit" disabled={!formState.isValid}>
        Submit
      </button>
    </form>
  );
}
