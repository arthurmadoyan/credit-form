import { Box, Slider, Typography } from '@mui/material';

import { FormWrapper } from '../../shared/ui/FormWrapper/FormWrapper';
import { calculateAmount, calculateTerm, validateFields } from '../../shared/utils/helpers';
import { useUserDataStore } from '../../entities/userData/model';
import { userModel } from '../../entities/userData';
import styles from './CreditParametersPage.module.scss';

export default function CreditParametersPage() {
  const { loanAmount, loanTerm } = useUserDataStore(userModel.userDataSelector);
  const errors = useUserDataStore(userModel.userErrorsSelector);

  const handleChangeAmount = (_event: Event, newValue: number) => {
    userModel.setData({ loanAmount: newValue });
  };

  const handleChangeTerm = (_event: Event, newValue: number) => {
    userModel.setData({ loanTerm: newValue });
  };

  return (
    <FormWrapper title="Параметры займа" onNext={() => validateFields([loanAmount, loanTerm])}>
      <Box sx={{ width: 250 }}>
        <Typography id="non-linear-slider" gutterBottom sx={{ color: 'black' }}>
          Сумма займа: ${calculateAmount(loanAmount ?? 0)}
        </Typography>
        <Slider value={loanAmount ?? 0} min={2} step={1} max={10} onChange={handleChangeAmount} />
        <Typography id="non-linear-slider" gutterBottom sx={{ color: 'black' }}>
          Срок займа: {calculateTerm(loanTerm ?? 0)} дней
        </Typography>
        <Slider
          value={loanTerm ?? 0}
          min={1}
          step={1}
          max={30}
          onChange={handleChangeTerm}
          valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
        />
      </Box>
      {errors && <span className={styles.errors}>{errors}</span>}
    </FormWrapper>
  );
}
