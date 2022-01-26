import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    components: {
        FormControl: {
            baseStyle: {
                color: 'rgb(36, 35, 87)',
                backgroundColor: 'red',
            }
        }
    }
})