import React from "react";
import { Logo } from "./Logo";
import { SolicitationItem } from "./SolicitationItem"; // Importação: OK
import profileCircle from "./profile-circle.png";
import searchNormal from "./search-normal.svg";
import "./style.css";
import envelopeVector from "./vector-2-5.svg";
import sendIcon from "./vector-24.svg";

export const WireframeSolicitacoes = (): JSX.Element => { 
  return (
    <div className="wireframe-solicitacoes">
      <div className="text-wrapper-7">Solicitacoes</div>

      <SolicitationItem
        className="solicitation-item-list" 
        img="vector-2-6.svg"
        imgClassName="solicitacoes-instance"
        imgClassNameOverride="solicitacoes-instance"
        
        // As props vector (organização que você fez): OK
        vector="video-icon-1.svg" 
        vector1="video-icon-2.svg"
        vector2="vector-35.svg" 
        vector3="vector-2-7.svg" 
        vector4="vector-3-6.svg" 
        vector5="vector-40.svg" 
        vector6="vector-2-9.svg" 
        vector7="vector-3-8.svg" 
        vector8="vector-36.svg" 
        vector9="vector-2-8.svg" 
        
        vector10="video-icon-3.svg"
        vector11="video-icon-4.svg"
        vector12="video-icon-5.svg"
        vector13="video-icon-6.svg"
        vector14="video-icon-7.svg"
        vector15="vector-33.svg"
        vector16="vector-34.svg"
        vector17="vector-41.svg"
        vector18="vector-42.svg"
        vector19="vector-43.svg"
        vector20="vector-44.svg"
        vector21="vector-45.svg"
        vector22="vector-46.svg"
        vector23="vector-29.svg"
        vector24="vector-30.svg"
        vector25="vector-31.svg"
        vector26="vector-37.svg"
        vector27="vector-38.svg"
        vector28="vector-39.svg"
        vectorClassName="solicitacoes-instance"
        vectorClassName1="solicitacoes-instance"
        vectorClassName2="solicitacoes-instance"
        vectorClassNameOverride="solicitacoes-instance"
      />
      <div className="barra-superior">
        <div className="pesquisa">
          <div className="rectangle-2" />

          <div className="text-wrapper-8">Pesquise aqui...</div>

          <img
            className="search-normal"
            alt="Search icon"
            src={searchNormal}
          />
        </div>

        <img
          className="vuesax-bold-profile"
          alt="Profile icon"
          src={profileCircle}
        />

        <Logo className="logo-1" />
        <div className="mail-send-envelope">
          <img className="vector-6" alt="Send icon" src={sendIcon} />

          <img className="vector-7" alt="Envelope vector" src={envelopeVector} />
        </div>
      </div>
    </div>
  );
};
