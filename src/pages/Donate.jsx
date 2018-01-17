import React from "react";
import { Helmet } from "react-helmet";
import Angles from "../components/Angles";
import styled from 'styled-components';

const AboutSection = styled.section`
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
  opacity: 1;
      height: 750px;
  top: 0;
  transition: all 500ms, opacity 2s, top 2s;
  font-size: calc(18px + 11 * ((100vw - 320px) / 1360));
  position: relative;
`;
const Content = styled.div`
  margin: 0 auto;
  @media (min-width: 1025px) {
    max-width: 80%;
  }
  @media (min-width: 700px) and (max-width: 1024px) {
    max-width: 90%;
  }
  @media (max-width: 699px) {
    max-width: 100%;
  }
`;
const StyledHeader = styled.header`
  position: relative;
  padding-bottom: 25px;
  margin-bottom: 25px;
  text-align: center;
`;
const BackgroundText = styled.span`
  padding-left: 50px;
  color: #111010;
  font-size: 4em;
`;
const TitlePop = styled.span`
  left: 20%;
  position: absolute;
  bottom: 0;
  color: #8a1315;
  font-size: 3em;
`;
const StyledP = styled.p`
  padding-left: 5%;
  padding-right: 1%;
  float: right;
  width: 60%;
  @media (max-width: 700px) {
    float: none !important;
    width: 90% !important;
  }
`;
const DonateButton = styled.a`
  text-align: center;
  margin: 10px;
  border-radius: 4px;
  cursor: pointer;
  float: left;
  transition: background-color 500ms;
  background: #6d1214;
  padding: 10px;
  &:hover{
    transform: rotate(1deg);
  }
`;
const RemoveOnScroll = {
  top:300,
  opacity:0
}

export default class Donate extends React.Component {
    constructor(){
      super()
      this.state = {RemoveOnScroll: true};
    }
    componentDidMount(){
      //Run on next tick to allow styles to take effect
      setTimeout(()=>{
        this.setState({RemoveOnScroll: false})
      },1);
    }
    render() {
        return (
          <AboutSection style={(this.state.RemoveOnScroll) ? RemoveOnScroll : {}}>
            <Helmet>
                <title>Dirtyredz - Donate</title>
            </Helmet>
            <Angles/>
            <Content>
                <StyledHeader>
                    <BackgroundText><b>Help me out</b></BackgroundText>
                    <TitlePop><b>Donate</b></TitlePop>
                </StyledHeader>
                <div>
                    <StyledP>
                      Wanna help me out? Send me a small donation, I really appreciate it. Thxs
                      <br/>
                      <br/>
                      <DonateButton href="https://www.paypal.me/Dirtyredz" target="_blank">paypal.me/Dirtyredz</DonateButton>
                    </StyledP>
                    <br className="clear"/>
                    <br/>
                    <br/>
                    <StyledP>
                      I also have a Patreon that you can sign up and become a patron of mine.
                      <br/>
                      <br/>
                      <DonateButton href="https://www.patreon.com/Dirtyredz" target="_blank">patreon.com/Dirtyredz</DonateButton>
                    </StyledP>
                    <br className="clear"/>
                </div>
            </Content>
        </AboutSection>
        );
    }
}
