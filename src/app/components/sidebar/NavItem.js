import React, { useState } from 'react';
import { Flex, Text, Icon, Menu, MenuButton } from '@chakra-ui/react';
import Link from 'next/link';

export default function NavItem({ icon, title, goto, navSize }) {
  const [isActive, setIsActive] = useState(false);

  return (
    
    <Flex
      flexDir="column"
      w="100%"
      alignItems={navSize === 'small' ? 'center' : 'flex-start'}
    >
      <Menu placement="right">
        <Link
          href={`/${goto}`}
          className="sidebarlink"
          onClick={() => setIsActive(true)}
        >
          <MenuButton w="100%">
            <Flex alignItems="center" justifyContent={navSize == 'large' ? "": "center"} paddingLeft={navSize == "large" ? "4px" : ""} padding="14px 0 0 4px">
              <Icon as={icon} fontSize={navSize == "large" ? "3xl": "2xl" } />
              <Text className="text" fontSize="md" ml={2} textAlign="center" display={navSize === 'small' ? 'none' : 'flex'}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}
