import { useUserDataStore } from '../../entities/userData/model';
import type { State } from '../../entities/userData/model/useUserDataStore';

export const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '');

  const limited = digits.slice(0, 10);

  if (limited.length <= 4) return limited;
  if (limited.length <= 7) return `${limited.slice(0, 4)} ${limited.slice(4)}`;
  return `${limited.slice(0, 4)} ${limited.slice(4, 7)} ${limited.slice(7)}`;
};

export const calculateAmount = (value: number): number => {
  return 100 * value;
};

export const calculateTerm = (value: number): number => {
  return 1 * value;
};

export const validateFields = (
  fields: Record<string, string | number | undefined | null>,
): boolean => {
  const fieldsList = Object.keys(fields);

  if (
    fieldsList.some(
      (key) =>
        !fields[key] ||
        (key === 'phone' && typeof fields[key] === 'string' && fields[key].length < 12),
    )
  ) {
    useUserDataStore.setState((state: State) => ({
      ...state,
      errors: 'Заполните все поля помеченные *',
    }));
    return true;
  }
  return false;
};
