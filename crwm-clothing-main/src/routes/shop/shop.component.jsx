import { useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import './shop.styles.scss'
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesStart } from '../../store/categories/category.action';
import { useDispatch } from 'react-redux';
const Shop = () =>{

    const dispatch = useDispatch()
    useEffect(() =>{
      dispatch(fetchCategoriesStart())
    },[])

    return(
      <Routes>
        <Route index element={<CategoriesPreview/>}></Route>
        <Route path=":category" element={<Category/>}></Route>
      </Routes>
      
    )
}

export default Shop