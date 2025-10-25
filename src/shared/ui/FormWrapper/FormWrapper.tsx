import { useLocation, useNavigate } from 'react-router-dom';
import styles from './FormWrapper.module.scss';
import { useState, type ReactNode } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { useUserDataStore } from '../../../entities/userData/model';
import { userModel } from '../../../entities/userData';
import { calculateAmount, calculateTerm } from '../../utils/helpers';
import { jobModel } from '../../../entities/jobData';
import { useJobDataStore } from '../../../entities/jobData/model';
import { Statuses, steps } from '../../config/consts';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  boxShadow: 24,
  p: 4,
};

interface FormWrapperProps {
  title: string;
  children: ReactNode;
  onNext: () => boolean;
}

export const FormWrapper = ({ title, children, onNext }: FormWrapperProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { firstName, lastName, loanAmount, loanTerm } = useUserDataStore(
    userModel.userDataSelector,
  );
  const status = useJobDataStore(jobModel.statusSelector);

  const currentStep = steps.indexOf(location.pathname);
  const totalSteps = steps.length;
  const isLastStep = currentStep === totalSteps - 1;

  const handleBack = () => {
    if (currentStep > 0) navigate(steps[currentStep - 1]);
  };

  const handleNext = () => {
    if (onNext()) {
    } else if (currentStep < totalSteps - 1) {
      userModel.resetErrors();
      navigate(steps[currentStep + 1]);
    }
  };

  const handleSendRequest = async () => {
    await jobModel.sendRequest({ title: `${firstName} ${lastName}` });
    if (status === Statuses.SUCCESS) {
      setOpen(true);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.progress}>
          Шаг {currentStep + 1} из {totalSteps}
        </div>
      </div>

      <div className={styles.content}>{children}</div>

      <div className={`${styles.footer} ${currentStep === 0 && styles.footerOnFirstStep}`}>
        {currentStep !== 0 && (
          <button
            type="button"
            onClick={handleBack}
            className={`${styles.button} ${styles.secondary}`}
          >
            Назад
          </button>
        )}

        <button
          type="button"
          onClick={isLastStep ? handleSendRequest : handleNext}
          className={`${styles.button} ${styles.primary}`}
        >
          {isLastStep ? 'Подать заявку' : 'Далее'}
        </button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {`Поздравляем, ${lastName} ${firstName}`}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`Вам одобрена $${calculateAmount(loanAmount ?? 0)} на ${calculateTerm(loanTerm ?? 0)} дней.`}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
