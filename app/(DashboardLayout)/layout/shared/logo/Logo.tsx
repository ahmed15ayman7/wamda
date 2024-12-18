import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/" className=" flex items-center justify-center">
      <Image src="/images/logos/dark-logo.svg" alt="logo" height={120} width={90} priority />
    </LinkStyled>
  );
};

export default Logo;
  