import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from '@mui/material';
import { FormWrapper } from '../../shared/ui/FormWrapper/FormWrapper';
import { SEX } from '../../shared/config/consts';
import { formatPhone, validateFields } from '../../shared/utils/helpers';
import { useUserDataStore } from '../../entities/userData/model';
import { userModel } from '../../entities/userData';
import styles from './PersonalDataPage.module.scss';

export default function PersonalFormPage() {
  const { firstName, lastName, phone, sex } = useUserDataStore(userModel.userDataSelector);
  const errors = useUserDataStore(userModel.userErrorsSelector);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    const inputData = name === 'phone' ? formatPhone(value) : value;
    userModel.setData({ [name]: inputData });
  };
  const handleChangeSex = (e: SelectChangeEvent<string | null>): void => {
    let selectedValue = e?.target?.value;
    userModel.setData({ sex: selectedValue as 'мужской' | 'женский' });
  };

  return (
    <FormWrapper
      title="Личные данные"
      onNext={() => validateFields([firstName, lastName, phone, sex])}
    >
      <div onChange={handleChange} className={styles.inputs}>
        <TextField
          label="Имя"
          type="text"
          variant="standard"
          required={true}
          name="firstName"
          value={firstName}
        />
        <TextField
          label="Фамилия"
          type="text"
          variant="standard"
          required={true}
          name="lastName"
          value={lastName}
        />
        <TextField
          label="Телефон"
          type="tel"
          variant="standard"
          required={true}
          value={phone}
          name="phone"
          placeholder="0XXX XXX XXX"
        />
      </div>
      <FormControl sx={{ m: 1, minWidth: 120, margin: '0px' }} size="small" required={true}>
        <InputLabel id="demo-select-small-label">Пол</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          label="Age"
          name="sex"
          value={sex}
          onChange={handleChangeSex}
        >
          {SEX.map((val) => (
            <MenuItem key={val} value={val}>
              {val}
            </MenuItem>
          ))}
        </Select>
        {errors && <span className={styles.errors}>{errors}</span>}
      </FormControl>
    </FormWrapper>
  );
}
