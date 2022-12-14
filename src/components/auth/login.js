import React, { Component } from "react";
import axios from "axios";





export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errorText: "",
    });
  }

  handleSubmit(event) {
    axios
      .post(
        "https://api.devcamp.space/sessions",
        {
          client: {
            email: this.state.email,
            password: this.state.password,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuth();
        } else {
          this.setState({
            errorText: "wrong email or password",
          });
          this.props.handleUnsuccessfulAuth();

        }
      })
      .catch((error) => {
        this.setState({
          errorText: "an Error occurred custom!!",
        });
        this.props.handleUnsuccessfulAuth();

      });
    event.preventDefault();
  }

  render() {
    return (
      <div className='login-wrapper'>
      <div className='title-login'>
        <h1> LOGIN TO ACCESS YOUR DASHBOARD </h1>
</div>
        <div>{this.state.errorText}</div>


        <form onSubmit={this.handleSubmit} className="auth-form-wrapper">
          <div className="form-group">
            {/* <FontAwesomeIcon icon="envelope"/> */}

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">

            <input
              type="password"
              name="password"
              placeholder="Your password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          <div>

            <button type="submit"> Login </button>{" "}
          </div>

        </form>
      </div>
    );
  }
}
