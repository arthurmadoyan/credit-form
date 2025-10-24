import { apiBase } from '../../../shared/api/instances';
import { Statuses } from '../../../shared/config/consts';
import { useJobDataStore, type State } from './useJobDataStore';

export const getJobs = async (): Promise<void> => {
  useJobDataStore.setState((state: State) => {
    state.status = Statuses.PENDING;
  });
  try {
    const response = await apiBase.get('/products/categories');
    if (response?.data) {
      useJobDataStore.setState((state: State) => {
        state.data = response.data;
        state.status = Statuses.SUCCESS;
      });
    }
  } catch (err) {
    useJobDataStore.setState((state: State) => {
      state.status = Statuses.FAILED;
      state.error = (err as Error).message;
    });
  }
};

export const sendRequest = async ({ title }: { title: string }): Promise<void> => {
  useJobDataStore.setState((state: State) => {
    state.status = Statuses.PENDING;
  });

  try {
    const { status } = await apiBase.post('/products/add', {
      title,
    });

    if (status >= 200 || status < 300) {
      useJobDataStore.setState((state: State) => {
        state.status = Statuses.SUCCESS;
      });
    }
  } catch (err) {
    useJobDataStore.setState((state: State) => {
      state.status = Statuses.FAILED;
      state.error = (err as Error).message;
    });
  }
};
