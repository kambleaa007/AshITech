import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Loading } from "../LoadingComponent";
import { postLogin, fetchLogin } from "./../../redux/ActionCreators";

export const LoginHook = (username, password) => {
  const [login, setlogin] = useState({});
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    this.props.fetchLogin();
    fetch()
      .then((res) => {
        setlogin(res.data);
        setLoad(true);
      })
      .catch((err) => {
        setErr(err.message);
      });
  }, []);

  if (!load) {
    return (
      <div>
        <p>
          User Loading user: {username.length}
          pass: {password.length}
        </p>
      </div>
    );
  } else {
    return <div>Loaded Login: {this.props.login}</div>;
  }
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
    logins: state.logins,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postLogin: (email, password) => {
    dispatch(postLogin(email, password));
  },
  fetchLogin: () => {
    dispatch(fetchLogin());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginHook);
