import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";

const options = [
    { label: "Male", value: "M" },
    { label: "Female", value: "F" },
    { label: "Non-binary", value: "N" },
];
export default class Gender extends Component {
    state = {
        selectedOptions: [],
    };

    handleChange = (selectedOptions) => {
        this.setState({ selectedOptions });
    };

    selectGender() {
        this.props.gender(this.selectedOptions);
    }

    render() {
        const { selectedOption } = this.state;
        return (
            <div>
                <Select
                    options={options}
                    onChange={this.handleChange}
                    value={selectedOption}
                    onClick={this.selectGender()}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                            ...theme.colors,
                            primary25: "#1eb4a53b",
                            primary: "#1da699",
                        },
                    })}
                    styles={{
                        control: (provided, state) => ({
                            ...provided,
                            boxShadow: "none",
                            width: 300,
                            height: 60,
                            border: "2px solid #f1f5f9",
                            borderColor: "#1da699",
                            "&:hover": {
                                borderColor: "#1da699",
                            },
                        }),
                        menu: (provided, state) => ({
                            ...provided,
                            border: "none",
                            boxShadow: "none",
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            padding: 20,
                        }),
                    }}
                />
            </div>
        );
    }
}
