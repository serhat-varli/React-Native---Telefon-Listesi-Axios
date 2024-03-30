import axios from 'axios';
const Repostory = async (params: any) => {
  let url = `https://randomuser.me/api/?results=${params.size}&page${params.page}`;
  let {
    data: {results: resultsData},
  } = await axios.get(url);
  const response = resultsData;
  return response;
};
export default Repostory;
