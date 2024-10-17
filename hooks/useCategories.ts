import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchCategories = async () => {
  const { data } = await axios.get('/api/categories');
  return data;
};

export const useCategories = () => {
  return useQuery({queryKey:['categories'],queryFn:()=> fetchCategories()});
};
