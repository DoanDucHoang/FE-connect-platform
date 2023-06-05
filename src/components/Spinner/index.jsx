import { Spin } from 'antd';

const Spinner = isLoading => {
  // console.log('🚀 ~ file: index.jsx:4 ~ Spinner ~ isLoading:', isLoading);

  return (
    <div>
      {!isLoading && (
        <div className="loading">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default Spinner;
