import { useState } from 'react';
import Modal from '../components/Modal/Modal';
import UncontrolledForm from '../components/Forms/UncontrolledForm';
import ControlledForm from '../components/Forms/ControlledForm';
import type { FormValues } from '../components/Forms/ControlledForm';

type IModalType = null | 'form1' | 'form2';
import type { ModalFormData } from '../types/types';

export default function MainPage() {
  const [modalType, setModalType] = useState<IModalType>(null);

  const handleFormSubmit = (data: FormValues) => {
    const dataWithId: ModalFormData = { ...data, id: crypto.randomUUID() };
    console.log(dataWithId);
    setModalType(null);
  };

  return (
    <div>
      <h1>Main Page</h1>
      <button onClick={() => setModalType('form1')}>
        Open Uncontrolled Form
      </button>
      <button onClick={() => setModalType('form2')}>
        Open React Hook Form
      </button>
      {modalType && (
        <Modal onClose={() => setModalType(null)}>
          {modalType === 'form1' ? (
            <UncontrolledForm onSubmit={handleFormSubmit} />
          ) : (
            <ControlledForm onSubmit={handleFormSubmit} />
          )}
        </Modal>
      )}
    </div>
  );
}
