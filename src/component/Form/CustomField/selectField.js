import Select from 'react-select';
import PropTypes from 'prop-types';
import { useLayoutEffect, useRef, useState } from 'react';

function SelectField(prop) {
    const {form, field, title, placeholder, isMultiple, options, defaultValue, ...rest} = prop;
    const { name, value } = field;
    const {errors, touched } = form;
    const ValueSelectd = useRef(defaultValue);
    ValueSelectd.current = (value && (isMultiple ? options.filter((item) => value.includes(item.value)) : options.filter((item) => item.value === value))) || defaultValue;
    const showError = errors[name] && touched[name];
    
    
    const customStyles = {
        control: (base, state) => ({
            ...base,
            background: '#f4f7fa',
            // Overwrittes the different states of border
            borderColor: '#ced4da',
            // Removes weird border around container
            boxShadow: state.isFocused ? null : null,
            height: '42px',
            '&:hover': {
                // Overwrittes the different states of border
                borderColor: '#ced4da',
            },
            '&:focus': {
                // Overwrittes the different states of border
                color: '#495057',
                backgroundColor: '#fff',
                borderColor: '#80bdff',
                outline: 0,
                boxShadow: '0 0 0 0.2rem rgb(0 123 255 / 25%)',
            },
        }),
    };

    const handleSelectedOptionChange = (selectedOption) => {
        let selectValue;
        let changEvent;
        if(!isMultiple) {
            selectValue = selectedOption ? selectedOption.value : selectedOption;

            changEvent = {
                target: {
                    name,
                    value: selectValue
                }
            }
        } else {
            let arrID = [];
            selectedOption.forEach(item => {
                let idCurrent = item ? item.value : item;
                arrID.push(idCurrent);
            });

            changEvent = {
                target: {
                    name,
                    value: arrID
                }
            }

        }

        field.onChange(changEvent);
    }


    return (
        <div className="form-group">
            {/* <label htmlFor={name}>{title}</label> */}
            <Select
                id={name}
                name={name}
                {...field}
                value={ValueSelectd.current}
                onChange={handleSelectedOptionChange}
    
                styles={customStyles}
                placeholder={placeholder}
                isMulti={isMultiple}
                options={options}
                {...rest}
            />
            {showError && <small className="form-text text-muted">{errors[name]}</small>}
        </div>
    );
}

SelectField.prototype = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    title: PropTypes.string,
    placeholder: PropTypes.string,
    isMultiple: PropTypes.bool,
    options: PropTypes.array,
    defaultValue: PropTypes.array
}

SelectField.defaultProps = {
    title: '',
    placeholder: '',
    isMultiple: false,
    options: [],
    defaultValue: []
}


export default SelectField;
