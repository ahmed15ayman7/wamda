import PropTypes from 'prop-types';
// mui imports
import { ListSubheader, styled, Theme } from '@mui/material';
import { useTranslations } from 'next-intl';

type NavGroup = {
  navlabel?: boolean;
  subheader?: string;
};

interface ItemType {
  item: NavGroup;
}

const NavGroup = ({ item }: ItemType) => {
  const  t  = useTranslations("Sidebar");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ListSubheaderStyle = styled((props: Theme | any) => <ListSubheader disableSticky {...props} />)(
    ({ theme }) => ({
      ...theme.typography.overline,
      fontWeight: '700',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(0),
      color: theme.palette.text.primary,
      lineHeight: '26px',
      padding: '3px 12px',
    }),
  );
  return (
    <ListSubheaderStyle>{t(item.subheader)}</ListSubheaderStyle>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object,
};

export default NavGroup;
