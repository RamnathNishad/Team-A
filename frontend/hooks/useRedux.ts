import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  return {
    ...auth,
    dispatch,
  };
};

export const useCustomer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const customer = useSelector((state: RootState) => state.customer);

  return {
    ...customer,
    dispatch,
  };
};

export const useApplication = () => {
  const dispatch = useDispatch<AppDispatch>();
  const application = useSelector((state: RootState) => state.application);

  return {
    ...application,
    dispatch,
  };
};
