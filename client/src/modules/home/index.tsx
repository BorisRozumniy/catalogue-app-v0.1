import React from "react";
import { connect } from "react-redux";
import { MainContainer } from "../components/MainContainer";
import DND from "../components/DND";

const items = [
  {
    id: 1,
    text: 'Write a cool JS library',
  },
  {
    id: 2,
    text: 'Make it generic enough',
  },
  {
    id: 3,
    text: 'Write README',
  },
  {
    id: 4,
    text: 'Create some examples',
  },
  {
    id: 5,
    text:
      'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
  },
  {
    id: 6,
    text: '???',
  },
  {
    id: 7,
    text: 'PROFIT',
  },
]
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
    <DND items={items}/>
  </MainContainer>
);

const mapStateToProps = (state: RootState) => ({
  email: state.userReducer.email || '',
});

export default connect(mapStateToProps, {})(Home);
