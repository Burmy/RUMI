import React, { Component } from "react";
import Select from "react-select";
import Axios from "axios";

export default class Major extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectOptions: [],
            id: "",
            name: "",
        };
    }

    async getOptions() {
        const res = await Axios.get("http://18.190.48.206:3001/list?category=major");
        const data = res.data.results;

        const options = data.map((d) => ({
            value: d.id,
            label: d.value,
        }));

        this.setState({ selectOptions: options });
    }

    handleChange(e) {
        this.setState({ id: e.value, name: e.label });
        this.props.major(e.value);
        console.log(e.value);
    }

    componentDidMount() {
        this.getOptions();
    }

    render() {
        return (
            <div>
                <Select
                    options={this.state.selectOptions}
                    onChange={this.handleChange.bind(this)}
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
                            width: 270,
                            height: 67,
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
