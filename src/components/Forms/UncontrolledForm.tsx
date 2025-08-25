import { useRef } from 'react';
import type { ModalFormData } from '../../types/types';
interface Props {
  onSubmit?: (data: ModalFormData) => void;
}

export default function UncontrolledForm({ onSubmit }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const data: ModalFormData = {
      id: crypto.randomUUID(),
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      age: Number((form.elements.namedItem('age') as HTMLInputElement).value),
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
      gender: (form.elements.namedItem('gender') as HTMLSelectElement).value,
      country: (form.elements.namedItem('country') as HTMLInputElement).value,
      acceptTerms: (form.elements.namedItem('acceptTerms') as HTMLInputElement)
        .checked,
      pictureBase64: '',
    };

    onSubmit?.(data);
  };

  return (
    <form
      className="form"
      ref={formRef}
      onSubmit={handleSubmit}
      data-testid="uncontrolled-form"
      aria-label="Uncontrolled Form"
    >
      <h2>Uncontrolled Form</h2>

      <label>
        Name:
        <input name="name" type="text" required />
      </label>
      <label>
        Age:
        <input name="age" type="number" required />
      </label>
      <label>
        Email:
        <input name="email" type="email" required />
      </label>
      <label>
        Password:
        <input name="password" type="password" required />
      </label>
      <label>
        Gender:
        <select name="gender" required>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <label>
        Country:
        <input name="country" type="text" required />
      </label>
      <label>
        Accept Terms:
        <input name="acceptTerms" type="checkbox" />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}
