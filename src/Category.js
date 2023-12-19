import React, { useState } from 'react';
import Categories from './CategoryDef';
import AddNewCategory from './CategoryForm';
import Category from './CategoryClass';
import {_pastelColors, assignBackgroundColor} from "./CategoryDef";

var cats = []

const CategoryPage = () => {
    const [categories, setCategories] = useState(['Category 1']);

    for(let i = 0; i < categories.length; i++)
    {
        cats[i] = new Category(categories[i], _pastelColors[i%_pastelColors.length])
    }

    console.log(cats)

    const addCategory = (newCategory) => {
        setCategories([...categories, newCategory]);
    };

    const deleteCategory = (index) => {
        const updatedCategories = categories.filter((_, idx) => idx !== index);
        setCategories(updatedCategories);
    };

    return (
        <div className="categories">
            <Categories categories={categories} onDelete={deleteCategory} />
            <AddNewCategory addCategory={addCategory} />
        </div>
    );
};

export var cats;
export default CategoryPage;
