import './category.styles.scss';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import { useSelector } from 'react-redux';
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector';
import Spinner from '../../components/spinner/spinner.component';

const Category = () => {
    console.log('[Category Component] render/re-rendering category component');
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        console.log('[Category Component] effect fired calling setProducts');
        setProducts(categoriesMap[category]);
    }, [categoriesMap, category]);

    console.log('[Category Component] spinner test is loading :', isLoading);

    return (
        <Fragment>
            <h2 className='category-title'>{category}</h2>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className="category-container">
                    {products &&
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                </div>
            )}
        </Fragment>
    );
};

export default Category;
