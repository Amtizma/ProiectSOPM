import React from 'react';

const Categories = ({ categories, onDelete}) => {
    const pastelColors = ['#FFDDC1', '#B5EAD7', '#FFC3A0', '#B8F2E6', '#FFAAA7', '#D8E2DC', '#F4A261', '#2A9D8F', '#E9C46A', '#264653'];

    const assignBackgroundColor = (index) => {
        return {
            backgroundColor: pastelColors[index % pastelColors.length]
        };
    };
    return (
        <div>
            <h2>Categories</h2>
            <ul>
                {categories.map((category, index) => (
                    <li key={index} style={assignBackgroundColor(index)}>{category}
                        <button onClick={() => onDelete(index)} style={assignBackgroundColor(index)} className='delete-category-button'>x</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
