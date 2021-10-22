import React, { useState } from "react";
import FormSignup from "./FormSignup";
import "./Form.css";

const Registeration = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm() {
        setIsSubmitted(true);
    }
    return (
        <div>
            <div className="form-container">{!isSubmitted ? <FormSignup submitForm={submitForm} /> : <p>NOICE</p>}</div>
        </div>
    );
};

export default Registeration;
