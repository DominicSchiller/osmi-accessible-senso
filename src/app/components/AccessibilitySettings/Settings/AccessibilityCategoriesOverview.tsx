import React from "react";
import {
    Box,
    Button as MUIButton,
    Button,
    Icon, Tooltip,
    Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import "./AccessibilityCategoriesOverview.scss";
import { AccessibilitySettingsCategory } from "../../../../models/accessibility/AccessibilitySettingsCategory";
import { observer } from "mobx-react";
import { withAccessibilityMenuContext } from "../../../context/AccessibilityMenuContext";
import { withTheme } from "@mui/styles";

/**
 * Custom styled accessibility category button.
 */
const StyledAccessibilityCategoryButton = styled(MUIButton)`
  height: 160px;
  width: 160px;

  ${(props) => props.theme.breakpoints.between("xs", "sm")} {
    height: 40vw;
    width: 40vw;
  }
  flex-direction: column;
  font-weight: 500;
  span {
    margin: 4px 0;
    font-size: 36px !important;
  }
  &:focus-visible {
    font-weight: 700;
  }
`;

/**
 * Custom button to visualize accessibility categories.
 * @param props Properties objects
 * @constructor Create a new button instance
 */
const AccessibilityCategoryButton = (props: any) => {
  return (
      <Tooltip arrow
               title={`Zeige alle ${props.title}-bezogene Einstellungen an`}
               enterDelay={500}
               leaveDelay={75}
               enterNextDelay={500}>
          <StyledAccessibilityCategoryButton
              variant="outlined"
              startIcon={<Icon baseClassName="material-icons-round">{props.icon}</Icon>}
              sx={{ p: 0, m: 1, borderRadius: 4 }}
              aria-label={`Zeige alle Einstellungen für ${props.title} an`}
              onClick={props.onClick}>
              {props.title}
          </StyledAccessibilityCategoryButton>
      </Tooltip>
  );
};

/**
 * Component to give an overview of accessibility categories to choose from.
 * @constructor Create new instance
 */
const AccessibilityCategoriesOverview = withTheme(withAccessibilityMenuContext(
  (props: any) => {
    const { menuContext } = props;
    const categories = [
      {
        title: "Sehen",
        icon: "visibility",
        category: AccessibilitySettingsCategory.Seeing,
      },
      {
        title: "Hören",
        icon: "hearing",
        category: AccessibilitySettingsCategory.Hearing,
      },
      {
        title: "Bedienen",
        icon: "touch_app",
        category: AccessibilitySettingsCategory.MotorActivity,
      },

      {
        title: "Schwierigkeit",
        icon: "psychology",
        category: AccessibilitySettingsCategory.Cognitive,
      },
    ];

    return (
      <Box className={"overview-contentContainer"}>
        <header>
          <Box sx={{ mb: 2 }}>
              <Tooltip arrow
                       title={`Schließe das Einstellungsmenü`}
                       enterDelay={500}
                       leaveDelay={75}
                       enterNextDelay={500}>
                <Button
                  variant="text"
                  startIcon={<Icon baseClassName="material-icons">close</Icon>}
                  aria-label={"Barrierefreiheit-Menü schließen"}
                  onClick={menuContext.toggleMenu}>
                  Schließen
                </Button>
              </Tooltip>
          </Box>

          <Box className={"heroIcon"} sx={{backgroundColor: props.theme.palette.surface}}>
            <Icon baseClassName="material-icons-round" className={"icon"}>
              accessibility_new
            </Icon>
          </Box>
          <Typography variant={"h5"} sx={{ mt: 1 }}>
            Einstellungen der Barrierefreiheit
          </Typography>
        </header>
        <main>
          <nav>
            {categories.map((props) => (
              <AccessibilityCategoryButton
                key={props.title}
                onClick={() => {
                  menuContext.updateSelectedCategory(props.category);
                }}
                {...props}
              />
            ))}
          </nav>
        </main>
      </Box>
    );
  }
));

export default observer(AccessibilityCategoriesOverview);
