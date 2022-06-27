import React from 'react';

export const BtnComponent = (props) => {
    let btn_component, class_name, exec_func;
    btn_component  = props.btn_component;
    class_name  = props.class_name;
    exec_func = props.exec_func
    return (
        <button id="boutton" className={class_name} onClick={exec_func}>
            {btn_component}
        </button>
    );
};
