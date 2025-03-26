import './Category.scss';

const Category = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <div className='category-container'>
      <div
        className='background-image'
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className='category-body-container'>
        <h2>{title.toLowerCase()}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default Category;