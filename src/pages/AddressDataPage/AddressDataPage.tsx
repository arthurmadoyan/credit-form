import { useEffect } from 'react';
import { FormWrapper } from '../../shared/ui/FormWrapper/FormWrapper';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  type SelectChangeEvent,
} from '@mui/material';
import { jobModel } from '../../entities/jobData';
import { useJobDataStore } from '../../entities/jobData/model';
import { Statuses } from '../../shared/config/consts';
import { useUserDataStore } from '../../entities/userData/model';
import { userModel } from '../../entities/userData';
import { validateFields } from '../../shared/utils/helpers';
import styles from './AddressDataPage.module.scss';

export default function AddressDataPage() {
  const jobs = useJobDataStore(jobModel.jobsSelectors);
  const status = useJobDataStore(jobModel.statusSelector);
  const error = useJobDataStore(jobModel.errorSelector);
  const { job, address } = useUserDataStore(userModel.userDataSelector);
  const errors = useUserDataStore(userModel.userErrorsSelector);

  useEffect(() => {
    if (jobs.length === 0) {
      (async () => {
        await jobModel.getJobs();
      })();
    }
  }, []);

  const handleChangeJob = (e: SelectChangeEvent<string | null>): void => {
    let selectedValue = e.target.value;
    userModel.setData({ job: selectedValue });
  };

  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputData = e?.target?.value;
    userModel.setData({ address: inputData });
  };

  return (
    <FormWrapper title="Адрес и место работы" onNext={() => validateFields({ job, address })}>
      {error && <div className="alert alert-danger">{error}</div>}

      {status === Statuses.PENDING ? (
        <>
          <Skeleton variant="text" sx={{ height: '60px' }} />
          <Skeleton variant="text" sx={{ height: '60px' }} />
        </>
      ) : (
        <>
          <FormControl sx={{ m: 1, minWidth: 120, margin: '0px' }} size="small" required={true}>
            <InputLabel id="demo-select-small-label">Место работы</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Age"
              name="job"
              value={job}
              onChange={handleChangeJob}
            >
              {jobs.map((job) => (
                <MenuItem key={job.name} value={job.name}>
                  {job.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Адрес проживания"
            type="text"
            variant="standard"
            required={true}
            name="address"
            value={address}
            onChange={handleChangeAddress}
          />
          {errors && <span className={styles.errors}>{errors}</span>}
        </>
      )}
    </FormWrapper>
  );
}
