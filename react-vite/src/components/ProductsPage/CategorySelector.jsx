import { useSelector } from 'react-redux';
import * as categoryActions from '../../redux/categories';
import './CategorySelector.css'

const CategorySelector = ({ onChange }) => {
  const categories = useSelector(categoryActions.selectCategories);

  return (
    <select onChange={onChange} className='category-selector'>
      <option value="all">All Categories</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default CategorySelector;
