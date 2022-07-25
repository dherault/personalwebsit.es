import { mergeTheme } from 'honorable'
import defaultTheme from 'honorable-theme-default'
import mpRecipe from 'honorable-recipe-mp'
import gapRecipe from 'honorable-recipe-gap'

const borderRadii = {
  none: 0,
  medium: 3,
  large: 6,
}

export default mergeTheme(defaultTheme, {
  name: 'Where Space',
  stylesheet: {
    body: [
      {
        overflow: 'hidden',
        fontFamily: 'Formular, sans-serif',
      },
    ],
  },
  global: [
    ({ bold }: any) => bold && {
      fontWeight: 'bold',
    },
    ({ italic }: any) => italic && {
      fontStyle: 'italic',
    },
    ({ truncate }: any) => truncate && {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    ({ borderRadius }: any) => typeof borderRadius === 'string' && typeof borderRadii[borderRadius as keyof typeof borderRadii] !== 'undefined' && {
      borderRadius: borderRadii[borderRadius as keyof typeof borderRadii],
    },
    mpRecipe(),
    gapRecipe(),
  ],
  Button: {
    Root: [
      {
        transition: 'background-color 150ms ease',
      },
      ({ secondary }: any) => secondary && {
        backgroundColor: 'transparent',
        border: '1px solid primary',
        color: 'primary',
        ':hover': {
          backgroundColor: 'transparency(primary, 90)',
        },
        ':active': {
          backgroundColor: 'transparency(primary, 80)',
        },
      },
      ({ large }: any) => large && {
        height: 48,
        fontSize: 18,
      },
    ],
    EndIcon: [
      {
        marginLeft: 12,
        marginRight: -2,
      },
    ],
  },
  IconButton: {
    Root: [
      ({ large }: any) => large && {
        padding: 16,
      },
      ({ ghost }: any) => ghost && {
        elevation: 0,
      },
    ],
  },
  Input: {
    Root: [
      ({ large }: any) => large && {
        minHeight: 48,
        fontSize: 18,
      },
    ],
    StartIcon: [
      ({ large }: any) => large && {
        marginLeft: 8,
        marginRight: 6,
      },
    ],
  },
  Flex: {
    Root: [
      ({ column }: any) => column && {
        flexDirection: 'column',
      },
      ({ center }: any) => center && {
        alignItems: 'center',
        justifyContent: 'center',
      },
    ],
  },
})
