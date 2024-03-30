import {useState} from 'react';

const generalState = () => {
  const [getData, setGetData] = useState([]);
  const [updata, setUpdata] = useState([]);
  const [loader, setLoader] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const setState = {
    getData,
    setGetData,
    updata,
    setUpdata,
    loader,
    setLoader,
    refreshing,
    setRefreshing,
    page,
    setPage,
  };

  return setState;
};
export default generalState;
