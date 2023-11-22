import React, { useState } from 'react';
import Categories from './CategoryDef';
import AddNewCategory from './CategoryForm';

const CategoryPage = () => {
    const [categories, setCategories] = useState(['Category 1']);

    const addCategory = (newCategory) => {
        setCategories([...categories, newCategory]);
    };

    return (
        <div className= "categories">
            <Categories categories={categories} />
            <AddNewCategory addCategory={addCategory} />
        </div>
    );
};

export default CategoryPage;
