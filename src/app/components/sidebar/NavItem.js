import React, { useState } from 'react';
import { Flex, Text, Icon, Menu, MenuButton } from '@chakra-ui/react';
import Link from 'next/link';

export default function NavItem({ icon, title, goto, navSize }) {
  const [isActive, setIsActive] = useState(false);

  return (
    
    <Flex
      flexDir="column"
      w="100%"
      paddingLeft= {navSize == "large" ? "8%" : ""}
      alignItems={navSize === 'small' ? 'center' : 'flex-start'}
      marginBottom={navSize == "large" ? "2px" : '10px'}
    >
      <Menu placement="right">
        <Link
          href={`/${goto}`}
          className={`hover ${navSize == 'large' ? "sidebarlink" : ""} ${isActive ? "active" : ""}`}
          onClick={() => setIsActive(true)}
        >
          <MenuButton w="100%">
            <Flex alignItems="center" justifyContent={navSize == 'large' ? "": "center"} paddingLeft={navSize == "large" ? "13px" : ""}  paddingTop="17px">
              <Icon as={icon} fontSize={navSize == "large" ? "2xl": "2xl" } />
              <Text fontSize="15px" ml={2} textAlign="center" display={navSize === 'small' ? 'none' : 'flex'}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}
