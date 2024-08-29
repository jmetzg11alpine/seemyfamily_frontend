import { addValue } from '../dataSlice';
import { useSelector, useDispatch } from 'react-redux';

const Info = () => {
  const value = useSelector((state) => state.data.value);
  const dispatch = useDispatch();
  return (
    <div>
      <div>{value}</div>
      <button onClick={() => dispatch(addValue())}>+</button>
    </div>
  );
};
export default Info;
