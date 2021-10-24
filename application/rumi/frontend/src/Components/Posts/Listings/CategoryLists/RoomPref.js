import React, { Component } from "react";

export default class RoomPref extends Component {
    constructor(props) {
        super(props);
        this.state = { isChecked: false };
        this.parkingChecked = this.parkingChecked.bind(this);
        this.petChecked = this.petChecked.bind(this);
        this.smokingChecked = this.smokingChecked.bind(this);
    }

    parkingChecked() {
        this.setState({ parkingisChecked: !this.state.parkingisChecked });
    }

    petChecked() {
        this.setState({ petisChecked: !this.state.petisChecked });
    }

    smokingChecked() {
        this.setState({ smokingisChecked: !this.state.smokingisChecked });
    }
    render() {
        if (this.state.parkingisChecked) {
            this.props.parking(1);
        } else {
            this.props.parking("");
        }

        if (this.state.petisChecked) {
            this.props.pet(1);
        } else {
            this.props.pet("");
        }

        if (this.state.smokingisChecked) {
            this.props.smoking(1);
        } else {
            this.props.smoking("");
        }

        return (
            <div>
                <div>
                    <div className="filter-label">
                        <label>
                            <input type="checkbox" onChange={this.parkingChecked} />
                            <span>With Parking</span>
                        </label>
                    </div>
                    <div className="filter-label">
                        <label>
                            <input type="checkbox" onChange={this.petChecked} />
                            <span>Pet Friendly</span>
                        </label>
                    </div>
                    <div className="filter-label">
                        <label>
                            <input type="checkbox" onChange={this.smokingChecked} />
                            <span>Smoking Allowed</span>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}
