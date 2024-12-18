import React from "react";
// mui imports
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  useTheme,
  ListItemButton,
} from "@mui/material";
import Link from "next/link";
import { useTranslations } from "next-intl";
import useStore from "@/hooks/zustand";

type NavGroup = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  title2?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  href?: any;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
};

interface ItemType {
  item: NavGroup;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hideMenu?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  level?: number | any;
  pathDirect: string;
}

const NavItem = ({ item, level, pathDirect, onClick }: ItemType) => {
  const Icon = item.icon;
  const theme = useTheme();
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;
  const  t  = useTranslations("Sidebar");
  const ListItemStyled = styled(ListItem)(() => ({
    padding: 0,
    ".MuiButtonBase-root": {
      whiteSpace: "nowrap",
      marginBottom: "2px",
      padding: "8px 10px",
      borderRadius: "8px",
      backgroundColor: level > 1 ? "transparent !important" : "inherit",
      color: theme.palette.text.secondary,
      paddingLeft: "10px",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: "#7ebe4b",
      },
      "&.Mui-selected": {
        color: "white",
        backgroundColor: "#7ebe4b",
        "&:hover": {
          backgroundColor: "#7ebe4b90",
          color: "white",
        },
      },
    },
  }));
  const { getLang } = useStore();
  return (
    <List component="div" disablePadding key={item.id} dir={getLang()==="en"?"ltr":"rtl"}>
      <ListItemStyled>
        <ListItemButton
          component={Link}
          href={item.href}
          disabled={item.disabled}
          selected={pathDirect === item.href}
          target={item.external ? "_blank" : ""}
          onClick={onClick}
          dir={getLang()==="en"?"ltr":"rtl"}
        >
          <ListItemIcon
            sx={{
              minWidth: "36px",
              p: "3px 0",
              color: "inherit",
            }}
          >
            {itemIcon}
          </ListItemIcon>
          <ListItemText dir={getLang()==="en"?"ltr":"rtl"}>
            <>{t(item.title2)}</>
          </ListItemText>
        </ListItemButton>
      </ListItemStyled>
    </List>
  );
};

export default NavItem;
