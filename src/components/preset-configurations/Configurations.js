import React from "react";
import { connect } from "react-redux";
import { setConfigurationAction } from "../../actions";
import styled from "styled-components";

const ModalOverlay = styled.div`
  ${(props) => (props.showModal ? "display: block" : "display: none")};
  position: fixed;
  z-index: 100;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
`;

const ConfigurationModal = styled.div`
  width: 70%;
  display: flex;
  margin: 0 auto;
`;

const Name = styled.span`
  color: white;
`;

const Image = styled.img`
  margin: 0 auto;
`;

const Configurations = (props) => {
  return (
    <ModalOverlay
      showModal={props.showModal}
      onClick={() => {
        props.setShowModal(!props.showModal);
      }}
    >
      <ConfigurationModal>
        {props.presetArray.map((presetSection, index) => {
          return (
            <div
              key={index}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Name>{presetSection.type}</Name>
              {presetSection.configuration.map((configurations) => {
                return (
                  <div key={index}>
                    <Name>{configurations.name}</Name>
                    <Image
                      src={configurations.src}
                      onClick={() =>
                        props.setConfigurationAction(configurations.name)
                      }
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
        {/* <Name>Box</Name>
          <img
            src={box}
            alt=''
            onClick={() => props.setConfigurationAction("box")}
          />
          <Name>Beehive</Name>
          <img
            src={beehive}
            alt=''
            onClick={() => props.setConfigurationAction("beehive")}
          />
          <Name>Loaf</Name>
          <img
            src={loaf}
            alt=''
            onClick={() => props.setConfigurationAction("loaf")}
          />
          <Name>Boat</Name>
          <img
            src={boat}
            alt=''
            onClick={() => props.setConfigurationAction("boat")}
          /> */}
      </ConfigurationModal>
    </ModalOverlay>
  );
};

const mapStateToProps = (state) => {
  return {
    presetArray: state.presetArray
  };
};

export default connect(mapStateToProps, { setConfigurationAction })(
  Configurations
);
