import React from "react";
import { connect } from "react-redux";
import { MainContainer } from "../components/MainContainer";
import DND from "../components/DND";

interface RootState {
  userReducer: {
    email: string,
  }
}

interface IProps {
  email: string,
}

const Home = ({ email }: IProps) => (
  <MainContainer>
    <h1>Hello <span style={{ color: "#ec5" }}>{email}</span>!!!</h1>
    <DND />
  </MainContainer>
);

const mapStateToProps = (state: RootState) => ({
  email: state.userReducer.email || '',
});

export default connect(mapStateToProps, {})(Home);
