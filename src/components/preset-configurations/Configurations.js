import React from "react";
import { connect } from "react-redux";
import { setConfiguration } from "../../actions";
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
  display: flex;
  margin: 0 auto;
`;

const Name = styled.span`
  color: white;
`;

const box =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Game_of_life_block_with_border.svg/66px-Game_of_life_block_with_border.svg.png";
const beehive =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Game_of_life_beehive.svg/98px-Game_of_life_beehive.svg.png";
const loaf =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Game_of_life_loaf.svg/98px-Game_of_life_loaf.svg.png";
const boat =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Game_of_life_boat.svg/82px-Game_of_life_boat.svg.png";

const boxAlt = "a cube like structure with 4 squares neighboring each other";
const beehiveAlt = `a structure somewhat resembling a minimalistic rendition of a beehive using 6 cells with 2 empty squares in
the center of the structure 2 cells each filled in on top of and bottom of empty cells and 1 cell to the left
of and to the right of the empty center cells
`;
const loafAlt = `a strucutre minimally representing a loaf of bread using cells. With 4 cells in the center of the structure, the bottom left of this structure is filled in
with the other 3 cells remain unfilled, and there are 2 cells each on top of these central squares and to the right of it. There is also a square that is unfilled directly
diagonal to the top right of the central squares and in between the 2 squares at the top and the right of the central squares.`;

const Configurations = (props) => {
  return (
    <ModalOverlay
      showModal={props.showModal}
      onClick={() => {
        props.setShowModal(!props.showModal);
      }}
    >
      <ConfigurationModal>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Name>Box</Name>
          <img
            src={box}
            alt={boxAlt}
            onClick={() => props.setConfiguration("box")}
          />
          <Name>Beehive</Name>
          <img
            src={beehive}
            alt={beehiveAlt}
            onClick={() => props.setConfiguration("beehive")}
          />
          <Name>Loaf</Name>
          <img
            src={loaf}
            alt={loafAlt}
            onClick={() => props.setConfiguration("loaf")}
          />
          <Name>Boat</Name>
          <img
            src={boat}
            alt="a cube like structure with 4 squares neighboring each other"
            onClick={() => props.setConfiguration("boat")}
          />
        </div>
      </ConfigurationModal>
    </ModalOverlay>
  );
};

export default connect(null, { setConfiguration })(Configurations);
