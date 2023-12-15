import React, { useState } from 'react';
import { Flex, Text, Icon, Menu, MenuButton, Link } from '@chakra-ui/react';

export default function NavItem({ icon, title, goto, navSize }) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true);
  };

  return (
    <Flex
      flexDir="column"
      w="100%"
      alignItems={navSize === 'small' ? 'center' : 'flex-start'}
      
    >
      <Menu placement="right">
        <Link
          as="a"
          href={goto}
          p={4}
          marginLeft="0vw"
          
          overflow="hidden"
          borderTopLeftRadius={8}
          borderBottomLeftRadius={8}
        //   style={{
        //     backgroundColor: isActive ? 'white' : 'transparent',
        //     color: isActive ? '#03AF9F' : 'white',
        //   }}
          onClick={handleClick}
          _hover={{ textDecoration: 'none', backgroundColor: 'white', color: '#03AF9F' }}
          w={navSize === 'large' ? '100%' : 'auto'}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon as={icon} fontSize="3xl" />
              <Text className="text" ml={4} display={navSize === 'small' ? 'none' : 'flex'}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}
