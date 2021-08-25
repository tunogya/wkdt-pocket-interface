import React from 'react';
import { Image } from '@chakra-ui/react';
import logo from '../svg/logo.svg';
import logo_white from  "../svg/logo_white.svg";

export const Logo = props => {
  return <Image src={logo} {...props} />;
};

export const LogoWhite = props => {
  return <Image src={logo_white} {...props} />
}