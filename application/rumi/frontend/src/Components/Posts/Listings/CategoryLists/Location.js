import React, { Component } from "react";
import Select from "react-select";
import Axios from "axios";
import configData from "../../../../Configs/config.json";

export default class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectOptions: [],
            id: "",
            name: "",
        };
    }

    async getOptions() {
        const res = await Axios.get(configData.SERVER_URL + "list?category=location");
        const data = res.data.results;

        const options = data.map((d) => ({
            value: d.id,
            label: d.value,
        }));

        this.setState({ selectOptions: options });
    }

    handleChange(e) {
        this.setState({ id: e.value, name: e.label });
        this.props.location(e.value);
        // console.log(e.value);
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
                            width: 300,
                            height: 60,
                            border: "2px solid #0000002c",
                            borderColor: "#0000002c",
                            cursor: "pointer",
                            boxShadow: "5px 5px 24px 5px rgba(0, 0, 0, 0.06)",
                            "&:hover": {
                                borderColor: "#1da699",
                            },
                        }),
                        menu: (provided, state) => ({
                            ...provided,
                            border: "2px solid #f1f5f9",
                            boxShadow: "none",
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            padding: 20,
                            cursor: "pointer",
                        }),
                    }}
                />
            </div>
        );
    }
}
