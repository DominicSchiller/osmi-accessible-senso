import React, {useContext} from "react";
import './SensoButton.View.scss'
import {styled} from "@mui/system";
import {Button, Icon} from "@mui/material";
import {hexToHSL} from "../../../../utils/ColorUtils";
import {ISensoButtonProps, SensoButtonID} from "./SensoButton.Model";
import {SensoGameplayContext} from "../../../context/SensoGameplayContext";

/**
 * A Senso related action button's view
 * @param props Collection of button related attributes
 * @constructor Create a new senso button.
 */
export const SensoButtonView = (props: ISensoButtonProps) => {

    const hslHoverColor = hexToHSL(props.color)
    const context = useContext(SensoGameplayContext)
    const isSafariBrowser = navigator.vendor.startsWith('Apple')

    const handleOnClick = () => {
        const isCorrect = context.session.isCorrectSelection(props.id)
        if (!context.session.isLevelCompleted) {
            document.getElementById("subtitle")!.innerText = isCorrect ? "Richtig" : "Falsch"
        }
    }

    const PlayButton = styled(Button)`
      color: rgba(255, 255, 255, 0.86);
      z-index: 1;
      width: 100%;
      height: 100%;
      background-color: ${props.color};
      transition: all 200ms ease-in-out;
      cursor: pointer;

      &#${SensoButtonID.TopLeft} {
        margin-right: var(--margin);
        ${isSafariBrowser ? `
            clip-path: unset;
            -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 256 256"><path d="M256,128V0h0C114.61,0,0,114.61,0,256v0h128C128,185.31,185.31,128,256,128z" /></svg>');
            mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 256 256"><path d="M256,128V0h0C114.61,0,0,114.61,0,256v0h128C128,185.31,185.31,128,256,128z" /></svg>');
            -webkit-mask-repeat: no-repeat;
            mask-repeat: no-repeat;    
        ` : `clip-path: url("#cp-top-left");`
        }
      }

      &#${SensoButtonID.TopRight} {
        margin-left: var(--margin);
        ${isSafariBrowser ? `
            clip-path: unset;
            -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 256 256"><path d="M128,256l128,0v0C256,114.61,141.38,0,0,0l0,0l0,128C70.69,128,128,185.31,128,256z" /></svg>');
            mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 256 256"><path d="M128,256l128,0v0C256,114.61,141.38,0,0,0l0,0l0,128C70.69,128,128,185.31,128,256z" /></svg>');
            -webkit-mask-repeat: no-repeat;
            mask-repeat: no-repeat;    
        ` : `clip-path: url("#cp-top-right");`
        }
      }

      &#${SensoButtonID.BottomLeft} {
        margin-right: var(--margin);
        ${isSafariBrowser ? `
            clip-path: unset;
            -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 256 256"><path d="M128,0H0v0c0,141.38,114.61,256,256,256h0V128C185.31,128,128,70.69,128,0z" /></svg>');
            mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 256 256"><path d="M128,0H0v0c0,141.38,114.61,256,256,256h0V128C185.31,128,128,70.69,128,0z" /></svg>');
            -webkit-mask-repeat: no-repeat;
            mask-repeat: no-repeat;
        ` : `clip-path: url("#cp-bottom-left");`
        }
      }

      &#${SensoButtonID.BottomRight} {
        margin-left: var(--margin);
        ${isSafariBrowser ? `
            clip-path: unset;
            -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 256 256"><path d="M0,128v128h0c141.38,0,256-114.62,256-256v0H128C128,70.69,70.69,128,0,128z" /></svg>');
            mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 256 256"><path d="M0,128v128h0c141.38,0,256-114.62,256-256v0H128C128,70.69,70.69,128,0,128z" /></svg>');
            -webkit-mask-repeat: no-repeat;
            mask-repeat: no-repeat;
        ` : `clip-path: url("#cp-bottom-right");`
        }
      }

      &:hover, &:active {
        background-color: hsl(${hslHoverColor.h}, ${hslHoverColor.s}%, ${hslHoverColor.l - 15}%);
      }

      &.selected {
        z-index: 2;
        transform: scale(1.15);
        background-color: hsl(${hslHoverColor.h}, ${hslHoverColor.s}%, ${hslHoverColor.l + 10}%);

        span {
          color: #ffffff;
          font-size: 475%;
        }
      }

      span {
        transition: all 150ms ease-in-out;
        width: 100% !important;
        font-size: 400%;
      }

      ${props => props.theme.breakpoints.up("xs")} {
        --margin: 4px;
      }

      ${props => props.theme.breakpoints.up("sm")} {
        --margin: 4px;
        

        ${props => props.theme.breakpoints.up("md")} {
          --margin: 8px;
        }

        ${props => props.theme.breakpoints.up("lg")} {
          --margin: 12px;
        }

        ${props => props.theme.breakpoints.up("xl")} {
          --margin: 12px;
          
        }
    `;

    return (
        <PlayButton id={props.id} className={`clipped`} onClick={handleOnClick} disabled={props.disabled}
                    aria-label={props.title}>
            <Icon baseClassName="material-icons-round">
                {props.icon}
            </Icon>
        </PlayButton>
    );
};