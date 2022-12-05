import React from 'react';
import Select from 'react-select'
import chroma from 'chroma-js'
import './Select.css'


const colourOptions = [
    { value: 'ocean',  color: '#00B8D9', isFixed: true },
    { value: 'blue', color: '#0052CC' },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
];

const dot = (color = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',

    ':before': {
        backgroundColor: color,
        borderRadius: 10,
        content: '" "',
        display: 'block',
        marginRight: 8,
        height: 10,
        width: 10,
    },
});

const colourStyles = {
    container: (styles) => ({...styles ,maxWidth: '520px', width: '100%', fontSize:'14px'}),
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    menu: (styles) => ({ ...styles, backgroundColor: '#f3f3f3' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = chroma(data.color);
        return {
            ...styles,
            ...dot(data.color),
            backgroundColor: isDisabled
                ? undefined
                : isSelected
                    ? data.color
                    : isFocused
                        ? color.alpha(0.1).css()
                        : undefined,
            color: isDisabled
                ? '#ccc'
                : isSelected
                    ? chroma.contrast(color, 'white') > 2
                        ? 'white'
                        : 'black'
                    : data.color,
            cursor: isDisabled ? 'not-allowed' : 'default',

            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled
                    ? isSelected
                        ? data.color
                        : color.alpha(0.3).css()
                    : undefined,
            },
        };
    },
    input: (styles) => ({ ...styles, ...dot(),color:'#fff' }),
    placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};


const SelectContainer = ({isColor,colors,onChange,color}) => {
    console.log(color)
    return (
        <Select
                options={colors}
                onChange={onChange}
                value={color}
                placeholder={'Колір'}
                styles={colourStyles}
                isDisabled={isColor}/>
    );
};

export default SelectContainer;